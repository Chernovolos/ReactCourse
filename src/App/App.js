import React, {useCallback, useState} from 'react';
import './App.css';
import {goods as goodsMock} from '../Mocks/GoodsMock';
import {goodsCategory as goodsCategoryMock} from '../Mocks/GoodsCategory';
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


export default function App() {
    const [goods, setGoods] = useState(goodsMock);
    const [goodsCategory, setGoodsCategory] = useState(goodsCategoryMock);
    const [total, setTotal] = useState(getTotal(goods));
    const [subtotalElement, setSubtotalElement] = useState(0);
    const [selectedGoods, setSelectedGoods] = useState([]);

    const onAdd = useCallback(
        (newElement) => {
            const newArray = addNewItem(newElement, goods);
            setGoods(newArray);
            setSubtotalElement(getSubtotal(newArray, selectedGoods));
            setTotal(getTotal(newArray));
        },
        [goods, selectedGoods],
    );

    const onDelete = useCallback(
        (id) => {
            const newArray = removeElementById(id, goods);
            const newSelectedGoods = removeSelectedGoodById(selectedGoods, id);
            console.log('newSelectedGoods:', newSelectedGoods);
            setGoods(newArray);
            setSelectedGoods(newSelectedGoods);
            setSubtotalElement(getSubtotal(newArray, newSelectedGoods));
            setTotal(getTotal(newArray));
        },
        [goods, selectedGoods],
    );

    const onToggle = useCallback(
        (id) => {
            const newSelectedGoods = toggleSelectedGood(selectedGoods, id);
            setSelectedGoods(newSelectedGoods);
            setSubtotalElement(getSubtotal(goods, newSelectedGoods));
        },
        [goods, selectedGoods],
    );

    const onEdit = useCallback(
        (updatedGood) => {
            const updatedGoods = getEditElement(goods, updatedGood);
            setGoods(updatedGoods);
            setTotal(getTotal(updatedGoods));
            setSubtotalElement(getSubtotal(goods, updatedGoods));
        },
        [goods],
    );

    const onDeleteSelected = useCallback(
        () => {
            const newArray = deleteSelectedElements(goods, selectedGoods);
            setGoods(newArray);
            setSelectedGoods([]);
            setSubtotalElement(getSubtotal(newArray, []));
            setTotal(getTotal(newArray));
        },
        [goods, selectedGoods],
    );


    return (
        <div className="container">
            <div>
                <div className="Title">Fridge</div>
            </div>
            <section>
                <div className="AppWrapper">
                    <GoodsListForm onAdd={onAdd} goodsCategory={goodsCategory}/>
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
                        onClick={onDeleteSelected}
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
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
                onDeleteSelected={onDeleteSelected}
            />
        </div>
    );
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
