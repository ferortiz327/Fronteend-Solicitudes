import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuradicacionComponent } from './menuradicacion.component';

describe('MenuradicacionComponent', () => {
  let component: MenuradicacionComponent;
  let fixture: ComponentFixture<MenuradicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuradicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuradicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
