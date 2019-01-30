import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../helpers/jest';
import { getUserActivity } from './actions';

const debug = false;

describe('User activity', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, debug)();
        sagaMiddleware.run(rootSaga);
    });

    describe('Fetch user activity data', () => {
        const payload = [
            {
                id: 1,
                user_id: 1,
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                topic: 'session',
                action: 'login',
                result: 'succeed',
                data: null,
                created_at: '2019-01-22T15:08:36.000Z',
            },
        ];
        const expectedUserActivityFetch = {
            type: 'user-activity/USER_ACTIVITY_FETCH',
        };

        const expectedUserActivityData = {
            type: 'user-activity/USER_ACTIVITY_DATA',
            payload: payload,
        };

        const expectedUserActivityError = {
            type: 'user-activity/USER_ACTIVITY_ERROR',
            payload: {
                code: 500,
                message: 'Server error',
            },
        };

        const mockUserActivityFetch = () => {
            mockAxios.onGet('/resource/users/activity/all').reply(200, payload);
        };

        it('should handle user activity error', async () => {
            mockUserActivityFetch();
            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === 2) {
                        expect(actions[0]).toEqual(expectedUserActivityFetch);
                        expect(actions[1]).toEqual(expectedUserActivityData);
                        resolve();
                    }
                });
            });
            store.dispatch(getUserActivity());
            return promise;
        });

        it('should handle user activity error', async () => {
            mockNetworkError(mockAxios);
            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === 2) {
                        expect(actions[0]).toEqual(expectedUserActivityFetch);
                        expect(actions[1]).toEqual(expectedUserActivityError);
                        resolve();
                    }
                });
            });
            store.dispatch(getUserActivity());
            return promise;
        });
    });
});
