import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDriveComponent } from './my-drive.component';

describe('MyDriveComponent', () => {
  let component: MyDriveComponent;
  let fixture: ComponentFixture<MyDriveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDriveComponent],
    });
    fixture = TestBed.createComponent(MyDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
