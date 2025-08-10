import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, TranslateModule.forRoot()],
      providers: [
        provideRouter([], withComponentInputBinding()) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
