import {all} from 'redux-saga/effects';
import {SagaHome} from '../Screen/Home/Redux/saga';

export function* SagaWatcher() {
  yield all([SagaHome()]);
}
