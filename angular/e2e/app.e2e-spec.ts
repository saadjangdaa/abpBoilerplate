import { firstboilerplateTemplatePage } from './app.po';

describe('firstboilerplate App', function() {
  let page: firstboilerplateTemplatePage;

  beforeEach(() => {
    page = new firstboilerplateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
