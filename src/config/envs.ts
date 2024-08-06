import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  COLLABORATORS_HOST_MS: string;
  COLLABORATORS_PORT_MS: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),

    COLLABORATORS_HOST_MS: joi.string().required(),
    COLLABORATORS_PORT_MS: joi.number().required(),
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
};
