import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import ViewCards from "./ViewCards.js";
import LoadingStatus from "../LoadingStatus.js";

function Study() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
    // use side effect to load a selected deckId and call readDeck from utils
  useEffect(() => {
    (async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
      console.log(error);
      }
    })();
  }, [deckId]);
  
  if (!deck.cards) {
    return (
      <LoadingStatus />
    )
  }

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}> Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <div>
        <h1>{deck.name}: Study</h1>
      </div>
      <ViewCards cards={deck.cards} />   
    </div>
  );
}

export default Study;