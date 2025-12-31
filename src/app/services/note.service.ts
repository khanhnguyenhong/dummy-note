import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/models/note.model';
import { BehaviorSubject } from 'rxjs';
import { get, isEmpty } from 'lodash';

@Injectable({ providedIn: 'root' })
export class NoteService {
  noteData: Note[] = [];
  onNoteChange: BehaviorSubject<Note[]>;

  constructor(private http: HttpClient) {
    this.onNoteChange = new BehaviorSubject<Note[]>([]);
    try {
      this.noteData = JSON.parse(localStorage.getItem('note-list') || '');
      this.onNoteChange.next(this.noteData);
    } catch (error) {
      console.log('No note data in local storage', error);
    }
  }

  createNote(note: Note) {
    this.noteData.unshift(note);
    this.storeNote();
  }

  editNote(note: Note) {
    if (isEmpty(this.noteData.find((note) => note.id === note.id))) {
      return;
    }
    this.noteData = this.noteData.filter((n) => n.id !== note.id);
    this.noteData.unshift(note);
    this.storeNote();
  }

  importNotes(notes: Note[]) {
    console.log('importing', notes);
    this.noteData = notes;
    this.storeNote();
  }

  deleteNote(noteId: number) {
    this.noteData = this.noteData.filter((note) => note.id !== noteId);
    this.storeNote();
  }

  storeNote() {
    localStorage.setItem('note-list', JSON.stringify(this.noteData));
    this.onNoteChange.next(this.noteData);
  }
}
