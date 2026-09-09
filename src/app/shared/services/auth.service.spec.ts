import { NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authState$: BehaviorSubject<any>;
  let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;
  let afsSpy: jasmine.SpyObj<AngularFirestore>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userDocSpy: { set: jasmine.Spy };
  let service: AuthService;

  beforeEach(() => {
    authState$ = new BehaviorSubject<any>(null);
    userDocSpy = {
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve())
    };

    afAuthSpy = jasmine.createSpyObj<AngularFireAuth>(
      'AngularFireAuth',
      ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword'],
      { authState: authState$.asObservable() }
    );
    afsSpy = jasmine.createSpyObj<AngularFirestore>('AngularFirestore', ['doc']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    afsSpy.doc.and.returnValue(userDocSpy as any);

    localStorage.clear();
    service = new AuthService(
      afsSpy,
      afAuthSpy,
      routerSpy,
      new NgZone({ enableLongStackTrace: false })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a firebase user and store signup data', async () => {
    const newUser = {
      uid: 'new-user-id',
      email: 'new.user@example.com',
      displayName: null,
      photoURL: null,
      emailVerified: false,
      metadata: {
        lastSignInTime: '2026-09-09T00:00:00.000Z',
        creationTime: '2026-09-09T00:00:00.000Z'
      },
      sendEmailVerification: jasmine.createSpy('sendEmailVerification').and.returnValue(Promise.resolve())
    };

    afAuthSpy.createUserWithEmailAndPassword.and.returnValue(
      Promise.resolve({ user: newUser } as any)
    );

    await service.SignUp('new.user@example.com', 'password123');
    await Promise.resolve();

    expect(afAuthSpy.createUserWithEmailAndPassword).toHaveBeenCalledOnceWith(
      'new.user@example.com',
      'password123'
    );
    expect(newUser.sendEmailVerification).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['verify-email-address']);
    expect(afsSpy.doc).toHaveBeenCalledWith('users/new-user-id' as any);
    expect(userDocSpy.set).toHaveBeenCalledWith(
      jasmine.objectContaining({
        uid: 'new-user-id',
        email: 'new.user@example.com',
        isAdmin: false,
        emailVerified: false
      }),
      { merge: true }
    );
  });

  it('should sign in an existing firebase user and store login data', async () => {
    const existingUser = {
      uid: 'existing-user-id',
      email: 'existing.user@example.com',
      displayName: 'Existing User',
      photoURL: null,
      emailVerified: true,
      metadata: {
        lastSignInTime: '2026-09-09T01:00:00.000Z',
        creationTime: '2026-09-01T00:00:00.000Z'
      }
    };

    afAuthSpy.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({ user: existingUser } as any)
    );
    authState$.next(existingUser);

    await service.SignIn('existing.user@example.com', 'password123');

    expect(afAuthSpy.signInWithEmailAndPassword).toHaveBeenCalledOnceWith(
      'existing.user@example.com',
      'password123'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
    expect(afsSpy.doc).toHaveBeenCalledWith('users/existing-user-id' as any);

    const savedUser = userDocSpy.set.calls.mostRecent().args[0];

    expect(savedUser.uid).toBe('existing-user-id');
    expect(savedUser.email).toBe('existing.user@example.com');
    expect(savedUser.emailVerified).toBeTrue();
    expect(savedUser.isAdmin).toBeUndefined();
    expect(userDocSpy.set.calls.mostRecent().args[1]).toEqual({ merge: true });
  });
});
