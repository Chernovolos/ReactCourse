import React from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';
import './GoodsList.css';

const GoodsList = (props) => {
    const {goods, selectedGoods, onDelete, onToggle, onEdit, onDeleteSelected} = props;

    return (
        <div className="container">
            <section className="GoodListSection">
                <div className="GoodListContainer">
                    <div className="GoodsListWrapper">
                        {Array.isArray(goods) && goods.map((good) => {
                            return (
                                <GoodsListElement
                                    good={good}
                                    isSelected={selectedGoods.indexOf(good.id) !== -1}
                                    key={good.id}
                                    onDelete={onDelete}
                                    onToggle={onToggle}
                                    onEdit={onEdit}
                                    onDeleteSelected={onDeleteSelected}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
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
    onDeleteSelected: PropTypes.func,
};
