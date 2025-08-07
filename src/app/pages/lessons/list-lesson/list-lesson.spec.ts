import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLesson } from './list-lesson';

describe('ListLesson', () => {
  let component: ListLesson;
  let fixture: ComponentFixture<ListLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLesson]
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
