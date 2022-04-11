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
            <h3 className="card-title ml-3">{name}</h3>
            <p className="ml-auto mr-2">{cards.length} cards</p>
          </div>
          <div>
            <p className="card-text mb-2">{description}</p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary btn-lg"              
              onClick={() => history.push(`/decks/${id}`)}
            >
              view
            </button>
            <button
              className="btn btn-success btn-lg ml-2"
              type="button"
              onClick={() => history.push(`/decks/${id}/study`)}
            >
              study
            </button>
            <button
              className="btn btn-danger btn-lg float-right"
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