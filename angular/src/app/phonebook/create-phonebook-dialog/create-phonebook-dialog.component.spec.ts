import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhonebookDialogComponent } from './create-phonebook-dialog.component';

describe('CreatePhonebookDialogComponent', () => {
  let component: CreatePhonebookDialogComponent;
  let fixture: ComponentFixture<CreatePhonebookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePhonebookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhonebookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
