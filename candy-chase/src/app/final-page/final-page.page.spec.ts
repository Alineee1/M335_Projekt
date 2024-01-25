import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalPagePage } from './final-page.page';

describe('FinalPagePage', () => {
  let component: FinalPagePage;
  let fixture: ComponentFixture<FinalPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
