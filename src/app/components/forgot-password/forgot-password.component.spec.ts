// more here:
// https://stackoverflow.com/questions/49086975/no-provider-for-angularfirestore
// https://stackoverflow.com/questions/61741499/how-to-instantiate-angularfireauth-and-angularfirestore-for-integration-testing?rq=1
// https://github.com/angular/angularfire/issues/1706#issuecomment-394212606
// https://stackoverflow.com/a/50829496
//
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';

// Auth service
import { AuthService } from "../../shared/services/auth.service";

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 49000; // Chrome disconnects in 30s
    
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
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
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));

});
