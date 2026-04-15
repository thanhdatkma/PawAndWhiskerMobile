import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPageComponent } from './categories.component';

describe('CategoriesPageComponent', () => {
  let component: CategoriesPageComponent;
  let fixture: ComponentFixture<CategoriesPageComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
