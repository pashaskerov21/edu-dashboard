import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lessons } from './lessons';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('Lessons', () => {
  let component: Lessons;
  let fixture: ComponentFixture<Lessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lessons, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
