import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteImporterComponent } from './note-importer.component';

describe('NoteCreatorComponent', () => {
  let component: NoteImporterComponent;
  let fixture: ComponentFixture<NoteImporterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteImporterComponent]
    });
    fixture = TestBed.createComponent(NoteImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
