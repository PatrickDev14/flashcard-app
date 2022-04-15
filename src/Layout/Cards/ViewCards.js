import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


function ViewCards({ cards }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  function handleFlip() {
    setFrontSide(!frontSide);
  };

  function handleNextCard() {
    if (cardIndex + 1 === cards.length) {
      window.confirm("Click OK to review this deck, or CANCEL to return to the homepage.")
        ? setCardIndex(0)
        : history.push("/");
    } else {
      setCardIndex(cardIndex + 1);
      setFrontSide(!frontSide);
    }
  };

  if (cards.length > 2) {
    return (
      <div className="row p-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cards.length}
            </h5>

            <p className="card-text">
              {frontSide ? cards[cardIndex].front : cards[cardIndex].back}
            </p>

            <button onClick={handleFlip} className="btn btn-secondary btn-lg mr-3">
              Flip
            </button>

            {frontSide ? null : (
              <button onClick={handleNextCard} className="btn btn-primary btn-lg">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } 
  
    return (
      <div className="row p-3 w-100">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Not enough cards.</h5>
            <p className="card-text">
              You need at least 3 cards to study. There are {cards.length} cards
              in this deck.
            </p>

            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary btn-lg ml-3"
            >
              <i className="fa fa-plus" />{" "}
              Add Cards
            </Link>
          </div>
        </div>
      </div>
    );
}

export default ViewCards;