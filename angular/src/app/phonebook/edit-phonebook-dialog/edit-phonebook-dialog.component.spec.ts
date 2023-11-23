import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhonebookDialogComponent } from './edit-phonebook-dialog.component';

describe('EditPhonebookDialogComponent', () => {
  let component: EditPhonebookDialogComponent;
  let fixture: ComponentFixture<EditPhonebookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhonebookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonebookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
