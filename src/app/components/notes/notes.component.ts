import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  // Model State
  notes: Note[] = [];
  
  // UI State
  loading: boolean = false;
  isSubmitting: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  // Controller Logics
  fetchNotes() {
    this.loading = true;
    this.noteService.getNotes().subscribe(
      notes => {
        this.notes = notes;
        this.loading = false;
      },
      err => {
        this.error = err;
        this.loading = false;
      }
    );
  }

  addNote(content: string) {
    if (!content || !content.trim()) {
      this.error = 'Catatan tidak boleh kosong';
      setTimeout(() => this.error = '', 3000);
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = '';

    this.noteService.addNote(content).subscribe(
      () => {
        this.isSubmitting = false;
        this.fetchNotes();
        this.showSuccess('Note captured');
      },
      err => {
        this.error = err;
        this.isSubmitting = false;
        setTimeout(() => this.error = '', 5000);
      }
    );
  }

  deleteNote(id: string) {
    if (this.isSubmitting) return;

    this.noteService.deleteNote(id).subscribe(
      () => {
        this.fetchNotes();
        this.showSuccess('Note deleted');
      },
      err => {
        this.error = err;
      }
    );
  }

  private showSuccess(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }
}
