import {
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL,
  FORM_LIST_MY_REQUEST,
  FORM_LIST_MY_SUCCESS,
  FORM_LIST_MY_FAIL,
  FORM_LIST_MY_RESET,
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
} from "../../constants/form.js";

const formListReducer = (state = { forms: [] }, action) => {
  switch (action.type) {
    case FORM_LIST_REQUEST:
      return { loading: true, forms: [] };
    case FORM_LIST_SUCCESS:
      return {
        loading: false,
        forms: action.payload.forms,
      };
    case FORM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const formListMyReducer = (state = { forms: [] }, action) => {
  switch (action.type) {
    case FORM_LIST_MY_REQUEST:
      return { loading: true };
    case FORM_LIST_MY_SUCCESS:
      return { loading: false, forms: action.payload };
    case FORM_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case FORM_LIST_MY_RESET:
      return { forms: [] };
    default:
      return state;
  }
};

const formSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case FORM_SUBMITTED_REQUEST:
      return { loading: true };
    case FORM_SUBMITTED_SUCCESS:
      return { loading: false, formInfo: action.payload, formSuccess: true };
    case FORM_SUBMITTED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { formListReducer, formListMyReducer, formSubmitReducer };
