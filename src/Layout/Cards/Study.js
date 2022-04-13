import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import ViewCards from "./ViewCards.js";

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
  
// if (Object.keys(deck).length) {
    //ui for nav, breadcrumb
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
  // } else {
  //   //ui for spinner, status
  //   <div className="spinner-border text-success" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
//   }
}

export default Study;