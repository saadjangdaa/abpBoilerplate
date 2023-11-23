import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountriesDialogComponent } from './create-countries-dialog.component';

describe('CreateCountriesDialogComponent', () => {
  let component: CreateCountriesDialogComponent;
  let fixture: ComponentFixture<CreateCountriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCountriesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
