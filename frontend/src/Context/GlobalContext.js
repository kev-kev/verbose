import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import Owlbot from "owlbot-js";

const initialState = {
  entries: [],
  dictionaryDefinitions: [],
  isFetchingEntries: false,
  isSubmittingEntry: false,
  isFetchingDefinitions: false,
  errors: {
    submit: null,
    fetchDefinitions: null,
    entryIndex: null,
    addWord: null,
    editWord: null,
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

  function createEntry(word, newDefinition, dictDefinition, type) {
    dispatch({ type: "SUBMITTING_ENTRY" });
    // add .json to the end of the url if using realtime db rather than firestore4
    fetch(process.env.REACT_APP_DB_URL + "/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word,
        newDefinition,
        dictDefinition,
        type
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

  function deleteEntry(entry) {
    fetch(process.env.REACT_APP_DB_URL + `/api/${entry.word}`, {
      method: "DELETE",
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "DELETE_ENTRY_SUCCESS",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("uwu something went wrong!", error);
        dispatch({
          type: "DELETE_ENTRY_FAILURE",
          payload: error,
        });
      });
  }

  function editEntry(entry, value) {
    fetch(process.env.REACT_APP_DB_URL + `/api/${entry.word}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: entry.word,
        newDefinition: value,
        dictDefinition: entry.dictDefinition,
        type: entry.type
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "ENTRY_UPDATE_SUCCESS",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ENTRY_UPDATE_FAILURE",
          payload: error,
        });
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
        console.log(data);
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

  function clearDefinitions() {
    dispatch({
      type: "CLEAR_DEFINITIONS",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        entries: state.entries,
        dictionaryDefinitions: state.dictionaryDefinitions,
        createEntry,
        clearErrors,
        getDictionaryDefinitions,
        clearDefinitions,
        getEntries,
        addWordFailure,
        deleteEntry,
        editEntry,
        isFetchingEntries: state.isFetchingEntries,
        isSubmittingEntry: state.isSubmittingEntry,
        isFetchingDefinitions: state.isFetchingDefinitions,
        errors: state.errors,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
