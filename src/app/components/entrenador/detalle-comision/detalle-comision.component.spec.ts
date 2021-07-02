import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComisionComponent } from './detalle-comision.component';

describe('DetalleComisionComponent', () => {
  let component: DetalleComisionComponent;
  let fixture: ComponentFixture<DetalleComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
