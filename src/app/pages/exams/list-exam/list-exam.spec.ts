import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExam } from './list-exam';

describe('ListExam', () => {
  let component: ListExam;
  let fixture: ComponentFixture<ListExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExam]
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
