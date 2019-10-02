import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {Note} from '../../model/note';
import {AddNoteDialogComponent} from '../../shared/add-note-dialog/add-note-dialog.component';
@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {

  showFiller = false;

  dropLists = {
    keyPartners: new Map<string, Note>(),
    keyActivities: new Map<string, Note>(),
    keyRessources: new Map<string, Note>(),
    valueProposition: new Map<string, Note>(),
    customers: new Map<string, Note>(),
    channel: new Map<string, Note>(),
    customerSegment: new Map<string, Note>(),
    costStructure: new Map<string, Note>(),
    revenueStream: new Map<string, Note>()
  };


  constructor(private dialog: MatDialog) {
    const note: Note = {id: 'partner1', title: 'partner1', content: 'partner1', color: 'gray', category: 'keyPartners'};
    const note2: Note = {id: 'partner2', title: 'partner2', content: 'partner2', color: 'gray', category: 'keyPartners'};

    this.dropLists.keyPartners.set(note.id, note);
    this.dropLists.keyPartners.set(note2.id, note2);
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {

    const originContainer = event.previousContainer.id;
    const destinationContainer = event.container.id;
    const id = event.item.data;

    const note = this.dropLists[originContainer].get(id);
    note.category = destinationContainer;

    this.dropLists[originContainer].delete(id);
    this.dropLists[destinationContainer].set(id, note);
  }

  addNote(category: string) {

    const note = this.createNote();
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '40vw',
      data: note
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result !== undefined && result.title !== '' && result.content !== '') {
         result.id = this.generateId();
         result.category = category;
         this.dropLists[category].set(result.id, result);
      }
    });
  }

  onEdit(data) {
    const note = this.dropLists[data.category].get(data.id);
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '40vw',
      data: note
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result !== undefined && result.title !== '' && result.content !== '') {
        this.dropLists[data.category].set(data.id, result);
      }
    });
  }

  onDelete(data) {
    this.dropLists[data.category].delete(data.id);
  }

  createNote() {
    return {id: '', title: '', content: '', color: '', category: ''};
  }

  generateId() {
    let d = new Date().getTime(); // Timestamp
    // tslint:disable-next-line: max-line-length
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {// Use timestamp until depleted
            // tslint:disable-next-line: no-bitwise
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {// Use microseconds since page-load if supported
            // tslint:disable-next-line: no-bitwise
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        // tslint:disable-next-line: no-bitwise
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }


  mapToArray(map: Map<string, Note>) {
    return Array.from(map.values());
  }
}
