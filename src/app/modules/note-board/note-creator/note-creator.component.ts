import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LearningProcess, Note } from '../../../shared/models/note.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MY_FORMATS } from '../../../shared/constants/date.constant';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { isEmpty } from 'lodash';
import { NOTE_ACTION, NOTE_TYPE } from "../../../shared/constants/note.constant";

@Component({
  selector: 'app-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class NoteCreatorComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({});
  showDelete = false;
  options = [
    {
      label: 'none',
      value: NOTE_TYPE.NONE
    },
    {
      label: 'Learning',
      value: NOTE_TYPE.LEARNING
    }
  ]

  constructor(
    public matDialogRef: MatDialogRef<NoteCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    const inputNote = new Note(this.data.note);
    this.noteForm = this.formBuilder.group({
      title: inputNote.title,
      type: inputNote.type,
      description: inputNote.description,
      urgency: inputNote.urgency,
      value: inputNote.value,
      currentReview: inputNote.learningProcess?.currentReview,
      nextReview: inputNote.learningProcess?.nextReview,
    });
    this.showDelete = this.data.action === NOTE_ACTION.EDIT;
  }

  setReviewToday() {
    this.noteForm.controls['currentReview'].setValue(moment(new Date()));
  }

  setNextReviewPlus(days: number) {
    const nextReviewControl = this.noteForm.controls['nextReview'];
    const nextReview = nextReviewControl.getRawValue();

    if (isEmpty(nextReview)) {
      return;
    }

    nextReviewControl.setValue(moment(nextReview).add(days, 'days'));
  }

  saveNote() {
    const rawData = this.noteForm.getRawValue();
    const learningProcess = new LearningProcess(rawData);
    const savingNote = new Note({
      ...this.data.note,
      ...rawData,
    });
    savingNote.learningProcess = learningProcess;

    this.matDialogRef.close({
      note: savingNote,
      action: NOTE_ACTION.SAVE,
    });
  }

  deleteNote() {
    this.matDialogRef.close({
      note: this.data.note,
      action: NOTE_ACTION.DELETE,
    });
  }
}
