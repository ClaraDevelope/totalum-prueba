import { secretEnvironment } from './enviroment.secret';

export const environment = {
  production: false,
  totalumApiKey: secretEnvironment.totalumApiKey,
};
