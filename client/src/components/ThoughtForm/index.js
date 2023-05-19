import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS } from "../../utils/queries";

const ThoughtForm = () => {
  const [thoughtText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const handleChange = (event) => {
    // an't type anything else in the <textarea> element, because the handleChange()
    // function stops updating the value of thoughtText once the character count reaches 280
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  // the addThought() function will run the actual mutation. The error variable will initially
  // be undefined but can change depending on if the mutation failed.
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    // The Apollo Client tracks cached objects by their IDs. In this case, we've added a new
    // thought that should go inside an array of thoughts, but the array itself has no ID to track.
    // useMutation Hook can include an update function that allows us to update the cache of any related queries
    update(cache, { data: { addThought } }) {
      // In the update() function, addThought represents the new thought that was just created.
      // Using the cache object, we can read what's currently saved in the QUERY_THOUGHTS cache and
      // then update it with writeQuery() to include the new thought object...
      // read what's currently in the cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      // prepend the newest thought to the front of the array
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add thought to database
      await addThought({
        variables: { thoughtText },
      });
      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
