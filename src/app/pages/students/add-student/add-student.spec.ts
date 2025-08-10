import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudent } from './add-student';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('AddStudent', () => {
  let component: AddStudent;
  let fixture: ComponentFixture<AddStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudent,TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
