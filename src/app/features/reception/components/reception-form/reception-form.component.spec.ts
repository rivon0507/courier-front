import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionFormComponent } from './reception-form.component';

describe('ReceptionForm', () => {
  let component: ReceptionFormComponent;
  let fixture: ComponentFixture<ReceptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceptionFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
