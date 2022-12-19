import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
      //AngularFirestore,
      RouterTestingModule
    ],
    providers: [AuthService, AngularFirestore]
    })
    .compileComponents();
  }));

  it('should create the app', async(inject([AuthService], (myService: AuthService) => {
    const fixture = TestBed.createComponent(SignInComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));

});
