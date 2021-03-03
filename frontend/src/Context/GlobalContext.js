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
  editModalIsOpen: false,
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

  function getEntriesOffline() {
    dispatch({
      type: "GET_ENTRIES_OFFLINE",
      payload: [
        {
          word: "testword1",
          dictDefinition: "test dictionary definition1",
          newDefinition: "test user definition1",
        },
        {
          word: "testword2",
          dictDefinition: "test dictionary definition2",
          newDefinition: "test user definition2",
        },
        {
          word: "testword3",
          dictDefinition: "test dictionary definition3",
          newDefinition: "test user definition3",
        },
        {
          word: "testword4",
          dictDefinition: "test dictionary definition4",
          newDefinition: "test user definition4",
        },
        {
          word: "testword5",
          dictDefinition: "test dictionary definition5",
          newDefinition: "test user definition5",
        },
        {
          word: "testword6",
          dictDefinition: "test dictionary definition6",
          newDefinition: "test user definition6",
        },
        {
          word: "testword7",
          dictDefinition: "test dictionary definition7",
          newDefinition: "test user definition7",
        },
        {
          word: "testword8",
          dictDefinition: "test dictionary definition8",
          newDefinition: "test user definition8",
        },
        {
          word: "testword9",
          dictDefinition: "test dictionary definition9",
          newDefinition: "test user definition9",
        },
        {
          word: "testword10",
          dictDefinition: "test dictionary definition10",
          newDefinition: "test user definition10",
        },
        {
          word: "testword11",
          dictDefinition: "test dictionary definition11",
          newDefinition: "test user definition11",
        },
        {
          word: "testword12",
          dictDefinition: "test dictionary definition12",
          newDefinition: "test user definition12",
        },
      ],
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

  function deleteEntry(word) {
    fetch(process.env.REACT_APP_DB_URL + `/api/${word}`, {
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

  function setEditModal(bool) {
    dispatch({
      type: "SET_EDIT_MODAL",
      payload: bool,
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
        getEntriesOffline,
        addWordFailure,
        deleteEntry,
        editModalIsOpen: state.editModalIsOpen,
        setEditModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
