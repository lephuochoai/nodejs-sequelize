import initAuthController from './auth.controller';

export default function initApiController(app) {
  initAuthController(app);
}
