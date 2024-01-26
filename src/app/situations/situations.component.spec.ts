import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationsComponent } from './situations.component';

describe('SituationsComponent', () => {
  let component: SituationsComponent;
  let fixture: ComponentFixture<SituationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SituationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
