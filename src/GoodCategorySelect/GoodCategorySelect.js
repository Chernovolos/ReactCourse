import React from 'react';
import PropTypes from 'prop-types';

const GoodCategory = (props) => {
    const {goodsCategory, onInputChange} = props;
    return (
        <select>
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

export default GoodCategory;

GoodCategory.propTypes = {
    goodsCategory: PropTypes.array,
    onInputChange: PropTypes.func,
};

