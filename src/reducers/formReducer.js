import * as ACTION  from '../actions/types';

const initialState = {
    item: {
        title: '',
        weight: '',
        description: '',
    },
};

export default (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case ACTION.ADD_ITEM:
            console.log('%c FORM ACTION.ADD_ITEM:', 'color: green; font-size: 15px', payload);
            return {
                ...state,
                item: {...payload},
            };

        default: return state;
    }

}