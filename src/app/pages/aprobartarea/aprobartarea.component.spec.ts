import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobartareaComponent } from './aprobartarea.component';

describe('AprobartareaComponent', () => {
  let component: AprobartareaComponent;
  let fixture: ComponentFixture<AprobartareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobartareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobartareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
