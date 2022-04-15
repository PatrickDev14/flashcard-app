import React from "react";
import { Link } from "react-router-dom";

function CardForm({ submitHandler, card = {}, changeFront, changeBack, deckId }) {

  return (
    <form id="cardForm">
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          className="form-control"
          id="front"
          rows="3"
          value={card.front ? card.front : ""}
          onChange={changeFront}
          placeholder="Front side of card"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
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
        onClick={submitHandler}
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