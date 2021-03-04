export default (state, action) => {
  switch (action.type) {
    case "SUBMITTING_ENTRY":
      return {
        ...state,
        isSubmittingEntry: true,
      };
    case "SUBMIT_ENTRY_SUCCESS":
      return {
        ...state,
        entries: action.payload,
        isSubmittingEntry: false,
      };
    case "SUBMIT_ENTRY_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          submit: action.payload,
        },
        isSubmittingEntry: false,
      };
    case "FETCHING_ENTRIES":
      return {
        ...state,
        isFetchingEntries: true,
      };
    case "FETCH_ENTRIES_SUCCESS":
      return {
        ...state,
        entries: action.payload,
        isFetchingEntries: false,
      };
    case "FETCH_ENTRIES_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          entryIndex: action.payload,
        },
        isFetchingEntries: false,
      };
    case "SET_CURRENT_WORD":
      return {
        ...state,
        currentWord: action.payload,
      };
    case "FETCHING_DEFINITIONS":
      return {
        ...state,
        dictionaryDefinitions: null,
        isFetchingDefinitions: true,
      };
    case "FETCH_DEFINITIONS_SUCCESS":
      return {
        ...state,
        dictionaryDefinitions: action.payload,
        isFetchingDefinitions: false,
      };
    case "FETCH_DEFINITIONS_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchDefinitions: action.payload,
        },
        isFetchingDefinitions: false,
      };
    case "CLEAR_DEFINITIONS":
      return {
        ...state,
        dictionaryDefinitions: null,
      };
    case "ENTRY_UPDATE_SUCCESS":
      return {
        ...state,
        entries: action.payload,
      };
    case "ENTRY_UPDATE_FAILURE":
    return {
      ...state,
      errors: {
        ...state.errors,
        editWord: action.payload
      },
    };
    case "STARRED_UPDATE_SUCCESS":
      return {
        ...state,
        entries: action.payload,
      };
    case "STARRED_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          entryIndex: action.payload,
        },
      };
    case "DELETE_ENTRY_SUCCESS":
      return {
        ...state,
        entries: action.payload,
      };
    case "DELETE_ENTRY_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          entryIndex: action.payload,
        },
      };
    case "ADD_WORD_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          addWord: `${action.payload} has already been added.`,
        },
      };
    case "CLEAR_CURRENT_WORD":
      return {
        ...state,
        dictionaryDefinitions: [],
        currentWord: null,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {
          fetchDefinitions: null,
          submit: null,
          entryIndex: null,
          editWord: null
        },
      };

    default:
      return state;
  }
};
