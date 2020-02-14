import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
		this.userService.signin(this.email, this.password).subscribe(
			data => {
				this.userService.saveLoginData(data);
				this.router.navigate(['/dashboard']);
			},
			error => {
				this.handleError(error);
			}

		);
	}

	handleError(error: any) {
		this.email = '';
		this.password = '';
		this.spinner.hide();
		this.toastr.error(error.message);
	}
}
