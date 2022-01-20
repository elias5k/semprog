import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
	private URL = 'http://localhost:3001'

    getAll() {
        return this.http.get<User[]>(`${this.URL}/api/users`);
    }

	addUser(user: User) {
		return this.http.post<User>(`${this.URL}/api/users`, user);
	}

	promoteUser(user: User) {
		const promotion = {role: 'admin'};
		return this.http.put<User>(`${this.URL}/api/users/${user.id}`, promotion);
	}

	demoteUser(user: User) {
		const demotion = {role: 'user'};
		return this.http.put<User>(`${this.URL}/api/users/${user.id}`, demotion);
	}
}