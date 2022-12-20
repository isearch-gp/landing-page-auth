import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
//import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
/*** old angularfire 6 compat **/
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
/*** ***/
/*** new angularfire 7 + firebase 9 
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth'
//import { BUCKET } from '@angular/fire/storage'
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore'
***/
//import { connectFunctionsEmulator, Functions, getFunctions, provideFunctions } from '@angular/fire/functions'
//import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage'
import { environment } from '../environments/environment';

// toggles - need to pick one
//import { NgToggleModule } from '@nth-cloud/ng-toggle'
import { UiSwitchModule } from 'ngx-ui-switch'

// Auth service
import { AuthService } from "./shared/services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /*** old ***/
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
   /*** ***/
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    /***
    provideAuth(() => {
      let auth = getAuth()
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: false })
      }
      return auth
    }),
   ***/
   /***
    provideFirestore(() => {
      let firestore: Firestore
      if (environment.useEmulators) {
        // long polling for Cypress
        firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        })
        connectFirestoreEmulator(firestore, 'localhost', 8080)
      } else {
        firestore = getFirestore()
      }
      return firestore
    }),
   ***/
    /*** no storage or functions
    provideStorage(() => {
      const storage = getStorage()
      if (environment.useEmulators) {
        connectStorageEmulator(storage, 'localhost', 9199)
      }
      return storage
    }),
    provideFunctions(() => {
      let functions: Functions
      functions = getFunctions()
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, 'localhost', 5001)
      }
      return functions
    }),
   ***/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // NgbModule.forRoot(),
    //NgToggleModule,
    UiSwitchModule,
    //NgBootstrapFormValidationModule.forRoot(),
    // only import both if single module
    // import below in non-app modules
    //NgBootstrapFormValidationModule
  ],
  providers: [
     AuthService,
     /*** no storage
     {
       provide: BUCKET,
       useValue: environment.firebase.storageBucket,
     }
    ***/
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
