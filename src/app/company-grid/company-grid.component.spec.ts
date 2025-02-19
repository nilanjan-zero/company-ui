import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGridComponent } from './company-grid.component';

describe('CompanyGridComponent', () => {
  let component: CompanyGridComponent;
  let fixture: ComponentFixture<CompanyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
