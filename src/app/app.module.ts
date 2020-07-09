import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";

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
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // NgbModule.forRoot(),
    //NgToggleModule,
    UiSwitchModule,
    NgBootstrapFormValidationModule.forRoot(),
    // only import both if single module
    // import below in non-app modules
    NgBootstrapFormValidationModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
