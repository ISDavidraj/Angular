import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanaceComponent } from './performanace.component';

describe('PerformanaceComponent', () => {
  let component: PerformanaceComponent;
  let fixture: ComponentFixture<PerformanaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
