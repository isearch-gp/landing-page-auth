import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    
    //console.log(page.getParagraphText())
    //expect(page.getParagraphText()).toEqual('Welcome to angularfirebase-authentication!');
    expect(page.getParagraphText()).toEqual('Sign In');
  });
});
