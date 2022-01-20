import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '../_models/note';

@Injectable()
export class NoteService {
    constructor(private http: HttpClient) { }
	private URL = 'http://localhost:3001'

    getAll() {
        return this.http.get<Note[]>(`${this.URL}/api/notes`);
    }
/*
    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    
	*/

	create(note: string) {
        return this.http.post<Note>(`${this.URL}/api/notes`, {note});
    }

	delete(id: number) {
        return this.http.delete(`${this.URL}/api/notes/${id}`);
    }
}