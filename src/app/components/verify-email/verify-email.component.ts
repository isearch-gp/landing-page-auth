import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
//import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
//const auth = getAuth();
//await sendEmailVerification(auth.currentUser)

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
