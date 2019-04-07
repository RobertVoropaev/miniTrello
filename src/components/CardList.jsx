import React from 'react';
import Card from './Card';
import '../styles/CardList.css'
import {connect} from "react-redux";
import {changeCardListAction} from "../actions/change_cardList";


export class CardList extends React.Component{
    state = {
        list: this.props.list,
        listId: this.props.listId,
    };

    onClickAdd = () => {
        let result = prompt("Enter title", "New Card");
        const newCard = {
                id: this.props.nextId,
                title: result,
                listId: this.state.listId
        };
        const newCardList = this.props.cardList.concat([newCard]);
        const newNextId = this.props.nextId + 1;
        this.props.changeCardListComponent({cardList: newCardList, nextId: newNextId});
    };

    render() {
        let cardsArr = this.props.list.map(card =>
           <li key={card.id}>
               <Card card={card}/>
           </li>);

        let listName;
        if(this.state.listId === 1){
            listName = "New"
        } else if (this.state.listId === 2){
            listName = "In process"
        } else {
            listName = "Ready"
        }
        return (
            <div className='card-list card mb-4 shadow-sm card-list'>
                <div className='card-header'> <h3>{listName}</h3> </div>
                <div className='card-body'>
                    <ul className="ul-list">
                        {cardsArr}
                    </ul>
                    <button onClick={this.onClickAdd} className='btn btn-lg btn-block btn-primary'> Add Card </button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({cardList: state.cardList,
                nextId: state.nextId}),
    dispatch => ({
        changeCardListComponent(cardList){
            dispatch((changeCardListAction(cardList)))
        }
    })
)(CardList)