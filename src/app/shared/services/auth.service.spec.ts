//import { async, TestBed } from '@angular/core/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
//import { AngularFireModule } from "@angular/fire";
//import { AngularFireAuthModule } from "@angular/fire/auth";
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireModule } from "@angular/fire/compat";
//import { AngularFireAuthModule } from "@angular/fire/compat/auth";
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {

/**** old
//beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      RouterTestingModule
    ]
    })
  }));

  // or stub it with: https://github.com/angular/angularfire/issues/1706


  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
***/
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });
});
