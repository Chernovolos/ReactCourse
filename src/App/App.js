import React, {Component} from 'react';
import './App.css';
import {goods} from '../Mocks/GoodsMock';
import {goodsCategory} from '../Mocks/GoodsCategory';
import GoodsList from '../GoodsList/GoodsList';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import {
    addNewItem,
    getSubtotal,
    getTotal,
    removeElementById,
    getEditElement,
    deleteSelectedElements,
    toggleSelectedGood,
    removeSelectedGoodById,
} from '../Utils/goodsUtils';
import PropTypes from 'prop-types';

export default class App extends Component {
    state = {
        goods,
        goodsCategory,
        total: getTotal(goods),
        subtotalElement: 0,
        selectedGoods: [],
    };

    recalculateTotal = () => {
        this.setState((state) => ({
            ...this.state,
            total: getTotal(state.goods),
        }));
    };

    onAdd = (newElement) => {
        this.setState(({goods}) => {
            const newArray = addNewItem(newElement, goods);
            return {
                ...this.state,
                goods: newArray,
                subtotalElement: getSubtotal(newArray, this.state.selectedGoods),
                total: getTotal(newArray),
            };
        });
    };

    onDelete = (id) => {
        const newArray = removeElementById(id, this.state.goods);
        const newSelectedGoods = removeSelectedGoodById(this.state.selectedGoods, id);
        this.setState({
            ...this.state,
            goods: newArray,
            selectedGoods: newSelectedGoods,
            subtotalElement: getSubtotal(newArray, newSelectedGoods),
            total: getTotal(newArray),
        });
    };

    onToggle = (id) => {
        const newSelectedGoods = toggleSelectedGood(this.state.selectedGoods, id);
        this.setState({
            ...this.state,
            selectedGoods: newSelectedGoods,
            subtotalElement: getSubtotal(this.state.goods, newSelectedGoods),
        });
    };

    onEdit = (updatedGood) => {
        const updatedGoods = getEditElement(this.state.goods, updatedGood);
        this.setState({
            ...this.state,
            goods: updatedGoods,
        });
    };

    onDeleteSelected = () => {
        const newArray = deleteSelectedElements(this.state.goods, this.state.selectedGoods);
        this.setState({
            ...this.state,
            goods: newArray,
            selectedGoods: [],
            subtotalElement: getSubtotal(newArray, []),
            total: getTotal(newArray),
        });
    };

    render() {
        const {total, goods, subtotalElement, goodsCategory, selectedGoods} = this.state;
        return (
            <div className="container">
                <div>
                    <div className="Title">Fridge</div>
                </div>
                <section>
                    <div className="AppWrapper">
                        <GoodsListForm onAdd={this.onAdd} goodsCategory={goodsCategory}/>
                        <div className="TotalWrapper">
                            <div className="Total">
                                <h3>Subtotal: </h3>
                                <p className="TotalNumber">{subtotalElement}</p>
                            </div>
                            <div className="Total">
                                <h3>Total: </h3>
                                <p className="TotalNumber">{total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="AppButtonWrapper">
                        <button
                            onClick={this.onDeleteSelected}
                            disabled={!selectedGoods.length}
                            className="button AppButton"
                        >
                            delete
                        </button>
                    </div>
                </section>
                <GoodsList
                    goods={goods}
                    selectedGoods={selectedGoods}
                    onDelete={this.onDelete}
                    onToggle={this.onToggle}
                    onEdit={this.onEdit}
                    onDeleteSelected={this.onDeleteSelected}
                />
            </div>
        );
    }
}

App.defaultProps = {
    goods: [],
    selectedElement: [],
    total: 0,
    subtotalElement: 0,
    goodsCategory: [],
};

App.propTypes = {
    total: PropTypes.number,
    subtotalElement: PropTypes.number,
    goods: PropTypes.array,
    selectedGoods: PropTypes.array,
    goodsCategory: PropTypes.array,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
    onDeleteSelected: PropTypes.func,
};
