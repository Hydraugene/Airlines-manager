import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurRoutageComponent } from './erreur-routage.component';

describe('ErreurRoutageComponent', () => {
  let component: ErreurRoutageComponent;
  let fixture: ComponentFixture<ErreurRoutageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurRoutageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErreurRoutageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
