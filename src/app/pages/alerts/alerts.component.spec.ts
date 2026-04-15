import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsPageComponent } from './alerts.component';

describe('AlertsPageComponent', () => {
  let component: AlertsPageComponent;
  let fixture: ComponentFixture<AlertsPageComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AlertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
