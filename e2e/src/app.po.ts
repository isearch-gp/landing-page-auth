import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    //return element(by.css('app-root h1')).getText();
    return element(by.css('app-root h3')).getText();
  }

  // after login should goto http://localhost:4200/dashboard
  // then look for 'app-root h1' === User Profile
}
