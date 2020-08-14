import React from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';

const GoodsList = (props) => {
    const {goods, selectedGoods, onDelete, onToggle, onEdit} = props;
    const handleToggle = (e) => onToggle(e);

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
                            onToggle={handleToggle}
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
