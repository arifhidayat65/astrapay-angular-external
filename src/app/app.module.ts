import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteFormComponent } from './components/notes/note-form/note-form.component';
import { NoteItemComponent } from './components/notes/note-item/note-item.component';
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteFormComponent,
    NoteItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
