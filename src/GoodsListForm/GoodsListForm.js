import React, {Component} from 'react';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import GoodCategorySelect from '../GoodCategorySelect/GoodCategorySelect';

export default class GoodsListForm extends Component {
    state = {
        title: '',
        weight: '',
        description: '',
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state);
        this.setState({
            title: '',
            weight: '',
            description: '',
        });
    };

    onInputChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
        });
    };

    render() {
        const {title, weight, description} = this.state;
        const {goodsCategory} = this.props;
        return (
            <div className='GoodsListForm'>
                <form
                    onSubmit={this.onFormSubmit}
                >
                    <div className="GoodsListFormWrapper">
                        <div className="GoodsListItem">
                            <input
                                className="GoodsListFormInput"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={this.onInputChange}
                            />
                            <input
                                className="GoodsListFormInput"
                                type="number"
                                placeholder="Weight"
                                name="weight"
                                value={weight}
                                onChange={this.onInputChange}
                            />
                            <input
                                className="GoodsListFormInput"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={this.onInputChange}
                            />
                            <div>
                                <button className="GoodsListFormButton">Add</button>
                            </div>
                        </div>
                        <div className="GoodsListItem">
                            <GoodCategorySelect
                                goodsCategory={goodsCategory}
                                onInputChange={this.onInputChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
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
