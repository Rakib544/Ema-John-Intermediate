import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import LogIn from './Components/LogIn/LogIn';
import Manage from './Components/Manage/Manage';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProceedOrder from './Components/ProccedOrder/ProceedOrder';
import Review from './Components/Review/Review';
import Shop from './Components/Shop/Shop';
import ShowProductDetails from './Components/SHowProductDetails/ShowProductDetails';

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
          <PrivateRoute path="/proceed-order">
            <ProceedOrder />
          </PrivateRoute>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/product/:key">
            <ShowProductDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;