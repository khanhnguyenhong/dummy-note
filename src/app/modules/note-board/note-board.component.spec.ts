import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBoardComponent } from './note-board.component';

describe('NoteBoardComponent', () => {
  let component: NoteBoardComponent;
  let fixture: ComponentFixture<NoteBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteBoardComponent]
    });
    fixture = TestBed.createComponent(NoteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
