import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExam } from './list-exam';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('ListExam', () => {
  let component: ListExam;
  let fixture: ComponentFixture<ListExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExam, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
