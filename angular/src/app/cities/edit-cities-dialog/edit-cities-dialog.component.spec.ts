import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitiesDialogComponent } from './edit-cities-dialog.component';

describe('EditCitiesDialogComponent', () => {
  let component: EditCitiesDialogComponent;
  let fixture: ComponentFixture<EditCitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCitiesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
