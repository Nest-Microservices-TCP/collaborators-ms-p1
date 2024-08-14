import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  COLLABORATORS_HOST_MS: string;
  COLLABORATORS_PORT_MS: number;

  POSTGRES_DB_HOST: string;
  POSTGRES_DB_PORT: number;
  POSTGRES_DB_USERNAME: string;
  POSTGRES_DB_PASSWORD: string;
  POSTGRES_DATABASE: string;
  POSTGRES_DB_SYNCHRONIZE: boolean;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),

    COLLABORATORS_HOST_MS: joi.string().required(),
    COLLABORATORS_PORT_MS: joi.number().required(),

    POSTGRES_DB_HOST: joi.string().required(),
    POSTGRES_DB_PORT: joi.number().required(),
    POSTGRES_DB_USERNAME: joi.string().required(),
    POSTGRES_DB_PASSWORD: joi.string().required(),
    POSTGRES_DATABASE: joi.string().required(),
    POSTGRES_DB_SYNCHRONIZE: joi.boolean().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,

  collaboratorsHostMS: envVars.COLLABORATORS_HOST_MS,
  collaboratorsPortMS: envVars.COLLABORATORS_PORT_MS,

  postgresDBHost: envVars.POSTGRES_DB_HOST,
  postgresDBPort: envVars.POSTGRES_DB_PORT,
  postgresDBUsername: envVars.POSTGRES_DB_USERNAME,
  postgresDBPassword: envVars.POSTGRES_DB_PASSWORD,
  postgresDatabase: envVars.POSTGRES_DATABASE,
  postgresDBSynchronize: envVars.POSTGRES_DB_SYNCHRONIZE,
};
