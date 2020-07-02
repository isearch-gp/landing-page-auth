import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

// Auth service
import { AuthService } from "../../shared/services/auth.service";

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
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
    const fixture = TestBed.createComponent(SignInComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));

});
