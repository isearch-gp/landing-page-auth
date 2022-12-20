import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';

// Auth service
import { AuthService } from "../../shared/services/auth.service";

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // to fix ->Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.

  //jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;  // default is 60000?

  beforeEach(async(() => {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000; // now get DISCONNECTED
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 29000; // Chrome disconnects in 30s
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 29000; // Chrome disconnects in 30s

    TestBed.configureTestingModule({
    declarations: [ DashboardComponent ],
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

  /***
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  ***/

  it('should create the app', async(inject([AuthService], (myService: AuthService) => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));
});
