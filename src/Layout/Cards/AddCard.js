import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const initialState = {
    front:"",
    back: "",
    deckId: "",
  };

  const [newCard, setNewCard] = useState({...initialState});
  const [deck, setNewDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {      
      try {
        const response = await readDeck(deckId, abortController.signal);
        setNewDeck(response);
      } catch (error) {
          console.log(error);
      }
    })();
    return () => abortController.abort();
  }, [deckId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setNewCard({ ...newCard, deckId: deckId });
    await createCard(deckId, newCard);
    
    setNewCard(initialState);
  };
  
  function changeFront(event) {
    setNewCard({ ...newCard, front: event.target.value });
  };
    
  function changeBack(event) {
    setNewCard({ ...newCard, back: event.target.value });
  };

  return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
        
          <h2>{deck.name}: Add Card</h2>
          <CardForm
            submitHandler={handleSubmit}
            card={newCard}
            changeFront={changeFront}
            changeBack={changeBack}
            deckId={deckId}
          />
      </div>
  )
}

export default AddCard;