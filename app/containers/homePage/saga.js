import { takeLatest, put, call } from 'redux-saga/effects';
import {
  errorAllTask,
  errorSample,
  errorSaveTask,
  errorUpdateTask,
  loadAllTask,
  loadedAllTask,
  loadedSample,
  loadedSaveTask,
  loadedUpdateTask,
  loadSample,
  loadSaveTask,
  loadUpdateTask,
} from './actions';
import { Config } from '../../utils/config';
import request from '../../utils/request';

/**
 * Root saga manages watcher lifecycle
 */

function* loadDeviceEvent() {
  try {
    yield put(loadedSample({ sample: {} }));
  } catch (err) {
    yield put(errorSample(err));
  }
}

function* loadSaveTaskEvent(action) {
  const { task } = action.payload;
  try {
    const result = yield call(
      request,
      `${Config.baseApi}/users/jacobHarasimo/todos/`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ text: task }),
      },
    );
    const todo = result.data.todo[0];
    yield put(loadedSaveTask({ todo }));
  } catch (err) {
    yield put(errorSaveTask(err));
  }
}

function* loadAllTaskEvent() {
  try {
    const result = yield call(
      request,
      `${Config.baseApi}/users/jacobHarasimo/todos/`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'get',
      },
    );
    yield put(loadedAllTask({ todos: result.data }));
  } catch (err) {
    yield put(errorAllTask(err));
  }
}

function* loadUpdateTaskEvent(action) {
  const { todo } = action.payload;
  const currentDate = new Date();
  try {
    yield call(
      request,
      `${Config.baseApi}/users/jacobHarasimo/todos/${todo._id}`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
          text: todo.text,
          completedAt: currentDate,
        }),
      },
    );

    yield put(
      loadedUpdateTask({
        todo: Object.assign(todo, { completedAt: currentDate }),
      }),
    );
  } catch (err) {
    yield put(errorUpdateTask(err));
  }
}

export default function* LoadhomeSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(loadSample().type, loadDeviceEvent);
  yield takeLatest(loadSaveTask().type, loadSaveTaskEvent);
  yield takeLatest(loadAllTask().type, loadAllTaskEvent);
  yield takeLatest(loadUpdateTask().type, loadUpdateTaskEvent);
}
