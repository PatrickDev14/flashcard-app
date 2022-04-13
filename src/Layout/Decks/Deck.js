import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../../utils/api";
import TrashIcon from "../TrashIcon";

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

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
  }, [deckId])

  async function deleteHandler() {
    if (
      window.confirm(
      `Are you sure you want to delete this deck? \n\nYou will not be able to recover it.`
      )
    ) {
      await deleteDeck(id);
      history.push("/");
    } else {
      history.go(0);
    }
  }

  return (
    <div className="col">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            {name}
          </li>
        </ol>
      </nav>
      <div className="card border-0">
        <div className="card-body">
          <h4 className="row card-title mr-auto">{name}</h4>
          <p className="row card-text mr-auto">{description}</p>
          <div className="row">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary btn-lg">edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-success btn-lg ml-3">study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary btn-lg ml-3">
              <i className="fa fa-plus"/>{" "}
              add cards
            </Link>
            <button
              onClick={deleteHandler}
              name="delete"
              value={id}
              className="btn btn-danger btn-lg ml-auto"
            >
            <TrashIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="row ml-auto">
        <h1>Cards</h1>
      </div>
      {deck.cards && 
      cards.map((card, index) => (
        <div className="row" key={index}>
          <div className="col">
            <div className="card">
              <div className="row card-body">
                <p className="col-6 card-text">{card.front}</p>
                <p className="col-6 card-text">{card.back}</p>
              </div>
              <div className="d-flex justify-content-end p-4">
                <Link 
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-secondary btn-lg mr-3"
                  >
                    edit
                  </Link>
                  <button
                    onClick={async () => {
                      if(
                        window.confirm(
                          "Are you sure you want to delete this card? \n\nYou will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="deleteCard"
                    value="card.id"
                    className="btn btn-danger btn-lg"
                  >
                    <TrashIcon />
                  </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Deck;