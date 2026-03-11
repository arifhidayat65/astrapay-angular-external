import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-note-form',
  styles: [`
    :host { display: block; position: sticky; top: 100px; z-index: 40; margin-bottom: 4rem; }
  `],
  template: `
    <div class="glass-card p-2 sm:p-3 flex flex-col sm:flex-row gap-3 ring-8 ring-indigo-50/50 transition-all duration-300">
      <div class="relative flex-grow flex items-center group">
        <i class="ph ph-hash absolute left-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
        <input 
          type="text" 
          [(ngModel)]="content" 
          placeholder="Type a new thought..." 
          (keyup.enter)="submit()"
          [disabled]="disabled"
          class="w-full pl-12 pr-6 py-5 rounded-[1.5rem] border-0 bg-slate-50/50 focus:bg-white ring-0 focus:ring-2 focus:ring-indigo-100 transition-all duration-500 font-medium text-slate-700 placeholder:text-slate-400">
      </div>
      <button 
        (click)="submit()" 
        [disabled]="disabled"
        class="premium-btn px-10 py-5 bg-indigo-600 hover:bg-slate-900 text-white font-bold rounded-[1.5rem] shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50">
        <i *ngIf="!disabled" class="ph-bold ph-plus"></i>
        <span *ngIf="disabled" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        <span>{{ disabled ? 'Saving...' : 'Save Note' }}</span>
      </button>
    </div>
  `
})
export class NoteFormComponent {
  @Input() disabled: boolean = false;
  @Output() onAdd = new EventEmitter<string>();
  
  content: string = '';

  submit() {
    this.onAdd.emit(this.content);
    this.content = '';
  }
}
