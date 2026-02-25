import { all } from 'redux-saga/effects';
import { watchSignupSaga } from 'src/features/auth/auth-saga';

export function* rootSaga() {
  yield all([watchSignupSaga()]);
}
