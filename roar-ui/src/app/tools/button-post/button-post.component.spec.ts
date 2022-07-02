import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPostComponent } from './button-post.component';

describe('ButtonPostComponent', () => {
  let component: ButtonPostComponent;
  let fixture: ComponentFixture<ButtonPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
