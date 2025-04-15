import { secretEnvironment } from './environment.secret';

export const environment = {
  production: false,
  totalumApiKey: secretEnvironment.totalumApiKey,
};
