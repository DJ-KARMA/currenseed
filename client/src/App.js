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
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import sellerProfile from "./pages/sellerProfile";
import OrderHistory from "./pages/OrderHistory";
import SellHistory from "./pages/SellHistory";
import CategoryDetail from "./pages/CategoryDetail"
//seed component and pages
import SeedCart from "./components/SeedCart";
import SeedItem from './components/SeedItem';
import SeedSuccess from "./pages/SeedSuccess";
//product component and pages 
import Cart from "./components/Cart";
import CartItem from "./components/CartItem";



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
            <Route exact path="/profile" component={sellerProfile}/>
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/sellHistory" component={SellHistory} />

            
            <Route exact path="/category/:categoryId" component={CategoryDetail} />

            <Route exact path="/SeedCart" component={SeedCart}/>
            <Route exact path="/SeedSuccess" component={SeedSuccess} />
            <Route exact path="/SeedItem" component={SeedItem}/>

            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/CartItem" component={CartItem}/>

            <Route component={NoMatch} />

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