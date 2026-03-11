import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-note-item',
  template: `
    <div class="glass-card p-6 group animate-slide-up relative bg-white/50 border-white/40 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 ease-out">
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-400">Entry #{{ index }}</span>
        </div>
        <p class="text-slate-800 text-lg font-semibold leading-relaxed group-hover:text-indigo-900 transition-colors uppercase tracking-tight">{{ note.content }}</p>
      </div>

      <div class="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
        <div class="flex items-center gap-2 opacity-60">
          <i class="ph ph-calendar-blank text-slate-500"></i>
          <span class="text-[11px] font-bold text-slate-500 tracking-wide">{{ formattedDate }}</span>
        </div>
        
        <button 
          (click)="onDelete.emit(note.id)" 
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white hover:rotate-6 hover:scale-110 active:scale-90 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100">
          <i class="ph-bold ph-trash"></i>
        </button>
      </div>
    </div>
  `
})
export class NoteItemComponent {
  @Input() note: Note;
  @Input() index: number;
  @Output() onDelete = new EventEmitter<string>();

  get formattedDate() {
    if (!this.note || !this.note.createdAt) return '';
    const date = new Date(this.note.createdAt);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
