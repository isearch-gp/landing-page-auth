import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean = false;
  showUserProfile: boolean = true;
  users: any = null

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isUserAdmin();
    console.log("isAdmin = ", this.isAdmin)
  }

  gotoAdmin() {
    console.log("gotoAdmin()")
    this.showUserProfile = false;

    // read all users data in to a users object for display
    this.users = this.authService.getUsersData()
  }

  gotoUserProfile() {
    console.log("gotoUserProfile()")
    this.showUserProfile = true;
  }
}
