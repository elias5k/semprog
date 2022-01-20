import { Component, OnInit } from '@angular/core';

import { Note } from '../_models/note';
import { User } from '../_models/user';
import { NoteService } from '../_services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentUser: User;
	notes: Note[] = [];
	model: any = {};

    constructor(private noteService: NoteService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit() {
		this.getNotes();
    }

	private getNotes() {
		this.noteService.getAll().subscribe(notes => { this.notes = notes; });
	}

	deleteNote(id: number) {
		this.notes.filter(note => note.id !== id);
		this.noteService.delete(id).subscribe(() => { this.getNotes() });;
	}

	addNote() {
		this.noteService.create(this.model.note).subscribe(note => this.notes.push(note));
		this.model.note = '';
	}
}
