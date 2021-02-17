import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const NewWordForm = () => {
  const {
    entries,
    isSubmittingEntry,
    createEntry,
    errors,
    clearErrors,
  } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submitted");
  };

  return (
    <div className="container w-50">
      <form className="row align-items-center" onSubmit={handleSubmit}>
        <label className="sr-only" for="wordInput">
          Enter a Word
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-2 col"
          id="wordInput"
          placeholder="Enter a Word"
        />
        <button type="submit col" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewWordForm;
