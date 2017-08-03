import { ServiceInventoryDashboardMasterPage } from './app.po';

describe('service-inventory-dashboard-master App', () => {
  let page: ServiceInventoryDashboardMasterPage;

  beforeEach(() => {
    page = new ServiceInventoryDashboardMasterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
