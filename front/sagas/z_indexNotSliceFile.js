import {
  all,
  fork,
  take,
  call,
  put,
  takeLatest,
  throttle,
  delay,
} from "redux-saga/effects";
import axios from "axios";

//test example 한줄한줄 실행
// const l = login({type: 'LOG_IN_REQUEST', data: {id: "zo@gmail.com"}})
// l.next();
// l.next();

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILUERE",
      data: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post("/api/logout");
}

function* logout() {
  try {
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILUERE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", login); // LOG_IN_REQUEST이 실행될 때까지 기다린다. 기다린 다음 login 실행
}

function* watchLogout() {
  yield takeLatest("LOG_OUT", logout);
}

function* watchAddPost() {
  yield takeLatest("ADD_POST", addPost);
}

//비동기 액션을 하나씩 만듬
//fork call 로 generator을 실행해준다.
//fork는 비동기 요청, call은 동기 함수 호출
//all은 그런 애들을 동시에 실행해준다.

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
