import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExam } from './add-exam';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('AddExam', () => {
  let component: AddExam;
  let fixture: ComponentFixture<AddExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExam,TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
