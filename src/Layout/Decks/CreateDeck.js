import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  async function handleDeckCreation(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  };

  function handleNameChange(event) {
    setNewDeck({ ...newDeck, name: event.target.value })
  };

  function handleDescChange(event) {
    setNewDeck({ ...newDeck, description: event.target.value})
  }

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
    <h2>Create Deck</h2>
    <DeckForm 
      deck={newDeck} 
      changeName={handleNameChange} 
      changeDescription={handleDescChange}
      submitHandler={handleDeckCreation} 
      />
  </div>
  )
}

export default CreateDeck;