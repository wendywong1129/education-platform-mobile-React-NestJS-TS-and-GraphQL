export const AUTH_TOKEN = 'mobile_auth_token';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TYPE = 'all';
export const DISABLE_DEV = process.env.NODE_ENV !== 'production';
export const DAY_FORMAT = 'YYYY-MM-DD';
export const CARD_TYPE = {
  TIME: ['time', 'TIME CARD'],
  DURATION: ['duration', 'DURATION CARD'],
};
export const CARD_STATUS = {
  VALID: 'VALID',
  EXPIRED: 'EXPIRED',
  DEPLETE: 'DEPLETE',
};

export const SCHEDULE_STATUS = {
  NO_DO: ['NO_DO', 'primary', 'Not Commencing'],
  DOING: ['DOING', 'success', 'Studying'],
  FINISH: ['FINISH', 'default', 'Finished'],
  COMMENTED: ['COMMENTED', 'warning', 'Commented'],
  CANCEL: ['CANCEL', 'danger', 'Canceled'],
};
