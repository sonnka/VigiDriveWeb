import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAccessesComponent } from './driver-accesses.component';

describe('DriverAccessesComponent', () => {
  let component: DriverAccessesComponent;
  let fixture: ComponentFixture<DriverAccessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverAccessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
