import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLesson } from './list-lesson';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('ListLesson', () => {
  let component: ListLesson;
  let fixture: ComponentFixture<ListLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLesson, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
