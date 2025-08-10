import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudent } from './list-student';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('ListStudent', () => {
  let component: ListStudent;
  let fixture: ComponentFixture<ListStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudent, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
