import { expandEnvVariables } from '../helpers';

expandEnvVariables();

export enum EnvObjects {
  MONGO_OPTIONS = 'MongoOptions',
  USERS_MS_OPTIONS = 'UsersMsOptions',
}

export interface MongoOptions {
  host: string;
  options: {
    authSource: string;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}

export interface UsersMsOptions {
  url: string;
}

export const configuration = (): any => ({
  MongoOptions: {
    host: `mongodb://${process.env.MONGO_HOST}`,
    options: {
      dbName: process.env.MONGO_DB_NAME,
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
    },
  },
  UsersMsOptions: {
    url: process.env.USERS_MS_URL,
  },
});
