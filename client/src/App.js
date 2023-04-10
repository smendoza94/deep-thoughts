import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// A multi-page app makes it easy for users to bookmark specific URLs,
// and use the forward and back buttons in their browser for quicker navigation.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// ApolloProvider is a special type of React component that we'll use to provide data to all
// of the other components. ApolloClient is a constructor function that will help initialize
// the connection to the GraphQL API server. InMemoryCache enables the Apollo Client instance
// to cache API response data so that we can perform requests more efficiently. createHttpLink
// allows us to control how the Apollo Client makes a request. Think of it like middleware for
// the outbound network requests.
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

// establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink().
// URI stands for "Uniform Resource Identifier"
const httpLink = createHttpLink({ uri: "/graphql" });

// ApolloClient() constructor to instantiate the Apollo Client instance and create the connection
// to the API endpoint. We also instantiate a new cache object using new InMemoryCache().
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client
// variable in as the value for the client prop in the provider, everything between the JSX tags
// will eventually have access to the server's API data through the client we set up.
function App() {
  return (
    <ApolloProvider client={client}>
      {/*  We've wrapped the <div className="flex-column"> element in a Router component, which 
      makes all of the child components on the page aware of the client-side routing that can take 
      place now. */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            {/* n the <div className="container"> element, we place a singular Routes component 
            that will hold several Route components that signify this part of the app as the place 
            where content will change according to the URL route. When the route is /, the Home 
            component will render here. When the route is /login, the Login component will render. */}
            <Routes>
              {/* the Router component will always contain within it the Routes component. And the 
              Routes component will contain within it the Route component. */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* The two nested <Route> components for our /profile path will allow us to use optional 
              parameters, so /profile and /profile/myUsername will both render the Profile component. 
              Note the order: we'll check for a /:username parameter first; if none is provided in the 
              URL path, we'll render the <Profile> component without one. Later on, we'll set up 
              /profile to display the logged-in user's information. */}
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
