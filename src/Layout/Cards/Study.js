import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
//import Cards from "./Cards";

export default function Study() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
      // use side effect to load a selected deckId and call readDeck from utils
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


      
    </div>
  );
 // } else {
      //ui for spinner, status
  //}
}