import React, {useCallback, useState} from 'react';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import GoodCategorySelect from '../GoodCategorySelect/GoodCategorySelect';

export default function GoodsListForm(props) {
    const {onAdd, goodsCategory} = props;

    const [stateInput, setStateInput] = useState({
        title: '',
        weight: '',
        description: '',
    });

    const onFormSubmit = useCallback(
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

    const onInputChange = ({target}) => {
        setStateInput({
            ...stateInput,
            [target.name]: target.value,
        });
    };

    const {title, weight, description} = stateInput;

    return (
        <div className='GoodsListForm'>
            <form
                onSubmit={onFormSubmit}
            >
                <div className="GoodsListFormWrapper">
                    <div className="GoodsListItem">
                        <input
                            className="GoodsListFormInput"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={onInputChange}
                        />
                        <input
                            className="GoodsListFormInput"
                            type="number"
                            placeholder="Weight"
                            name="weight"
                            value={weight}
                            onChange={onInputChange}
                        />
                        <input
                            className="GoodsListFormInput"
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onInputChange}
                        />
                        <div>
                            <button className="GoodsListFormButton">Add</button>
                        </div>
                    </div>
                    <div className="GoodsListItem">
                        <GoodCategorySelect
                            goodsCategory={goodsCategory}
                            onInputChange={onInputChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

GoodsListForm.defaultProps = {
    title: '',
    weight: '',
    description: '',
    goodsCategory: [],
};

GoodsListForm.propTypes = {
    title: PropTypes.string,
    weight: PropTypes.string,
    description: PropTypes.string,
    goodsCategory: PropTypes.array,
    onAdd: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onInputChange: PropTypes.func,
};
