import React from 'react';
import PropTypes from 'prop-types';
import './GoodCategorySelect.css';

export default function GoodCategorySelect(props) {
    const {goodsCategory, onInputChange} = props;
    return (
        <select className="GoodCategorySelect">
            <option>Choose a category</option>
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
        </select>
    );
};

GoodCategorySelect.propTypes = {
    goodsCategory: PropTypes.array,
    onInputChange: PropTypes.func,
};

