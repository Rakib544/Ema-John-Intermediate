import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Manage from './Components/Manage/Manage';
import NotFound from './Components/NotFound/NotFound';
import Review from './Components/Review/Review';
import Shop from './Components/Shop/Shop';
import ShowProductDetails from './Components/SHowProductDetails/ShowProductDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/manage">
            <Manage />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <Route path="/product/:key">
            <ShowProductDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;