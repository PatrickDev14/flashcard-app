import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from '../../utils/api';
import DeckForm from "./DeckForm";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    })();    
    return () => abortController.abort();
  }, [deckId]);

  async function handleDeckEdit(event) {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
  }

  function handleNameChange(event) {
    setDeck({ ...deck, name: event.target.value});
  }

  function handleDescChange(event) {
    setDeck({ ...deck, description: event.target.value});
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
        <li className="breadcrumb-item active">Edit Card</li>
      </ol>
      <h2>Edit Deck</h2>
      <DeckForm
        deck={deck}
        changeName={handleNameChange}
        changeDescription={handleDescChange}
        submitHandler={handleDeckEdit} />
    </div>
  );
}

export default EditDeck;