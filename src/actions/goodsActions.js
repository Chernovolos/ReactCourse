import * as ACTION  from '../actions/types';

export const deleteItem = (id) => ({type: ACTION.DELETE_ITEM, payload: id});
export const toggleItem = (id) => ({type: ACTION.TOGGLE_ITEM, payload: id});
export const editItem = (updatedGood) => ({type: ACTION.EDIT_ITEM, payload: updatedGood});
