import * as ACTION from '../actions/types';
import { goods } from '../Mocks/GoodsMock';
import { goodsCategory } from '../Mocks/GoodsCategory';

import {
    addNewItem,
    deleteSelectedElements, getEditElement,
    getSubtotal,
    getTotal,
    removeElementById, removeSelectedGoodById,
    toggleSelectedGood
} from "../Utils/goodsUtils";

const initialState = {
    goodList: goods,
    goodsCategory:goodsCategory,
    selectedGoods: [],
    total: getTotal(goods),
    subtotalElement: 0,
};

export default (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case ACTION.ADD_ITEM:
            {
                const newArray = addNewItem(payload, state.goodList);
                console.log('%c LAYOUT ACTION.ADD_ITEM:', 'color: red; font-size: 15px', payload);
                return {
                    ...state,
                    goodList: newArray,
                    total: getTotal(newArray),
                    subtotalElement: getSubtotal(newArray, state.selectedGoods),
                }
            }

        case ACTION.DELETE_ITEM:
            {
                const newArray = removeElementById(payload, state.goodList);
                const newSelectedGoods = removeSelectedGoodById(state.selectedGoods, payload);
                console.log('%c LAYOUT ACTION.DELETE_ITEM:' ,'color: red; font-size: 15px', payload);
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
                console.log('%c LAYOUT ACTION.TOGGLE_ITEM' ,'color: red; font-size: 15px', payload);
                const newSelectedGoods = toggleSelectedGood(state.selectedGoods, payload);
                return {
                    ...state,
                    selectedGoods: newSelectedGoods,
                    subtotalElement: getSubtotal(state.goodList, newSelectedGoods),
                    total: getTotal(state.goodList),
                }
            }

        case ACTION.DELETE_SELECTED:
            {
                const newArray = deleteSelectedElements(state.goodList, state.selectedGoods);
                console.log('%c LAYOUT ACTION.DELETE_SELECTED:', 'color: red; font-size: 15px');
                return {
                    ...state,
                    goodList: newArray,
                    selectedGoods: [],
                    total: getTotal(newArray),
                    subtotalElement: getSubtotal(newArray, [])
                }
            }

        case ACTION.EDIT_ITEM:
            {
                const updatedGoods = getEditElement(state.goodList, payload);
                console.log('%c LAYOUT ACTION.EDIT_ITEM:','color: red; font-size: 15px', payload);
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