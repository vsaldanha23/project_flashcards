function CardForm({handleSubmit, handleChange, front, back, handleDone }){

return(
    <div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Front</label>
            <textarea 
                id="front" 
                name="front" 
                placeholder="Front side of the card"
                className="form-control"
                onChange={handleChange}
                type="text"
                value={front}
            />
        </div>
        <div>
            <label>Back</label>
            <textarea
                id="back"
                name="back"
                placeholder="Back side of the card"
                className="form-control"
                onChange={handleChange}
                type="text"
                value={back}
            />
        </div>
            <button className="btn btn-secondary mx-1" onClick={handleDone}>Done</button>
            <button className="btn btn-primary mx-1" type="submit">Save</button>               
    </form>
</div>
);

}

export default CardForm;