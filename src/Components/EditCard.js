import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard(){
    const history = useHistory();
    const {deckId, cardId} = useParams();
    const initialDeckState = {
        id: "",
        name:"",
        description:""
    };
    const initialCardState = {
        id:"",
        front:"",
        back:"",
        deckId:"",
    };

    const [deck, setDeck] = useState(initialDeckState);
    const [card, setCard]= useState(initialCardState);

    useEffect(()=>{
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
                const cardResponse = await readCard(cardId,abortController.signal);
                setCard(cardResponse);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[]);

    async function handleChange({target}){
        setCard({...card, [target.name]: target.value});
    }
    
    async function handleCancel(){
        history.push(`/decks/${deckId}`)
    }

    async function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({...card}, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;

    }


    return(
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">
                    Edit Card {cardId}
                </li>
            </ol>
            <div className="card-name">
                <h2>Edit Card</h2>
            </div>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} front={card.front} back={card.back} handleDone={()=>handleCancel()}/>
        </div>
    );

}

export default EditCard;