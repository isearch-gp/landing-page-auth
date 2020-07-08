import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import {
  NgbModalConfig,
  NgbModal, ModalDismissReasons,
  NgbModalRef // eslint-disable-line no-unused-vars
  } from '@ng-bootstrap/ng-bootstrap' // eslint-disable-line no-unused-vars
import { NgToggleModule } from '@nth-cloud/ng-toggle'
//import { UiSwitchModule } from 'ngx-ui-switch'

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class DashboardComponent implements OnInit {
  
  // for alert
  isAlertDisplayed = true;
  
  //isAdmin: boolean = false;
  isAdmin: boolean = true;
  showUserProfile: boolean = true;
  users: any = null
  singleUser: any = null

  // modals
  closeResult: string;
  //resultNotes: string = '';
  private modalReference: NgbModalRef

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    config: NgbModalConfig,
    public modalService: NgbModal
    ) {
   // customize default values of modals used by this component tree
    config.backdrop = 'static' // can also be true or false
    config.keyboard = false
    }

  ngOnInit() {
    console.log("isAdmin1 = ", this.isAdmin)
    //this.isAdmin = this.authService.isUserAdmin();
    console.log("isAdmin2 = ", this.isAdmin)
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

  changeEmail(user) {
  }

  changePassword(user) {
  }

  deleteAccount(user) {
  }

  openModal (content, user1) {
    //this.resultNotes = result1.notes
    this.singleUser = user1
    // this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then((result) => {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
      console.log('content ', content)
      console.log('editResult')

      // save notes back to result?
      //result1.notes = this.resultNotes
      //user = this.singleUser

      // save to localstore?
      //this.activeQuery = this.resultService.updateResult(result1, this.activeQuery)
      //this.queryService.updateQuery(this.activeQuery)

      // no default action
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason (reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }

  changeUserPassword(singleUser) {
  }

  disableUser(singleUser) {
  }

  deleteUser(singleUser) {
  }
}
