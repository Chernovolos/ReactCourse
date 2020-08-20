import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Button, Col, Container, Navbar, Row } from 'react-bootstrap';

import { addItem, deleteSelected } from '../actions/layoutAction';
import GoodsList from '../GoodsList/GoodsList';
import GoodsListForm from '../GoodsListForm/GoodsListForm';

export default function Layout(props) {

    const dispatch = useDispatch();

    const goods = useSelector(state => state.layout.goodList, shallowEqual);
    const selectedGoods = useSelector(state => state.layout.selectedGoods, shallowEqual);
    const subtotalElement = useSelector(state => state.layout.subtotalElement, shallowEqual);
    const total = useSelector(state => state.layout.total, shallowEqual);
    const goodsCategory = useSelector(state => state.layout.goodsCategory, shallowEqual);

    const onAdd = useCallback(
        (newElement) => {
            dispatch(addItem(newElement));
        },
        [dispatch],
    );

    const onDeleteSelected = useCallback(
        () => {
            dispatch(deleteSelected());
        },
        [dispatch],
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
                        onDeleteSelected={onDeleteSelected}
                    />
                </Row>
            </section>
        </Container>
    );
}

Layout.defaultProps = {
    goods: [],
    goodsCategory: [],
};

Layout.prototype = {
    goods: PropTypes.array,
    goodsCategory: PropTypes.array,
};

