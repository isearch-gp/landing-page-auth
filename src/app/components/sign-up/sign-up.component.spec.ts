import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';

// Auth service
import { AuthService } from "../../shared/services/auth.service";

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      RouterTestingModule
    ],
    providers: [AuthService]
    })
    .compileComponents();
  }));

    it('should create the app', async(inject([AuthService], (myService: AuthService) => {
    const fixture = TestBed.createComponent(SignUpComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));
});
