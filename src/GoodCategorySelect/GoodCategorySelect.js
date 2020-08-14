import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

export default function GoodCategorySelect(props) {
    const {goodsCategory, onInputChange} = props;
    return (
        <Form.Control
            as="select"
            id="inlineFormCustomSelectPref"
            custom
        >
            <option value="name">Choose...</option>
            {
                goodsCategory.map(({id, name}) => {
                    return (
                        <option
                            key={id}
                            value={name}
                            onChange={onInputChange}
                        >
                            {name}
                        </option>
                    );
                })
            }
        </Form.Control>
    );
};
GoodCategorySelect.defaultProps = {
    goodsCategory: [],
};

GoodCategorySelect.propTypes = {
    goodsCategory: PropTypes.array,
    onInputChange: PropTypes.func,
};

