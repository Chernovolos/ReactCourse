import React, {useCallback, useState} from 'react';
import '../assets/scss/index.scss';
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
import {Badge, Button, Col, Container, Navbar, Row} from 'react-bootstrap';


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
            setTotal(getTotal(goods));
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
        <Container>
            <Navbar bg='dark' variant='dark' className='mb-5'>
                <Navbar.Brand>Fridge</Navbar.Brand>
            </Navbar>
            <section className='mb-5'>
                <Row>
                    <GoodsListForm onAdd={onAdd} goodsCategory={goodsCategory}/>
                </Row>
            </section>
            <section>
                <Row className='justify-content-md-around'>
                    <Col className='mb-3'>
                        <Button
                            onClick={onDeleteSelected}
                            disabled={!selectedGoods.length}
                            size='lg'
                            variant='danger'
                            className='mr-3 text-uppercase'
                        >
                            delete
                        </Button>
                    </Col>
                    <Col sm={4}>
                        <h3>Subtotal:
                            <Badge variant='secondary' className='ml-3'> {subtotalElement}</Badge>
                        </h3>
                    </Col>
                    <Col>
                        <h3>Total:
                            <Badge variant='secondary' className='ml-3'> {total}</Badge>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <GoodsList
                        goods={goods}
                        selectedGoods={selectedGoods}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDeleteSelected={onDeleteSelected}
                    />
                </Row>
            </section>
        </Container>
    );
}

App.defaultProps = {
    goods: [],
    goodsCategory: [],
};

App.prototype = {
    goods: PropTypes.array,
    goodsCategory: PropTypes.array,
};

