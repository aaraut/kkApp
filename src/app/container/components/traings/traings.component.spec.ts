import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingsComponent } from './traings.component';

describe('TraingsComponent', () => {
  let component: TraingsComponent;
  let fixture: ComponentFixture<TraingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
