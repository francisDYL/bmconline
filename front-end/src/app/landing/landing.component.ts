import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  email: string;
  content: string;
  isHandset$: Observable<boolean>;
  constructor(private breakPointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.isHandset$ = this.breakPointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
  }

  sendMessage(){
    this.spinner.show();
    const uid = this.fireStore.createId();
    const contactMessages = {from:this.email, content:this.content, uid: uid}; 
					this.fireStore.collection('emails').doc(uid).set(contactMessages).then(
						(data)=>{
              this.email = '';
              this.content = '';
              this.spinner.hide();
              this.toastr.success('message successfully sended');
						}).catch(
						(error)=>{
              this.spinner.hide();
							this.toastr.error('unexpected error please try again');
							console.error(error);
						}
					);
  }

}
