/* eslint-disable no-console */

export enum LogSeverity {
  DEFAULT = 'DEFAULT',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
  ALERT = 'ALERT',
  EMERGENCY = 'EMERGENCY',
}

interface LogEntry {
  [key: string]: unknown;
  message: string;
  severity: LogSeverity;
}

export interface LogPayload {
  [key: string]: unknown;
  message?: never;
  severity?: never;
}

const log = (entry: LogEntry): void => {
  const stringifiedEntry = JSON.stringify(entry);

  switch (entry.severity) {
    case LogSeverity.ERROR:
      console.error(stringifiedEntry);
      break;
    case LogSeverity.INFO:
      console.log(stringifiedEntry);
      break;
    default:
      console.debug(stringifiedEntry);
  }
};

export const logDebug = (message: string, payload: LogPayload = {}): void => {
  log({
    message,
    severity: LogSeverity.DEBUG,
    ...payload,
  });
};

export const logError = (
  error: Error | string,
  payload: LogPayload = {},
): void => {
  log({
    message: error.toString(),
    severity: LogSeverity.ERROR,
    ...payload,
  });
};

export const logInfo = (message: string, payload: LogPayload = {}): void => {
  log({
    message,
    severity: LogSeverity.INFO,
    ...payload,
  });
};
