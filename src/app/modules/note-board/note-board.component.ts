import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Subject, takeUntil } from 'rxjs';
import { LearningProcess, Note } from '../../shared/models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteCreatorComponent } from './note-creator/note-creator.component';
import { NOTE_ACTION, NOTE_TYPE } from '../../shared/constants/note.constant';
import { isEmpty } from 'lodash';
import { ConfirmationDialogComponent } from '../../shared/comfirmation.dialog/confirmation-dialog.component';
import * as moment from 'moment';
import { NoteImporterComponent } from './notes-importer/note-importer.component';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteBoardComponent implements OnInit, OnDestroy {
  unsubscribeAll: Subject<any>;
  noteList: Note[] = [];
  learningNotes: Note[] = [];
  overdueNotes: Note[] = [];
  currentNotes: Note[] = [];
  futureNotes: Note[] = [];
  otherNotes: Note[] = [];
  constructor(
    private noteService: NoteService,
    private matDialog: MatDialog,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.noteService.onNoteChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((notes) => {
        this.noteList = notes;
        this.classifyNote();
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next({});
    this.unsubscribeAll.complete();
  }

  createNote(): void {
    this.noteService.createNote(
      new Note({
        id: new Date().getTime(),
        title: 'new Note',
        description: '',
        urgency: 0,
        value: 0,
        type: NOTE_TYPE.NONE,
        tags: [],
      }),
    );
  }

  createLearningNote(): void {
    const ref = this.matDialog.open(NoteCreatorComponent, {
      data: {
        note: new Note({
          id: new Date().getTime(),
          title: 'New Learning Note',
          description: '',
          urgency: 0,
          value: 0,
          type: NOTE_TYPE.LEARNING,
          learningProcess: new LearningProcess({}),
          tags: [],
        }),
        action: NOTE_ACTION.CREATE,
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        if (isEmpty(response)) {
          return;
        }

        const { note: savingNote } = response;
        this.noteService.createNote(savingNote);
      });
  }

  editNote(note: any): void {
    const ref = this.matDialog.open(NoteCreatorComponent, {
      data: {
        note,
        action: NOTE_ACTION.EDIT,
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        if (isEmpty(response)) {
          return;
        }

        const { action, note: savingNote } = response;

        if (action === NOTE_ACTION.DELETE) {
          this.noteService.deleteNote(note.id);
        } else {
          this.noteService.editNote(savingNote);
        }
      });
  }

  classifyNote() {
    this.learningNotes = this.noteList.filter(
      (n) => n.type === NOTE_TYPE.LEARNING,
    );
    this.otherNotes = this.noteList.filter(
      (n) => n.type !== NOTE_TYPE.LEARNING,
    );
    this.futureNotes = this.learningNotes.filter((n) => {
      if (
        isEmpty(n.learningProcess || isEmpty(n.learningProcess!.nextReview))
      ) {
        return false;
      }

      return (
        moment(n.learningProcess!.nextReview).isAfter(moment(new Date())) &&
        !moment(n.learningProcess!.nextReview).isSame(moment(new Date()), 'day')
      );
    });

    this.overdueNotes = this.learningNotes.filter((n) => {
      if (
        isEmpty(n.learningProcess || isEmpty(n.learningProcess!.nextReview))
      ) {
        return false;
      }

      return (
        moment(n.learningProcess!.nextReview).isBefore(moment(new Date())) &&
        !moment(n.learningProcess!.nextReview).isSame(moment(new Date()), 'day')
      );
    });

    this.currentNotes = this.learningNotes.filter((n) => {
      if (
        isEmpty(n.learningProcess || isEmpty(n.learningProcess!.nextReview))
      ) {
        return false;
      }

      return moment(n.learningProcess!.nextReview).isSame(
        moment(new Date()),
        'day',
      );
    });
  }

  deleteNote(note: any): void {
    const ref = this.matDialog.open(ConfirmationDialogComponent, {});

    ref
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        if (response) {
          this.noteService.deleteNote(note.id);
        }
      });
  }

  exportNotes(): void {
    this.importNotes(JSON.stringify(this.noteService.noteData));
  }

  importNotes(exportString = ''): void {
    const ref = this.matDialog.open(NoteImporterComponent, {
      data: {
        exportString,
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        console.log(response);
        if (isEmpty(response)) {
          return;
        }

        try {
          const parsedData = JSON.parse(response);
          console.log(parsedData);
          this.noteService.importNotes(parsedData);
        } catch (error) {
          console.log('Cannot import', error);
        }
      });
  }
}
