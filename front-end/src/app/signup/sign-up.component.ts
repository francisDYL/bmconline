import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	email: string;
	password: string;
	firstName: string;
	lastName: string;

	// tslint:disable-next-line: max-line-length
	constructor(private userService: UserService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

	ngOnInit() {
	}

	signUp() {
		const user: User = {email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName };
		this.spinner.show();
		this.userService.signup(user).subscribe(
			data => {
				this.spinner.hide();
				this.toastr.error(data.message);
				this.router.navigate(['/signin']);
			},
			error => {
				this.handleError(error);
			}

		);
	}

	handleError(error: any) {
		this.email = '';
		this.password = '';
		this.firstName = '';
		this.lastName = '';
		this.spinner.hide();
		this.toastr.error(error.message);
	}
}
