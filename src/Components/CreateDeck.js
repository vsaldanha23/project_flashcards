import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const initialState = {
        name: "",
        description: "",
    };
    const [newDeck, setNewDeck] = useState(initialState);

    function handleChange({target}){
        setNewDeck({
            ...newDeck, 
            [target.name]: target.value
        });
    }

    function handleCancel(){
        history.push("/");
    }

    async function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck({...newDeck}, abortController.signal);
        history.push("/");
        return response;
    }


    return(
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                    Create Deck
                </li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>Create Deck</h1>
                <div className="form-group">
                <label>Name</label>
                <input id="name" name="name" type="text" className="form-control" placeholder="Deck Name" onChange={handleChange} value={newDeck.name}/>
                </div>
                <div className="form-group">
                <label>Description</label>
                <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        placeholder="Brief description of the deck"
                        value={newDeck.description}
                    />
                </div>
                <button className="btn btn-secondary mx-1" onClick={()=>handleCancel()}>Cancel</button>
                <button className="btn btn-primary mx-1"type="submit">Submit</button>
                
            </form>
        </div>
    );



}
export default CreateDeck;