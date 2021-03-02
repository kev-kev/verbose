import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import Owlbot from "owlbot-js";

const initialState = {
  entries: [],
  currentWord: null,
  userDefinition: null,
  isFetchingEntries: false,
  isSubmittingEntry: false,
  isFetchingDefinitions: false,
  dictionaryDefinitions: [],
  errors: {
    submit: null,
    fetchDefinitions: null,
    entryIndex: null,
    addWord: null,
  },
};

const GlobalContext = createContext(initialState);

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function getEntries() {
    dispatch({ type: "FETCHING_ENTRIES" });
    fetch(process.env.REACT_APP_DB_URL + "/api/index")
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "FETCH_ENTRIES_SUCCESS",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("uwu something went wrong!");
        dispatch({
          type: "FETCH_ENTRIES_FAILURE",
          payload: error,
        });
      });
  }

  function createEntry(word, newDefinition, dictDefinition) {
    dispatch({ type: "SUBMITTING_ENTRY" });
    // add .json to the end of the url if using realtime db rather than firestore4
    fetch(process.env.REACT_APP_DB_URL + "/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word,
        dictDefinition,
        newDefinition,
      }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "SUBMIT_ENTRY_SUCCESS",
          payload: data,
        });
        dispatch({
          type: "CLEAR_DEFINITIONS",
        });
      })
      .catch((error) => {
        console.log("uwu something went wrong!", error);
        dispatch({
          type: "SUBMIT_ENTRY_FAILURE",
          payload: error,
        });
      });
  }

  function deleteEntry(id) {
    fetch(process.env.REACT_APP_DB_URL + `/api/${id}`, {
      method: "DELETE",
    });
  }

  function getDictionaryDefinitions(word) {
    dispatch({ type: "FETCHING_DEFINITIONS" });
    dispatch({ type: "SET_CURRENT_WORD", payload: word });
    const dictionary = Owlbot(process.env.REACT_APP_OWLBOT_API_KEY);
    dictionary
      .define(word)
      .then((data) => {
        console.log("success");
        dispatch({
          type: "FETCH_DEFINITIONS_SUCCESS",
          payload: data.definitions,
        });
      })
      .catch((error) => {
        console.log("uwu something went wrong!", error);
        dispatch({
          type: "FETCH_DEFINITIONS_FAILURE",
          payload: error,
        });
      });
  }

  function clearCurrentWord() {
    dispatch({
      type: "CLEAR_CURRENT_WORD",
    });
  }

  function addWordFailure(word) {
    dispatch({
      type: "ADD_WORD_FAILURE",
      payload: word,
    });
  }

  function clearErrors() {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        entries: state.entries,
        dictionaryDefinitions: state.dictionaryDefinitions,
        isFetchingEntries: state.isFetchingEntries,
        isSubmittingEntry: state.isSubmittingEntry,
        isFetchingDefinitions: state.isFetchingDefinitions,
        errors: state.errors,
        createEntry,
        clearErrors,
        getDictionaryDefinitions,
        currentWord: state.currentWord,
        clearCurrentWord,
        userDefinition: state.userDefinition,
        getEntries,
        addWordFailure,
        deleteEntry
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
