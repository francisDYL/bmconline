import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  userList: User[] = [];
  displayedColumns: string[] = ['email', 'role', 'delete'];
  userEmail: string = '';

  constructor(public dialogRef: MatDialogRef<EditProjectComponent>,
     @Inject(MAT_DIALOG_DATA) public data:Project,
     private fireStore: AngularFirestore,
     private fireAuth: AngularFireAuth) {
        this.initUserList();
      }

  ngOnInit() {
    
  }

  initUserList(){
    for (let userUid of this.data.users){
      this.fireStore.collection<User>('/users').doc(userUid)
      .valueChanges().subscribe(
        ((user: User)=>{
          if(user.uid === this.data.owner) user.role = 'Owner';
          else user.role = 'Contributor';

          this.userList.push(user);
          this.userList = [...this.userList];
        })
      );
    }
  }

  addUserToProject(){
    this.fireStore.collection<User>('users',ref=>ref.where('email','==',this.userEmail))
        .valueChanges().subscribe(
          (data: User[]) =>{
            this.data.users.push(data[0].uid);
            this.fireStore.collection('projects').doc(this.data.uid).set(this.data).then(
              () => alert('user added')
            ).catch(
              (error) => alert(error)
            )
          },
          error => {
            alert('error occur');
            console.error(error);
          })
  }

  deleteUserFomProject(userUid: string){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
