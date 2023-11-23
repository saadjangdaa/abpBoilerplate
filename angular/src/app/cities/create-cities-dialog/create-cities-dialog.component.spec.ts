import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCitiesDialogComponent } from './create-cities-dialog.component';

describe('CreateCitiesDialogComponent', () => {
  let component: CreateCitiesDialogComponent;
  let fixture: ComponentFixture<CreateCitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCitiesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
