import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPiecesFormComponent } from './reception-pieces-form.component';

describe('ReceptionPiecesFormComponent', () => {
  let component: ReceptionPiecesFormComponent;
  let fixture: ComponentFixture<ReceptionPiecesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionPiecesFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceptionPiecesFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
