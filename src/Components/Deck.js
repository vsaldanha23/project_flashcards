import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Deck(){
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([])
    const {deckId} = useParams();

    useEffect(()=>{
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response);
                setCards(response.cards);
            }
            catch(error){
                console.error(error);
            }
            return (()=>abortController.abort());
        }
        fetchData();
    }, []);

    async function handleEditDeck(){
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy(){
        history.push(`/decks/${deckId}/study`);
    }

    async function handleAddCard(){
        history.push(`/decks/${deckId}/cards/new`);
    }

    async function handleDeleteDeck(deck){
        if(window.confirm(`Delete this card? You will not be able to recover it`))
        {
            const abortController = new AbortController();
            try{
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            }
            catch(error){
                console.error(error);
            }
            return ()=> abortController.abort();
        }
    }

    async function handleEditCard(card){
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function handleDeleteCard(card){
        if(window.confirm(`Delete this card? You will not be able to recover it`)){
            const abortController = new AbortController();
            try{
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
            }
            catch(error){
                console.error(error);
            }
            return ()=> abortController.abort();
        }
    }

    if(cards.length>0){
        return(
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home</Link>
                    </li>
                    <li className="breadcrumb-item active"> {deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-tittle">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button className="btn btn-secondary mx-1" onClick={() => handleEditDeck()}>Edit</button>
                        <button className="btn btn-primary mx-1" onClick={()=>handleStudy()}>Study</button>
                        <button className="btn btn-primary mx-1" onClick={() => handleAddCard()}>Add Cards</button>
                        <button className="btn btn-danger mx-1" onClick={()=>handleDeleteDeck(deck)}>Delete</button>
                    </div>
                </div>
                <h1> Cards </h1>
                {cards.map((card)=>{
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button className="btn btn-secondary mx-1" onClick={() => handleEditCard(card)}>Edit</button>
                                        <button className="btn btn-danger mx-1" onClick={()=>handleDeleteCard(card)}>Delete</button>
                                    </div>

                                </div>
                            </div>

                        </div>

                    );
                })}

            </div>
        );
    }
    else{
        return null;
    }

}

export default Deck;