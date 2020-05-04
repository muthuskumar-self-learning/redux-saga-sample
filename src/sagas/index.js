import { takeLatest, call, put } from 'redux-saga/effects';

import { FETCH_WHISKIES, fetchWhiskiesSuccess, fetchWhiskiesFailure } from '../actions';

const url = 'https://evening-citadel-85778.herokuapp.com/whiskey/';

function* workerSaga() {
    try {
        const response = yield call(fetch, url);
        const responseBody = yield response.json();
        console.log('response: ', responseBody);
        const whiskies = responseBody.results
                            .map(whiskey => ({
                                id: whiskey.id,
                                name: whiskey.title,
                                imageUrl: whiskey.image_url
                            }))
                            .filter(whiskey => !whiskey.imageUrl);
        yield put(fetchWhiskiesSuccess(whiskies));
    } catch (err) {
        yield put(fetchWhiskiesFailure(err));
    }
}

function* watcherSaga() {
    yield takeLatest(FETCH_WHISKIES, workerSaga);
}

export default watcherSaga;