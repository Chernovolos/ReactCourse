import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Form, Card} from 'react-bootstrap';


export default function GoodsListElement(props) {
    const {good, isSelected, onDelete, onToggle, onEdit} = props;

    const [stateElement, setStateElement] = useState({
        isEditMode: false,
        title: '',
        weight: '',
        description: '',
        weightError: '',
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const {title, weight, description} = stateElement;
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        onEdit({...good, title, weight, description});
        onEditCancel();
        setValidated(false);
    };

    const onDeleteId = useCallback(
        () => {
            onDelete(good.id);
        },
        [onDelete, good.id],
    );

    const onToggleGood = () => {
        onToggle(good.id);
    };

    const onEditGood = useCallback(
        () => {
            setStateElement({
                ...stateElement,
                isEditMode: true,
                title: good.title,
                weight: good.weight,
                description: good.description,
            });
        },
        [good, stateElement],
    );

    const onEditCancel = useCallback(
        () => {
            setStateElement({
                ...stateElement,
                isEditMode: false,
            });
        },
        [stateElement],
    );

    const onInputChange = useCallback(
        ({target}) => {
            setStateElement({
                ...stateElement,
                [target.name]: target.value,
            });
        },
        [stateElement],
    );

    const renderCard = () => {
        const {title, weight, description} = good;
        return (
            <Card className={ isSelected? 'border border-primary':'border border-dark'}>
                <Card.Header>
                    <Form.Group controlId='selected'>
                        <Form.Check
                            type='checkbox'
                            name='selected'
                            checked={isSelected}
                            onChange={onToggleGood}
                        />
                    </Form.Group>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Title: {title}</Card.Text>
                    <Card.Text>Weight: {weight}</Card.Text>
                    <Card.Text>Description: {description}</Card.Text>
                    <Button
                        onClick={onDeleteId}
                        size='lg'
                        variant='danger'
                        className='mr-3 text-uppercase'
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={onEditGood}
                        size='lg'
                        variant='primary'
                        className='text-uppercase'
                    >
                        Edit
                    </Button>
                </Card.Body>
            </Card>
        );
    };

    const renderEditCard = function() {
        const {title, weight, description} = stateElement;

        return (
            <Card className='border border-dark'>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group controlId='title'>
                            <Form.Control
                                type='text'
                                name='title'
                                value={title}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                        <Form.Group controlId='weight'>
                            <Form.Control
                                required
                                type='number'
                                name='weight'
                                value={weight}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                        <Form.Group controlId='description'>
                            <Form.Control
                                type='text'
                                name='description'
                                value={description}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                        <Button
                            type='submit'
                            size='lg'
                            className='mr-3 text-uppercase'
                            disabled={!weight.length}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={onEditCancel}
                            size='lg'
                            variant='danger'
                            className='mr-3 text-uppercase'
                        >
                            Cancel
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Col sm={4} className='pb-3'>
            {
                stateElement.isEditMode ?
                    renderEditCard() :
                    renderCard()
            }     </Col>
    );
}


GoodsListElement.defaultProps = {
    good: {},
    isSelected: true,
};

GoodsListElement.propTypes = {
    good: PropTypes.object,
    isSelected: PropTypes.bool,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
};
