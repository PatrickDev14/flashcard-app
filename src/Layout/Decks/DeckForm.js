import React from "react";
import { useHistory } from "react-router-dom";

function DeckForm({ deck={}, changeName, changeDescription, submitHandler }) {
  const history = useHistory();

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="deck-name">Name</label>
        <input
          required
          id="name"
          name="name"
          className="form-control"          
          onChange={changeName}
          type="text"
          value={deck.name ? deck.name : ""}
          placeholder="deck name"
        />
      </div>
      <div className="form-group">
      <label htmlFor="deck-description">Description</label>
        <textarea
          required
          id="description"
          name="description"
          className="form-control"
          rows="3"         
          onChange={changeDescription}
          type="text"
          value={deck.description ? deck.description : ""}
          placeholder="brief description of the deck"
        />
      </div>
      {/* For CreateDeck, this cancel button returns to the Home screen.
          For EditDeck, this cancel button returns to the Deck screen. */}
      <button
        className="btn btn-secondary btn-lg"
        type="button"
        onClick={() => history.go(-1)}
      >
        cancel
      </button>
      <button
        className="btn btn-primary btn-lg ml-3"
        type="submit"
      >
        submit
      </button>      
    </form>      
  )
}

export default DeckForm;