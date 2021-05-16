import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {Provider} from 'react-redux';
import store from './redux/store';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

//import Header from "./pages/Header";


import Home from "./pages/Home";
import Footer from './pages/Footer';
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Nav from "./components/Nav";
import SellerProfile from "./pages/SellerProfile";
//import OrderHistory from "./pages/OrderHistory";
//import SellHistory from "./pages/SellHistory";
import CategoryDetail from "./pages/CategoryDetail"
import Cart from "./components/Cart";
import buyerProfile from "./pages/buyerProfile";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

const colors = {
  brand: {
    900: "#043007",
    800: "#005C13",
    700: "#E2E2EB",
    600: "#FFD500",
    500: "#E59800",
  }
}

const theme = extendTheme({ colors });

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
      <Router>
        <div>
        
          <Provider store={store}>
            
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route exact path="/success" component={Success} />
            <Route exact path="/category/:categoryId" component={CategoryDetail} />
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/profile" component={SellerProfile}/>
            {/*
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/products/:id" component={Detail} />
            <Route component={NoMatch} />
            */}
          </Switch>
          <Footer/>
          </Provider>
           

        </div>
      </Router>
      </ChakraProvider>
    </ApolloProvider>

  );
}

export default App;