import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	userForm: FormGroup;
	user!: User;
	userErrMsg!: string;
	submission!: User;
	
	@ViewChild('fform') userFormDirective!: { resetForm: () => void; };

	formErrors = {
		'username': '',
		'name': '',
		'password': '',
	}

	validationMesssages = {
		'username': {
			'required': 'Username is required.',
			'minlength': 'Username must be at least 3 characters long.'
		},
		'name': {
			'required': 'Name is required.',
		},
		'password': {
			'required': 'Password is required.',
			'minlength': 'Password must be at least 3 characters long.'
		}
	}

  	constructor(private fb: FormBuilder,
		private router: Router,
		private userService: UserService) {
		this.userForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(3)]],
		});

		this.userForm.valueChanges
			.subscribe(data => this.onValueChanged(data))

		this.onValueChanged(); //reset form validation messages
	}
	
	ngOnInit() {
	}

	createForm() {
		this.userForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(3)]],
		});

		this.userForm.valueChanges
			.subscribe(data => this.onValueChanged(data))

		this.onValueChanged(); //reset form validation messages
	}

	hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
		return key in obj
	}

	onValueChanged(data?: any) {
		if (!this.userForm) { return; }
		const form = this.userForm;
		for (const field in this.formErrors) {
			if (this.formErrors.hasOwnProperty(field)) {
				if (this.hasKey(this.formErrors, field)) this.formErrors[field] = '';
				const control = form.get(field);
				if (control && control.dirty && !control.valid) {
					const messages = (this.hasKey(this.formErrors, field)) ? this.validationMesssages[field] : '';
					for (const key in control.errors) {
						if (control.errors.hasOwnProperty(key)) {
							if (this.hasKey(this.formErrors, field) && (this.hasKey(messages, key))) this.formErrors[field] += messages[key] + ' ';
						}
					}
				}
			}
		}
	}

	onSubmit() {
		this.user = this.userForm.value;
		console.log(this.user);
		
		this.userService.addUser(this.user)
			.subscribe(
				(user: User) => {
					this.router.navigate(["/login"]);
				}
			);
		
		this.userForm.reset({
			username: '',
			name: '',
			password: ''
		});
		this.userFormDirective.resetForm();
	}

}
