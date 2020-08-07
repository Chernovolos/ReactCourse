import React, {Component} from 'react';
import './GoodsListElement.css';
import PropTypes from 'prop-types';

export default class GoodsListElement extends Component {
    state = {
        isActive: false,
        isEditMode: false,
        title: '',
        weight: '',
        description: '',
    };

    onDelete = () => {
        this.props.onDelete(this.props.good.id);
        console.log(this.props.good.id);
    };

    onToggle = ({target}) => {
        this.setState({
            isActive: target.checked,
        });
        this.props.onToggle(this.props.good.id);
        console.log(this.props.good.id);
    };

    onEdit = () => {
        this.setState({
            ...this.state,
            isEditMode: true,
            title: this.props.good.title,
            weight: this.props.good.weight,
            description: this.props.good.description,
        });
    };

    onEditSave = (updatedGood) => {
        const {title, weight, description} = this.state;
        this.props.onEdit({...this.props.good, title, weight, description});
        this.onEditCancel();
    };

    onInputChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
        });
    };

    onEditCancel = () => {
        // exit edit mode
        this.setState({...this.state, isEditMode: false});
    };

    renderCard = () => {
        const {title, weight, description} = this.props.good;
        const {isActive} = this.state;
        return (
            <div className={isActive ? 'GoodListElementCard isActive' : 'GoodListElementCard'}>
                <div>
                    <input
                        type="checkbox"
                        name="selected"
                        checked={this.props.isSelected}
                        onChange={this.onToggle}
                        className="GoodListElementCheckbox"
                    />
                    <h3>Title: {title}</h3>
                    <p>Weight: {weight}</p>
                    <p>Description: {description}</p>
                </div>
                <div>
                    <button onClick={this.onDelete} className="button GoodListElementButtonDelete">Delete</button>
                    <button onClick={this.onEdit} className="button GoodListElementButtonEdit">Edit</button>
                </div>
            </div>
        );
    };

    renderEditCard = () => {
        const {title, weight, description} = this.state;
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
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="GoodsListElementWrapper">
                        <input
                            className="GoodsListElementFormInput"
                            type="number"
                            placeholder="Weight"
                            name="weight"
                            value={weight}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="GoodsListElementWrapper">
                        <input
                            className="GoodsListElementFormInput"
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
                <div>
                    <button onClick={this.onEditSave} className="button GoodListElementButtonSaveEdit">Save</button>
                    <button onClick={this.onEditCancel} className="button GoodListElementButtonCancel">Cancel</button>
                </div>
            </div>
        );
    };

    render() {
        const {isEditMode} = this.state;
        return (
            <div className="GoodsListElement">
                {
                    isEditMode ?
                        this.renderEditCard() :
                        this.renderCard()
                }
            </div>
        );
    }
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
