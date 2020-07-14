import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  // for alert
  //isAlertDisplayed = true;
  formGroup: FormGroup

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup ({
      Email: new FormControl('', [
        Validators.required,
	Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
	]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
	]),
      acceptTerms: new FormControl(false, [
        Validators.requiredTrue
        ])
      })
  }

  //onSubmit(f ngForm) {
  onSubmit(f: FormGroup) {
    /***
    alert('success: \n\n'+
      'email='+ f.value.Email+
      '\npassword='+ f.value.Password+
      '\ntnc='+ f.value.acceptTerms)
      ***/
    console.log(f.value)
    //alert('success: \n\n' + JSON.stringify(this.model, null, 4))
    //authService.SignUp(userEmail.value, userPwd.value)
    this.authService.SignUp(f.value.Email, f.value.Password)
  }

  onReset() {
    this.formGroup.reset()
  }
}
