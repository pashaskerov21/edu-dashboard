import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exams } from './exams';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('Exams', () => {
  let component: Exams;
  let fixture: ComponentFixture<Exams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exams, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
