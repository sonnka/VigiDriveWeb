import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAccessesComponent } from './manager-accesses.component';

describe('ManagerAccessesComponent', () => {
  let component: ManagerAccessesComponent;
  let fixture: ComponentFixture<ManagerAccessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerAccessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
