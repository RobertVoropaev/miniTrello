import React, {Component} from 'react';
import '../styles/Card.css'
import {connect} from "react-redux";
import {changeCardListAction} from "../actions/change_cardList";

export class Card extends Component{
    state = {
        isEdited: false,
        card: this.props.card,
    };


    onEdit = () => {
        this.setState({
            isEdited: !this.state.isEdited
        });
    };

    onChange = (event) => {
        const newCard = {title: event.target.value, id: this.state.card.id, listId: this.state.card.listId};
        const pos = this.props.cardList.map((item) => item.id).indexOf(this.state.card.id);
        const newCardList = this.props.cardList.slice(0);
        newCardList[pos] = newCard;
        const newNextId = this.props.nextId;
        this.props.changeCardListComponent({cardList: newCardList, nextId: newNextId});
        this.setState({
            card: newCard
        })
    };

    onRemove = () => {
        const newCardList = this.props.cardList.filter((item) => item.id !== this.state.card.id);
        const newNextId = this.props.nextId ;
        this.props.changeCardListComponent({cardList: newCardList, nextId: newNextId});
    };

    onRight = () => {
        const newListId = (this.state.card.listId === 3) ? 3 : this.state.card.listId + 1;
        const newCard = {title: this.state.card.title, id: this.state.card.id, listId: newListId};
        const pos = this.props.cardList.map((item) => item.id).indexOf(this.state.card.id);
        const newCardList = this.props.cardList.slice(0);
        newCardList[pos] = newCard;
        const newNextId = this.props.nextId;
        this.props.changeCardListComponent({cardList: newCardList, nextId: newNextId});
        this.setState({
            card: newCard
        })
    };

    onLeft = () => {
        const newListId = (this.state.card.listId === 1) ? 1 : this.state.card.listId - 1;
        const newCard = {title: this.state.card.title, id: this.state.card.id, listId: newListId};
        const pos = this.props.cardList.map((item) => item.id).indexOf(this.state.card.id);
        const newCardList = this.props.cardList.slice(0);
        newCardList[pos] = newCard;
        const newNextId = this.props.nextId;
        this.props.changeCardListComponent({cardList: newCardList, nextId: newNextId});
        this.setState({
            card: newCard
        })
    };

    render() {
        let btnLeftStyle = this.state.card.listId === 1 ?
            "btn btn-xs btn-block btn-secondary btnLeftRight" :
            "btn btn-xs btn-block btn-info btnLeftRight";

        let btnRightStyle = this.state.card.listId === 3 ?
            "btn btn-xs btn-block btn-secondary btnLeftRight" :
            "btn btn-xs btn-block btn-info btnLeftRight";

        let body = this.state.isEdited ?
            <form onSubmit={this.onEdit}>
                <textarea value={this.state.card.title} className="form-control" onChange={this.onChange}> </textarea>
                <input type="submit" value="Submit"  className='btn btn-xs btn-block btn-success'/>
            </form> :
            <div>
                <p className='text-justify'> {this.state.card.title} </p>
                <div className="btn-group">
                    <button onClick={this.onLeft} className={btnLeftStyle}> L </button>
                    <button onClick={this.onEdit} className='btn btn-xs btn-block btn-success btn-edit'>Edit</button>
                    <button onClick={this.onRight} className={btnRightStyle}> R </button>
                </div>
            </div>;
        return (
            <div className='card mb-4 shadow-sm '>
                {body}
                <button onClick={this.onRemove} className='btn btn-sm btn-block btn-secondary btn-remove'> X </button>
            </div>
        );
    }
}

export default connect(
    state => ({cardList: state.cardList,
                nextId: state.nextId}),
    dispatch => ({
        changeCardListComponent(cardId){
            dispatch(changeCardListAction(cardId));
        }
    })
)(Card)