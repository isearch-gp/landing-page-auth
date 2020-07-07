import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { UserProfile } from "../services/user-profile";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  userProfile: Observable<UserProfile>

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  OriginalSignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user, false);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // new Sign in with email/password from 
  // https://github.com/SinghDigamber/angularfirebase-authentication/issues/3
  SignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
      //this.SetUserData(result.user);  // refresh
        this.afAuth.authState.subscribe((user) => {
	  if (user) {
	     console.log("SignIn:user=",user)
	    //this.SetUserData(user);
            this.router.navigate(['dashboard']);
          }
          console.log("SignIn:result.user=", result.user)
          this.SetUserData(result.user,false);  // refresh
        })
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
	this.SendVerificationMail();

	//console.log("result.user =",result.user)
        this.SetUserData(result.user, true);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user is logged in and email is verified and isAdmin
  isUserAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user != null && user.uid != null) {
      this.userProfile = this.getUserRecord(user.uid).valueChanges();
      //return (this.userProfile !== null && this.userProfile.isAdmin == true) ? true : false;
      return (this.userProfile !== null) ? false : true; // for now
    } else {
      return false
    }
    //return (user !== null && user.emailVerified !== false && user.isAdmin == true) ? true : false;
  }

  // Sign in with Google
  //GoogleAuth() {
  //  return this.AuthLogin(new auth.GoogleAuthProvider());
  //}

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user, false);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user, force:boolean) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let anyUserData: any = null
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      lastLoggedIn: user.metadata.lastSignInTime,
      createTime: user.metadata.creationTime
    }
    anyUserData = userData
    // if force then isAdmin = false (on signup)
    if (force) {
      anyUserData.isAdmin = false
    } else {
      // keep current value
    }
    //console.log("uid =",user.uid)
    console.log("force =",force)
    console.log("userData =",userData)
    return userRef.set(anyUserData, {
      merge: true
      })
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  getUsersData() {
     const things = this.afs.collection('users').valueChanges();
     things.subscribe(console.log);

     return things;
  }

  getUserRecord(uId: string): AngularFirestoreDocument<UserProfile> {
    return this.afs.collection('users').doc(uId);
  }
}
