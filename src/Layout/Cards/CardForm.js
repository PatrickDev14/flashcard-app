import React from "react";
import { Link } from "react-router-dom";

function CardForm({ submitHandler, card = {}, changeFront, changeBack, deckId }) {

  return (
    <form id="cardForm" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          required
          className="form-control"
          id="front"
          rows="3"
          value={card.front ? card.front : ""}
          onChange={changeFront}
          placeholder="Front side of card"
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          required
          className="form-control"
          id="back"
          rows="3"
          value={card.back ? card.back : ""}
          onChange={changeBack}
          placeholder="Back side of card"
        />
      </div>
      <button
        className="btn btn-primary btn-lg ml-2"
        type="submit"        
      >
        save
      </button>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary btn-lg ml-2">
        done
      </Link>
    </form>
  );
}

export default CardForm;