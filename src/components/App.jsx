import  React from 'react';
import CardList from './CardList'
import '../styles/App.css'
import {connect} from "react-redux";
import {changeCardListAction} from "../actions/change_cardList";
import Card from "./Card";

export class App extends React.Component {


    render() {
        console.log(this.props);
        let list1 = this.props.cardList.filter(card => card.listId === 1);
        let list2 = this.props.cardList.filter(card => card.listId === 2);
        let list3 = this.props.cardList.filter(card => card.listId === 3);
        return (
            <div className='app'>
                <CardList list={list1} listId={1}/>
                <CardList list={list2} listId={2}/>
                <CardList list={list3} listId={3}/>
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
)(App)