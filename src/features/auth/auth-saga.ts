import { call, put, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API, API_BASE_URL, ApiError } from 'src/common/common-consts';
import { SignUpBody, SignupSuccessResponse } from 'src/features/auth/auth-consts';
import { signupSagaRequest, signupSagaSuccess, signupSagaFailure } from './auth-slice';
import { saveTokenToStorage } from './auth-thunks';
import { setProfile } from 'src/features/profile/profile-slice';
import { createFakeProfile } from 'src/features/profile/profile-consts';

type SignupSagaPayload = {
  data: SignUpBody;
  navigate: (path: string) => void;
};

async function signupApi(data: SignUpBody): Promise<SignupSuccessResponse | { errors: ApiError[] }> {
  const response = await fetch(`${API_BASE_URL}${API.SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

function* signupSaga(action: PayloadAction<SignupSagaPayload>) {
  try {
    const { data, navigate } = action.payload;
    const result: SignupSuccessResponse | { errors: ApiError[] } = yield call(signupApi, data);

    if ('errors' in result) {
      yield put(signupSagaFailure(result.errors));
      return;
    }

    const { token, profile } = result;
    yield put(saveTokenToStorage(token));
    yield put(setProfile(createFakeProfile(token, profile)));
    yield put(signupSagaSuccess());
    navigate('/');
  } catch (error) {
    const apiError: ApiError[] = [
      {
        name: 'NetworkError',
        message: 'Произошла ошибка на сервере',
      },
    ];
    yield put(signupSagaFailure(apiError));
  }
}

export function* watchSignupSaga() {
  yield takeEvery(signupSagaRequest.type, signupSaga);
}
