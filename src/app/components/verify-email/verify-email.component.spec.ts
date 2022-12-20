import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';

// Auth service
import { AuthService } from "../../shared/services/auth.service";

import { VerifyEmailComponent } from './verify-email.component';

describe('VerifyEmailMessageComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 29000; // Chrome disconnects in 30s
    
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
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
    const fixture = TestBed.createComponent(VerifyEmailComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));

});
