import * as ACTION from "./types";

export const addItem = (item) => ({type: ACTION.ADD_ITEM, payload: item});
export const deleteItem = (id) => ({type: ACTION.DELETE_ITEM, payload: id});
export const toggleItem = (id) => ({type: ACTION.TOGGLE_ITEM, payload: id});
export const editItem = (updatedGood) => ({type: ACTION.EDIT_ITEM, payload: updatedGood});
export const deleteSelected = () => ({type: ACTION.DELETE_SELECTED});