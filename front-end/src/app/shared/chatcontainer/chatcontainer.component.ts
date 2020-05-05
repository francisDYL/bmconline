import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { User } from 'src/app/model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from 'src/app/model/project';
import {firestore} from 'firebase/app';
@Component({
  selector: 'app-chatcontainer',
  templateUrl: './chatcontainer.component.html',
  styleUrls: ['./chatcontainer.component.scss']
})
export class ChatcontainerComponent implements OnInit {

  isCollapsed: boolean = false;
  icon: string = 'expand_more';
  _project: Project;
  _user: User = {};
  scrollHeight: number;
  @ViewChild('messageContent') messageContent : ElementRef ; 
  @Input() set project(project: Project){
    if(project !== undefined){
      this._project = project;
      this.initMessageLIstener();
    } 
  }

  @Input() set user(user: User){
    this._user = user;
  }

  get project(){return this._project;}

  newMessage: string = '';
  messages = [];

  constructor(private fireStore: AngularFirestore) {
    
   }

  ngOnInit() {
  }

  handleEnterKey(event){
    if(event.keyCode === 13){
      event.preventDefault();
      this.sendMessage();
    }
  }


  toggle(){
    this.isCollapsed = !this.isCollapsed;
    this.icon = this.isCollapsed?'expand_less':'expand_more';
  }

  initMessageLIstener(){
    this.messages = [];
    this.fireStore.collection('messages',ref => ref.where('project','==',this._project.uid)
      .orderBy('createdAt','asc'))
			.stateChanges().subscribe(
      (changes)=>{
        changes.forEach(change => {
          const message:any = change.payload.doc.data();
						const type: string = change.type; 
						if(type === 'added'){
              message.direction = message.from === this._user.email?'message-out':'message-in';
              this.messages.push(message);
              this.scrollHeight = this.messageContent.nativeElement.scrollHeight
						}
        })
      });
  }

  sendMessage(){
    if(this.newMessage !==''){
        const message = {
          content:this.newMessage,
          from:this._user.email,
          project:this._project.uid,
          uid:this.fireStore.createId(),
          createdAt: firestore.Timestamp.now()
        };
    
        this.fireStore.collection('messages').doc(message.uid).set(message).then(
          (data)=>{
            this.newMessage = '';
          },
          (error)=>{
            console.log(error);
          }
        );
      }
    }
    

}
