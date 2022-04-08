import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { listDecks } from "../../utils/api/index"
import DeckList from './DeckList';


function Home() {
  // declare state for displaying decks
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  // use side effect to load decks and call listDecks from utils
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => abortController.abort();
  }, [])

  return (
    <div>
      <button className='button button-create' type='button' onClick={() => history.push(/decks/new)}>
        + Create a deck
      </button>
      {decks.map((deck) => (
      <DeckList deck={deck} />
      ))}
    </div>
  )
}

export default Home;