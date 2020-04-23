import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MintemperatureComponent } from './mintemperature.component';

describe('MintemperatureComponent', () => {
  let component: MintemperatureComponent;
  let fixture: ComponentFixture<MintemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MintemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MintemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
