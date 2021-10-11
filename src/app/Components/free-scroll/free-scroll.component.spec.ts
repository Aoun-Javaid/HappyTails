import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeScrollComponent } from './free-scroll.component';

describe('FreeScrollComponent', () => {
  let component: FreeScrollComponent;
  let fixture: ComponentFixture<FreeScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
