import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import GoodCategorySelect from '../GoodCategorySelect/GoodCategorySelect';
import {Button, Col, Form} from 'react-bootstrap';

export default function GoodsListForm(props) {
    const {onAdd, goodsCategory} = props;

    const [stateInput, setStateInput] = useState({
        title: '',
        weight: '',
        description: '',
    });

    const [validated, setValidated] = useState(false);

    // const onFormSubmit = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         onAdd(stateInput);
    //         setStateInput({
    //             title: '',
    //             weight: '',
    //             description: '',
    //         });
    //     },
    //     [onAdd, stateInput],
    // );

    const onInputChange = useCallback(
        ({target}) => {
            setStateInput({
                ...stateInput,
                [target.name]: target.value,
            });
        },
        [stateInput],
    );

    const onAddGood = useCallback(
        (e) => {
            e.preventDefault();
            onAdd(stateInput);
            setStateInput({
                title: '',
                weight: '',
                description: '',
            });
        },
        [onAdd, stateInput],
    );

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        onAddGood(event);
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
