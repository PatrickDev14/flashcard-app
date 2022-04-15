import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from '../../utils/api';
import CardForm from './CardForm';

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { cardId, deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    ( async () => {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        const cardResponse = await readCard(cardId, abortController.signal);
        setCard(cardResponse);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => abortController.abort();
  }, [deckId, cardId]);

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  };

  function changeFront(event) {
    setCard({...card, front: event.target.value});
  };

  function changeBack(event) {
    setCard({...card, back: event.target.value});
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
        <li className="breadcrumb-item active">Edit Card {card.id}</li>
      </ol>
      <h2>Edit Card</h2>
      <CardForm
        submitHandler={handleSubmit}
        card={card}
        changeFront={changeFront}
        changeBack={changeBack}
        deckId={deckId}
        />
    </div>      
  );
}

export default EditCard;