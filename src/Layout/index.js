import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./HomeScreen/Home";
import CreateDeck from "./Decks/CreateDeck";  
import Deck from "./Decks/Deck";
import Study from "./Cards/Study";
import AddCard from "./Cards/AddCard";  
import EditCard from "./Cards/EditCard";
// import EditDeck from "./Decks/EditDeck";

function Layout() {
  return (
  <div>
    <Header />
    <div className="container">
    {/* TODO: Implement the screen starting here */}
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/decks/new">
        <CreateDeck />
      </Route>
      <Route exact path="/decks/:deckId">
        <Deck />
      </Route >

      <Route path="/decks/:deckId/study">
        <Study />
      </Route>
      {/*<Route path="/decks/:deckId/edit">
        <EditDeck />
      </Route>*/}
      <Route path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>
      <NotFound />
    </Switch>
    </div>
  </div>
  );
}

export default Layout;