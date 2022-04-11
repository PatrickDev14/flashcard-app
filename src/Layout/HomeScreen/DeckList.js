import React from 'react';
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";

function DeckList({ deck }) {
  const history = useHistory();
  const {id, name, description, cards} = deck;

  async function deleteHandler() {
    if (
      window.confirm(
        `Are you sure you want to delete this deck? \n\nYou will not be able to recover it.`
      )
    ) {
      await deleteDeck(deck.id);
      history.go(0);
    } else {
      history.go(0);
    }
  }

  return (
    <div key={id} >
      <div className="card"> 
        <div className="card-body">
          <div className="row">
            <h2 className="card-title">{name}</h2>
            <p className="ml-auto">{cards.length} cards</p>
          </div>
          <div>
            <p className="card-text">{description}</p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary"              
              onClick={() => history.push(`/decks/${id}`)}
            >
              view
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => history.push(`/decks/${id}/study`)}
            >
              study
            </button>
            <button
              className="btn btn-danger float-right"
              type="button"
              onClick={deleteHandler}
            >
              delete
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DeckList;