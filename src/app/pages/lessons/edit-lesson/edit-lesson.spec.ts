import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLesson } from './edit-lesson';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('EditLesson', () => {
  let component: EditLesson;
  let fixture: ComponentFixture<EditLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLesson, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
