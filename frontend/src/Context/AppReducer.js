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
    case "FETCH_ENTRIES":
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
    case "FETCHING_DEFINITION":
      return {
        ...state,
        dictionaryDefinition: null,
        isFetchingDefinition: true,
      };
    case "FETCH_DEFINITION_SUCCESS":
      return {
        ...state,
        dictionaryDefinition: action.payload,
        isFetchingDefinition: false,
      };
    case "FETCH_DEFINITION_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchDefinition: action.payload,
        },
        isFetchingDefinition: false,
      };
    case "STATUS_UPDATE_SUCCESS":
      return {
        ...state,
        entries: action.payload,
      };
    case "STATUS_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          entryIndex: action.payload,
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
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {
          fetchDefinition: null,
          submit: null,
          entryIndex: null,
        },
      };
    default:
      return state;
  }
};
