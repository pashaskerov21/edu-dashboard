import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleted } from './deleted';
import { TranslateModule } from '@ngx-translate/core';

describe('Deleted', () => {
  let component: Deleted;
  let fixture: ComponentFixture<Deleted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleted,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleted);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
