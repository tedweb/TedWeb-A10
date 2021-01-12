import { EdhAdminModule } from './edh-admin.module';

describe('EdhAdminModule', () => {
  let edhAdminModule: EdhAdminModule;

  beforeEach(() => {
    edhAdminModule = new EdhAdminModule();
  });

  it('should create an instance', () => {
    expect(edhAdminModule).toBeTruthy();
  });
});
