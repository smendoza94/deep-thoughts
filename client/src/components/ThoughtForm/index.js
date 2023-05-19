import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";

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
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add thought to database
      await addThought({
        variables: { thoughtText },
      });
      // clear form values
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  // the addThought() function will run the actual mutation. The error variable will initially
  // be undefined but can change depending on if the mutation failed.
  const [addThought, { error }] = useMutation(ADD_THOUGHT);
  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
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
