import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBoardComponent } from './note-board.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NoteCreatorComponent } from './note-creator/note-creator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoteImporterComponent } from './notes-importer/note-importer.component';

const routes: Routes = [{ path: '', component: NoteBoardComponent }];

@NgModule({
  declarations: [
    NoteBoardComponent,
    NoteCreatorComponent,
    NoteImporterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatButtonModule,
    ExtendedModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class NoteBoardModule {}
