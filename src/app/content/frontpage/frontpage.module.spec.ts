import { FrontpageModule } from './frontpage.module';

describe('FrontpageModule', () => {
  let frontpageModule: FrontpageModule;

  beforeEach(() => {
    frontpageModule = new FrontpageModule();
  });

  it('should create an instance', () => {
    expect(frontpageModule).toBeTruthy();
  });
});
