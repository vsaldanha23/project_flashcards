import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard(){
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const initialState = {
        front:"",
        back:"",
    };
    const [card, setCard] = useState(initialState);



    useEffect(()=>{
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            }
            catch(error){
                console.error(error);
            }
            return ()=>{abortController.abort();};
        }
        fetchData();

    },[]);

    async function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(deckId,{...card}, abortController.signal);
        history.go(0);
        setCard(initialState);
        return(response);
    }

    async function handleChange({target}){
        setCard(
            {
                ...card,
                [target.name] : target.value
            });
    }

    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">
                    Add Card
                </li>
            </ol>
            <div className="card-name">
                <h2>{deck.name}: Add Card</h2>
            </div>
            <div>
                <CardForm handleSubmit={handleSubmit} handleChange={handleChange} front={card.front} back={card.back} handleDone={()=>handleDone()}/>
            </div>
    
        </div>

    );
}

export default AddCard;