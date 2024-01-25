import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraAccessPage } from './camera-access.page';

describe('CameraAccessPage', () => {
  let component: CameraAccessPage;
  let fixture: ComponentFixture<CameraAccessPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(CameraAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
