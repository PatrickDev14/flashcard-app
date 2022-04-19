import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { listDecks } from "../../utils/api/index"
import DeckList from './DeckList';


function Home() {
  // declare state for displaying decks
  const [decks, setDecks] = useState([]);
  // use side effect to load decks and call listDecks from utils
  useEffect(() => {
    const abortController = new AbortController();
    async function getDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
        } catch (error) {
        console.log(error);
      }
    };
    getDecks();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary btn-lg mb-2">
        <i className="fa fa-plus" />{" "} 
        Create a deck
      </Link>
      {decks.map((deck) => (
        <DeckList
          deck={deck}
          // unique key prop for each deck in the list
          key={deck.id}   
        />
      ))}
    </div>
  )
}

export default Home;