import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionFormComponent } from './reception-form.component';

describe('ReceptionFormComponent', () => {
  let component: ReceptionFormComponent;
  let fixture: ComponentFixture<ReceptionFormComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
