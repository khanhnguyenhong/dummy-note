import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MY_FORMATS } from '../../../shared/constants/date.constant';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-note-importer',
  templateUrl: './note-importer.component.html',
  styleUrls: ['./note-importer.component.scss'],
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
export class NoteImporterComponent implements OnInit {
  boardContent = '';
  constructor(
    public matDialogRef: MatDialogRef<NoteImporterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (!isEmpty(this.data.exportString)) {
      this.boardContent = this.data.exportString;
    } else {
      this.boardContent = '';
    }
  }

  importNoteFromString() {
    this.matDialogRef.close(this.boardContent);
  }

  copyText() {
    navigator.clipboard.writeText(this.boardContent).then(() => {
      alert('Copied!');
    });
  }
}
