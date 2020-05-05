import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../model/note';
import { AddNoteDialogComponent } from '../../shared/add-note-dialog/add-note-dialog.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
	selector: 'app-designer',
	templateUrl: './designer.component.html',
	styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {

	@ViewChild('sidebar') sidebar;

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


	constructor(private dialog: MatDialog) {
		const note: Note = { uid: 'partner1', title: 'partner1', content: 'partner1', color: '#fff', category: 'keyPartners' };
		const note2: Note = { uid: 'partner2', title: 'partner2', content: 'partner2', color: '#fff', category: 'keyPartners' };

		this.dropLists.keyPartners.set(note.uid, note);
		this.dropLists.keyPartners.set(note2.uid, note2);
	}

	ngOnInit() {
	}

	drop(event: CdkDragDrop<string[]>) {

		const originContainer = event.previousContainer.id;
		const destinationContainer = event.container.id;
		const id = event.item.data;

		const note = this.dropLists[originContainer].get(id);
		note.category = destinationContainer;

		this.dropLists[originContainer].delete(id);
		this.dropLists[destinationContainer].set(id, note);
	}

	addNote(category: string) {

		const note = this.createNote();
		const dialogRef = this.dialog.open(AddNoteDialogComponent, {
			width: '40vw',
			data: note
		});

		dialogRef.afterClosed().subscribe((result: Note) => {
			if (result !== undefined && result.title !== '' && result.content !== '') {
				result.uid = this.generateId();
				result.category = category;
				this.dropLists[category].set(result.uid, result);
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
				this.dropLists[data.category].set(data.uid, result);
			}
		});
	}

	onDelete(data) {
		this.dropLists[data.category].delete(data.uid);
	}

	createNote() {
		return { uid: '', title: '', content: '', color: '', category: '' };
	}

	generateId() {
		let d = new Date().getTime(); // Timestamp
		// tslint:disable-next-line: max-line-length
		let d2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16; // random number between 0 and 16
			if (d > 0) {// Use timestamp until depleted
				// tslint:disable-next-line: no-bitwise
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {// Use microseconds since page-load if supported
				// tslint:disable-next-line: no-bitwise
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			// tslint:disable-next-line: no-bitwise
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}


	mapToArray(map: Map<string, Note>) {
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
}
