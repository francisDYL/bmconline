import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	email: string;
	password: string;
	// tslint:disable-next-line: max-line-length
	constructor(private userService: UserService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

	ngOnInit() {
	}

	signIn() {
		this.spinner.show();
		this.userService.signin(this.email, this.password).then(
			(data) => {
				const user : User = {
					uid: data.user.uid,
					email : data.user.email,
					emailVerified: data.user.emailVerified,
					displayName: data.user.displayName,
					photoURL: data.user.photoURL,
					phoneNumber: data.user.phoneNumber,
					isAnonymous: data.user.isAnonymous
				}
				this.userService.saveLoginData(user);
				this.router.navigate(['/dashboard']);
			},
			error => {
				this.handleError(error);
			}

		);
	}

	handleError(error) {
		this.email = '';
		this.password = '';
		this.spinner.hide();
		this.toastr.error(error.message);
	}
}
