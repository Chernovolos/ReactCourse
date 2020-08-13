import React, {useState, useCallback} from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';

export default function GoodsListElement(props) {
    const {good, isSelected, onDelete, onToggle, onEdit} = props;

    const [stateElement, setStateElement] = useState({
        isActive: false,
        isEditMode: false,
        title: '',
        weight: '',
        description: '',
    });

    const onDeleteId = useCallback(
        () => {
            onDelete(good.id);
        },
        [onDelete, good.id],
    );

    const onToggleGood = useCallback(
        ({target}) => {
            setStateElement({
                ...stateElement,
                isActive: target.checked,
            });
            onToggle(good.id);
        },
        [onToggle, good.id, stateElement],
    );

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

    const onEditSaveGood = useCallback(
        (updatedGood) => {
            const {title, weight, description} = stateElement;
            onEdit({...good, title, weight, description});
            onEditCancel();
        },
        [good, stateElement, onEdit, onEditCancel],
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
        const {isActive} = stateElement;
        return (
            <div className={isActive ? 'GoodListElementCard isActive' : 'GoodListElementCard'}>
                <div>
                    <input
                        type="checkbox"
                        name="selected"
                        checked={isSelected}
                        onChange={onToggleGood}
                        className="GoodListElementCheckbox"
                    />
                    <h3>Title: {title}</h3>
                    <p>Weight: {weight}</p>
                    <p>Description: {description}</p>
                </div>
                <div>
                    <button onClick={onDeleteId} className="button GoodListElementButtonDelete">Delete</button>
                    <button onClick={onEditGood} className="button GoodListElementButtonEdit">Edit</button>
                </div>
            </div>
        );
    };

    const renderEditCard = function() {
        const {title, weight, description} = stateElement;
        return (
            <div className="GoodListElementCard">
                <form>
                    <div className="GoodsListElementWrapper">
                        <input
                            className="GoodsListElementFormInput"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="GoodsListElementWrapper">


                        <input
                            className="GoodsListElementFormInput"
                            type="number"
                            placeholder="Weight"
                            name="weight"
                            value={weight}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="GoodsListElementWrapper">
                        <input
                            className="GoodsListElementFormInput"
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onInputChange}
                        />
                    </div>
                </form>
                <div>
                    <button onClick={onEditSaveGood} className="button GoodListElementButtonSaveEdit">Save</button>
                    <button onClick={onEditCancel} className="button GoodListElementButtonCancel">Cancel</button>
                </div>
            </div>
        );
    };

    return (
        <div className="GoodsListElement">
            {
                stateElement.isEditMode ?
                    renderEditCard() :
                    renderCard()
            }     </div>
    );
}


GoodsListElement.defaultProps = {
    good: {},
    isActive: false,
    isEditMode: false,
    isSelected: true,
    title: '',
    weight: '',
    description: '',
};

GoodsListElement.propTypes = {
    good: PropTypes.object,
    isActive: PropTypes.bool,
    isEditMode: PropTypes.bool,
    isSelected: PropTypes.bool,
    title: PropTypes.string,
    weight: PropTypes.string,
    description: PropTypes.string,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
    onEditCancel: PropTypes.func,
    onEditSave: PropTypes.func,
    onDeleteSelected: PropTypes.func,
};
