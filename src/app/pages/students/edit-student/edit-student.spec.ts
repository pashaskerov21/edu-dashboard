import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudent } from './edit-student';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('EditStudent', () => {
  let component: EditStudent;
  let fixture: ComponentFixture<EditStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudent, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
