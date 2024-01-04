import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function EditDeck(){
    const history = useHistory();
    const initialState = {
       id: "",
       name: "",
       description: "",
    };

    const [deck, setDeck] = useState(initialState);
    const {deckId} = useParams();

    useEffect(()=> {
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            }
            catch(error){
                console.error(error);
            }
            return () => abortController.abort();
        }
        fetchData();
    },[]);

    async function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...deck}, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    async function handleCancel(){
        history.push(`/decks/${deckId}`);
    }

    function handleChange({ target }) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
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
                <li className="breadcrumb-item active"> Edit Deck </li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                        <input
                            id="name"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            value={deck.name}
                        />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.description}
                    />
                </div>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Submit
                </button> 
            </form>
        </div>
    );
}

export default EditDeck;