import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../shared/services/auth.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['SignUp']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('disables sign up until the form is valid', () => {
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeTrue();

    component.formGroup.setValue({
      Email: 'new.user@example.com',
      Password: 'password123',
      acceptTerms: true
    });
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('submits the sign up form when valid', () => {
    component.formGroup.setValue({
      Email: 'new.user@example.com',
      Password: 'password123',
      acceptTerms: true
    });
    fixture.detectChanges();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit');

    expect(authServiceSpy.SignUp).toHaveBeenCalledOnceWith('new.user@example.com', 'password123');
  });
});
