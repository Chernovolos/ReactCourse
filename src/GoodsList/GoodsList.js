import React, {Component} from 'react';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';
import './GoodsList.css';

export default class GoodsList extends Component {
    onDelete = (id) => {
        this.props.onDelete(id);
    };

    onToggle = (id) => {
        this.props.onToggle(id);
    };

    onEdit = (updatedGood) => {
        this.props.onEdit(updatedGood);
    };

    render() {
        const {goods, selectedGoods} = this.props;
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
                                        onDelete={this.onDelete}
                                        onToggle={this.onToggle}
                                        onEdit={this.onEdit}
                                        onDeleteSelected={this.onDeleteSelected}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

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
