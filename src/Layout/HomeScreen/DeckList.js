import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import TrashIcon from "../TrashIcon.js";

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
    <div>
      <div className="card"> 
        <div className="card-body">
          <div className="row">
            <h3 className="card-title ml-3">{name}</h3>
            <p className="ml-auto mr-2">{cards.length} cards</p>
          </div>
          <div>
            <p className="card-text mb-2">{description}</p>
          </div>
          <div className="row">
            <Link to={`/decks/${id}`} className="btn btn-primary btn-lg ml-3">
              view
            </Link>
            <Link to={`/decks/${id}/study`} className="btn btn-success btn-lg ml-3">
              study
            </Link>
            <button
              className="btn btn-danger btn-lg ml-auto mr-2"
              type="button"
              onClick={deleteHandler}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DeckList;