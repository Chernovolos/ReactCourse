import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import GoodCategorySelect from '../GoodCategorySelect/GoodCategorySelect';
import {Button, Col, Form} from 'react-bootstrap';

import { useDispatch} from 'react-redux';
import {addItem} from '../actions/formActions';

export default function GoodsListForm(props) {
    const { goodsCategory} = props;

    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [stateInput, setStateInput] = useState({
        title: '',
        weight: '',
        description: '',
    });

    const onInputChange = useCallback(
        ({target}) => {
            setStateInput({
                ...stateInput,
                [target.name]: target.value,
            });
        },
        [stateInput],
    );


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidated(true);
            dispatch(addItem(stateInput));
            setStateInput({
                title: '',
                weight: '',
                description: '',
            });
        }
            setValidated(false);

    };


    const {title, weight, description} = stateInput;

    return (
        <>
            <Col sm={4}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId='title'>
                        <Form.Control
                            type='text'
                            placeholder='Title...'
                            name='title'
                            value={title}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    <Form.Group controlId='weight'>
                        <Form.Control
                            type='number'
                            placeholder='Weight...'
                            name='weight'
                            value={weight}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    <Form.Group controlId='description'>
                        <Form.Control
                            type='description'
                            placeholder='Description...'
                            name='description'
                            value={description}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    <Button
                        type='submit'
                        size='lg'
                        className='text-uppercase'
                        disabled={!weight.length || !description.length || !title.length}
                    >
                    Add
                    </Button>
                </Form>
            </Col>
            <Col sm={4}>
                <GoodCategorySelect
                    goodsCategory={goodsCategory}
                    onInputChange={onInputChange}
                />
            </Col>
        </>
    );
}

GoodsListForm.defaultProps = {
    goodsCategory: [],
};

GoodsListForm.propTypes = {
    goodsCategory: PropTypes.array,
    onAdd: PropTypes.func,
};
