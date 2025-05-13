import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasgboardComponentComponent } from './dasgboard-component.component';

describe('DasgboardComponentComponent', () => {
  let component: DasgboardComponentComponent;
  let fixture: ComponentFixture<DasgboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasgboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasgboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
