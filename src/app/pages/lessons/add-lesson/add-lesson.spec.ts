import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLesson } from './add-lesson';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('AddLesson', () => {
  let component: AddLesson;
  let fixture: ComponentFixture<AddLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLesson, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
