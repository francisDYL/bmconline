import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

  @Output() edit = new EventEmitter<object>();
  @Output() delete = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  editNote(uid: string, category: string) {
    this.edit.emit({uid, category});
  }

  deleteNote(uid: string, category: string) {
    this.delete.emit({uid, category});
  }
}
