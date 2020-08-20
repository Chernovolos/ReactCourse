import React, { useCallback } from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';
import { deleteItem, editItem, toggleItem } from '../actions/goodsActions';
import { useDispatch } from "react-redux";


const GoodsList = (props) => {
    const {selectedGoods, goods} = props;

    const dispatch = useDispatch();

    const onDelete = useCallback(
        (id) => {
            dispatch(deleteItem(id));
        },
        [dispatch],
    );

    const onToggle = useCallback(
        (id) => {
            dispatch(toggleItem(id));
        },
        [dispatch],
    );

    const onEdit = useCallback(
        (updatedGood) => {
            dispatch(editItem(updatedGood));
        },
        [dispatch],
    );

    return (
        <>
            {
                Array.isArray(goods) && goods.map((good) => {
                    return (
                        <GoodsListElement
                            good={good}
                            isSelected={selectedGoods.indexOf(good.id) !== -1}
                            key={good.id}
                            onDelete={onDelete}
                            onToggle={onToggle}
                            onEdit={onEdit}
                        />
                    );
                })
            }
        </>
    );
};

export default GoodsList;

GoodsList.defaultProps = {
    goods: [],
    selectedGoods: [],
};

GoodsList.propTypes = {
    goods: PropTypes.array,
    selectedGoods: PropTypes.array,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
};
