import React from "react";

// import the useQuery Hook from Apollo Client to make requests to the GraphQL server we connected
// to and made available to the application using the <ApolloProvider> component in App.js earlier.
// Import the QUERY_THOUGHTS query to use with the imported Hook functionality, to query [thought] data.
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

import ThoughtList from "../components/ThoughtList";

// check the logged-in status of a user
import Auth from "../utils/auth";

import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename
  // it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // Optional chaining negates the need to check if an object even exists before accessing its
  // properties. No data will exist until the query to the server is finished. So if we type
  // data.thoughts, we'll receive an error saying we can't access the property of data—because
  // it is undefined. If data exists, store it in the thoughts constant we just created.
  // If data is undefined, then save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  // console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        {/* onditionally defining the layout for this <div>. 
        If the user isn't logged in, it'll span the full width of the row. 
        But if you the user is logged in, it'll only span eight columns, 
        leaving space for a four-column <div> on the righthand side. */}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {/* if the user is logged in, display the FriendList component */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
