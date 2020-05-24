import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  userList: Map<string,User> = new Map<string,User>();
  displayedColumns: string[] = ['email', 'role', 'delete'];
  userEmail: string = '';

  constructor(public dialogRef: MatDialogRef<EditProjectComponent>,
     @Inject(MAT_DIALOG_DATA) public data:Project,
     private fireStore: AngularFirestore,
			private toastr: ToastrService) {
        this.initUserList();
      }

  ngOnInit() {
    
  }

  initUserList(){
    for (let userUid of this.data.users){
     const userSubScription = this.fireStore.collection<User>('/users').doc(userUid)
      .valueChanges().subscribe(
        ((user: User)=>{
          if(user.uid === this.data.owner) user.role = 'Owner';
          else user.role = 'Contributor';

          this.userList.set(user.uid,user);
          userSubScription.unsubscribe();
        })
      );

    }
  }

  addUserToProject(){
  const userSubScription =  this.fireStore.collection<User>('users',ref=>ref.where('email','==',this.userEmail))
        .valueChanges().subscribe(
          (data: User[]) =>{
            if(data.length>0){
              this.data.users.push(data[0].uid);
              this.fireStore.collection('projects').doc(this.data.uid).set(this.data).then(
                () => {
                  data[0].role = 'Contributor';
                  this.userList.set(data[0].uid,data[0]);
                  this.toastr.success(`user successfully added`);
                  userSubScription.unsubscribe();
                }
              ).catch(
                (error) => {
                  this.toastr.error(`unexpected error please try again`);
                  console.error(error);
                  userSubScription.unsubscribe();
                }
              )
            }
            else{
              this.toastr.warning(`user with email ${this.userEmail} doesn't exit`);
              userSubScription.unsubscribe();
            }
           
          },
          error => {
            this.toastr.error(`unexpected error please try again`);
            console.error(error);
          });
  }

  deleteUserFomProject(userUid: string){
    const index = this.data.users.indexOf(userUid);
    this.data.users.splice(index,1);
    this.fireStore.collection('projects').doc(this.data.uid).set(this.data).then(
      ()=> {
        this.userList.delete(userUid);
        this.toastr.success('user successfully removed');
      }
    ).catch(
      (error)=>{
        this.toastr.error(`unexpected error please try again`);
        console.error(error);
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  userMapToArray() {
		return Array.from(this.userList.values());
	}

}
