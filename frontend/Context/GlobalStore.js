import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  entries: [],
  isFetchingEntries: false,
  isSubmittingEntry: false,
  errors: {
    submit,
    fetchDefinition,
    entryIndex,
  }
};

const GlobalContext = createContext(initialState);

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

function getDefinitionsFromJson(json){
  return json.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
};

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((AppReducer, initialState) => {

    function createEntry(word, userDefinition){
      dispatch({ type: "SUBMITTING_ENTRY" })
      fetch(process.env.DB_URL + "/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ word: 
          {
            word: word,
            dictDefinition: getDictionaryDefinition(word),
            userDefinition: userDefinition
          }
       })
      })
      .then(handleErrors)
      .then(r => r.json())
      .then(json => {
        dispatch({
          type: "SUBMIT_ENTRY_SUCCESS",
          payload: json
        })
      })
    }

    function getDictionaryDefinition(word){
      const endpoint = "entries";
      const languageCode = "en-us";
      const dictionaryUrl = process.env.DICT_APP_URL + endpoint + "/" + languageCode + "/" + word.toLowerCase();
      const headers = {
        app_id: process.env.DICT_APP_ID,
        app_key: process.env.DICT_APP_KEY,
      };
      dispatch({ type: "FETCHING_DEFINITION" })
      fetch(dictionaryUrl, {
        headers
      })
        .then(handleErrors)
        .then(r => r.json())
        .then(json => {
          dispatch({ 
            type: "FETCH_DEFINITION_SUCCESS",
            payload: getDefinitionsFromJson(json)
          })
        })
        .catch(error => {
          dispatch({
            type: "FETCH_DEFINITION_FAILURE",
            payload: error
          })
        })
    }


  })
};

export { GlobalContext, StateProvider };
