import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../model/note';
import { AddNoteDialogComponent } from '../../shared/add-note-dialog/add-note-dialog.component';
import { EditProjectComponent } from '../../shared/edit-project/edit-project.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { UserService } from '../../service/user/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from 'src/app/model/project';

@Component({
	selector: 'app-designer',
	templateUrl: './dashboard-designer.component.html',
	styleUrls: ['./dashboard-designer.component.scss']
})
export class DashboardDesignerComponent implements OnInit {

	@ViewChild('sidebar') sidebar;
	public user: User = {};
	projectList: Map<string, Project> = new Map<string, Project>();
	activeProject: Project;

	dropLists = {
		keyPartners: new Map<string, Note>(),
		keyActivities: new Map<string, Note>(),
		keyRessources: new Map<string, Note>(),
		valueProposition: new Map<string, Note>(),
		customers: new Map<string, Note>(),
		channel: new Map<string, Note>(),
		customerSegment: new Map<string, Note>(),
		costStructure: new Map<string, Note>(),
		revenueStream: new Map<string, Note>()
	};


	constructor(private dialog: MatDialog,
				private router: Router,
				private userService: UserService,
				private fireStore: AngularFirestore, ) {
		userService.user$().subscribe(
			data => { 
				this.user = data;
				this.initProjectListAndActiveProject();
			}
		);

	}

	ngOnInit() {
	}

	drop(event: CdkDragDrop<string[]>) {

		const originContainer = event.previousContainer.id;
		const destinationContainer = event.container.id;
		const id = event.item.data;

		const note = this.dropLists[originContainer].get(id);
		note.category = destinationContainer;
		note.oldCategory = originContainer;
		// this.dropLists[originContainer].delete(id);
	
		this.fireStore.collection('notes').doc(note.uid).set(note);
		//this.dropLists[destinationContainer].set(id, note);
	}

	addNote(category: string) {

		const note = this.createNote();
		const dialogRef = this.dialog.open(AddNoteDialogComponent, {
			width: '40vw',
			data: note
		});

		dialogRef.afterClosed().subscribe(
			(result: Note) => {
				if (result !== undefined && result.title !== '' && result.content !== '') {
					result.category = category;
					result.project = this.activeProject.uid;
					result.uid = this.fireStore.createId();
					this.fireStore.collection('notes').doc(result.uid).set(result).then(
						(data)=>{
							//this.dropLists[category].set(result.uid, result);
						},
						(error)=>{console.error(error)}
					);
				}
		});
				
	}

	onEdit(data) {
		const note = this.dropLists[data.category].get(data.uid);
		const dialogRef = this.dialog.open(AddNoteDialogComponent, {
			width: '40vw',
			data: note
		});

		dialogRef.afterClosed().subscribe((result: Note) => {
			if (result !== undefined && result.title !== '' && result.content !== '') {
				result.oldCategory = '';
				this.fireStore.collection('notes').doc(result.uid).set(result);
				//this.dropLists[data.category].set(data.uid, result);
			}
		});
	}

	onDelete(data) {
		this.fireStore.collection('notes').doc(data.uid).delete();
		// this.dropLists[data.category].delete(data.uid);
	}

	createNote() {
		return { uid: '', title: '', content: '', color: '', category: '' };
	}

	initProjectListAndActiveProject(){
		let activeProjectChange = false;
		this.fireStore.collection<Project>('projects', ref => ref.where('users','array-contains',`${this.user.uid}`)).stateChanges().subscribe(
			(changes)=>{
				changes.forEach((change =>{
					const project: Project = change.payload.doc.data();
					const type: string = change.type;
					
					if(type === 'added'){
						this.projectList.set(project.uid,project);
					}
					else if(type === 'modified'){
						this.projectList.set(project.uid,project);
						if(project.uid === this.activeProject.uid) activeProjectChange = true;
					}
					else{
						this.projectList.delete(project.uid);
						if(project.uid === this.activeProject.uid) this.activeProject = null;
					}
				}));

				if(this.activeProject === null || this.activeProject === undefined){
					 this.activeProject = this.projectList.size > 0? this.projectList.values().next().value : null;
					 activeProjectChange = true;
				}	
				
				if(activeProjectChange) this.initDropList();
			},
			(error)=>{
				console.log(error)
			}
		)
	}

	initDropList(){
		if (this.activeProject === null){
			if(this.projectList.size === 0) alert(`you have no project, please create one`);
		}
		else{
			this.fireStore.collection<Note>('notes',ref => ref.where('project','==',this.activeProject.uid))
			.stateChanges().subscribe(
				(changes)=>{
					changes.forEach(change => {
						const note :Note = change.payload.doc.data();
						const type: string = change.type; 
						if(type === 'added'){
							this.dropLists[note.category].set(note.uid,note);
						}
						else if(type === 'modified'){
							if(note.oldCategory !== undefined && note.oldCategory !== ''){
								this.dropLists[note.oldCategory].delete(note.uid);
								this.dropLists[note.category].set(note.uid, note);
							}
							else{
								this.dropLists[note.category].set(note.uid, note);
							}
						}
						else{
							this.dropLists[note.category].delete(note.uid);
						}
					});
				},
				(error)=>{
					console.error(error);
				}
			);
				
		}
	}

	mapToArray(map: Map<string, Note>) {
		return Array.from(map.values());
	}

	mapProjectToArray(map: Map<string,Project>){
		return Array.from(map.values());
	}

	export() {
		const element = document.getElementById('main-content');
		html2canvas(element).then(canvas => {
			const url = canvas.toDataURL('image/jpeg', 1);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'bmc.jpeg';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			this.toggleSideBar();
		});
	}

	toggleSideBar() {
		this.sidebar.toggle();
	}

	logOut(){
		this.userService.logout();
		this.router.navigate(['/']);
	}

	addProject(){
		const name = prompt("give a name")
		const project: Project = {name:name, owner: this.user.uid, state:'active', users:[this.user.uid]}
		project.uid = this.fireStore.createId();

		this.fireStore.collection('projects').doc(project.uid).set(project).then(
			(data)=>{
				this.projectList.set(project.uid,project);
				alert("successfully create a project");
			},
			(error)=>{
				console.log(error);
			}
		);
				
	}

	changeActiveProject(event){
		const projectUid = event.source.value;
		for(let project of this.mapProjectToArray(this.projectList)){
			if(project.uid === projectUid) {
				this.activeProject = project;
				break;
			}
		}
		this.clearDropList();
		this.initDropList();
	}

	editActiveProject(){

		this.dialog.open(EditProjectComponent, {
			width: '40vw',
			data: this.activeProject
		});

	}

	deleteActiveProject(){
		// delete active project
	}

	clearDropList(){
		this.dropLists.channel.clear();
		this.dropLists.costStructure.clear();
		this.dropLists.customerSegment.clear();
		this.dropLists.customers.clear();
		this.dropLists.keyActivities.clear();
		this.dropLists.keyPartners.clear();
		this.dropLists.keyRessources.clear();
		this.dropLists.revenueStream.clear();
		this.dropLists.valueProposition.clear();
	}
}
