import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
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


  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
