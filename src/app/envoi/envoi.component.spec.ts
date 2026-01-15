import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiComponent } from './envoi.component';

describe('EnvoiComponent', () => {
  let component: EnvoiComponent;
  let fixture: ComponentFixture<EnvoiComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
