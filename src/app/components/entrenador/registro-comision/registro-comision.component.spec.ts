import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComisionComponent } from './registro-comision.component';

describe('RegistroComisionComponent', () => {
  let component: RegistroComisionComponent;
  let fixture: ComponentFixture<RegistroComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
