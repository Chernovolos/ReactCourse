import {createStore} from "redux";
import reducers from '../src/reducers';

export const store = createStore(
    reducers,
);