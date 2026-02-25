export type ThunkStatus = {
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
};

export const THUNK_STATUSES = {
  DEFAULT: { isPending: false, isFulfilled: false, isRejected: false },
  PENDING: { isPending: true, isFulfilled: false, isRejected: false },
  FULFILLED: { isPending: false, isFulfilled: true, isRejected: false },
  REJECTED: { isPending: false, isFulfilled: false, isRejected: true },
} as const;
