import { env as environment } from 'process';

export const LOCALHOST_HOST_MATCHERS =
  typeof environment.LOCALHOST_HOST_MATCHERS === 'string'
    ? environment.LOCALHOST_HOST_MATCHERS
    : '127.0.0.1|localhost|0.0.0.0';
