import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgUserComponent } from './pg-user.component';

describe('PgUserComponent', () => {
  let component: PgUserComponent;
  let fixture: ComponentFixture<PgUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
