import * as ACTION from '../actions/types';
import {goods} from '../Mocks/GoodsMock';

import {
    getEditElement,
    getSubtotal,
    getTotal,
    removeElementById,
    removeSelectedGoodById,
    toggleSelectedGood
} from "../Utils/goodsUtils";

const initialState = {
    goodList: goods,
    selectedGoods: [],
    total: getTotal(goods),
    subtotalElement: 0,
};

export default (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case ACTION.DELETE_ITEM:
            {
                const newArray = removeElementById(payload, state.goodList);
                const newSelectedGoods = removeSelectedGoodById(state.selectedGoods, payload);
                console.log('%c GOODS ACTION.DELETE_ITEM:' ,'color: gray; font-size: 15px', payload);
                return {
                    ...state,
                    goodList: newArray,
                    total: getTotal(newArray),
                    selectedGoods: newSelectedGoods,
                    subtotalElement: getSubtotal(newArray, newSelectedGoods)
                }
            }

        case ACTION.TOGGLE_ITEM:
            {
                console.log('%c GOODS ACTION.TOGGLE_ITEM' ,'color: gray; font-size: 15px', payload);
                const newSelectedGoods = toggleSelectedGood(state.selectedGoods, payload);
                return {
                    ...state,
                    selectedGoods: newSelectedGoods,
                    subtotalElement: getSubtotal(state.goodList, newSelectedGoods),
                    total: getTotal(state.goodList),
                }
            }

        case ACTION.EDIT_ITEM:
            {
                const updatedGoods = getEditElement(state.goodList, payload);
                console.log('%c GOODS ACTION.EDIT_ITEM:','color: gray; font-size: 15px', payload);
                return {
                    ...state,
                    goodList: updatedGoods,
                    total: getTotal(updatedGoods),
                    subtotalElement: getSubtotal(state.goodList, updatedGoods)
                }
            }

        default: return state;
    }

}