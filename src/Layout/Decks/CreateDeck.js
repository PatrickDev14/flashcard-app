import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
// import DeckForm

function CreateDeck() {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  async function handleCreation(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  };

  const handleChange = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value })
  };

  return (
  <div>
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item active">
        Create Deck
      </li>
    </ol>
    <form onSubmit={(event) => handleCreation(event)}>
      <h1>Create a Deck</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          id="name"
          name="name"
          className="form-control"          
          onChange={handleChange}
          type="text"
          value={newDeck.name}
          placeholder="deck name"
        />
      </div>
      <div className="form-group">
      <label>Description</label>
        <input
          id="description"
          name="description"
          className="form-control"          
          onChange={handleChange}
          type="text"
          rows="4"
          value={newDeck.description}
          placeholder="brief description of the deck"
        />
      </div>
      <Link to="/">Cancel</Link>
      <button
        className="btn btn-primary mx-auto"
        type="submit"
      >
        Submit
      </button>      
    </form>      
  </div>
  )
}

export default CreateDeck;