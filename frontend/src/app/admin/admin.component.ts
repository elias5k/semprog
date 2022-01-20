import { Component, OnInit } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	users: User[] = [];
	currentUser: User;

	constructor(private userService: UserService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
	}

	ngOnInit(): void {
		this.userService.getAll().subscribe(users => this.users = users);
	}

	promoteUser(user: User) {
		this.userService.promoteUser(user)
			.subscribe(
				promotedUser => {
					const i = this.users.findIndex(user => user.id === promotedUser.id);
					this.users[i] = promotedUser;
				}
			)
	}

	demoteUser(user: User) {
		this.userService.demoteUser(user)
			.subscribe(
				demotedUser => {
					const i = this.users.findIndex(user => user.id === demotedUser.id);
					this.users[i] = demotedUser;
				}
			)
	}


}
