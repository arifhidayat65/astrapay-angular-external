import { MyMenuPage } from './app.po';

describe('my-menu App', function() {
  let page: MyMenuPage;

  beforeEach(() => {
    page = new MyMenuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
