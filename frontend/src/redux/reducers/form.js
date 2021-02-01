import {
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL,
  FORM_DETAILS_RESET,
  FORM_DETAILS_REQUEST,
  FORM_DETAILS_SUCCESS,
  FORM_DETAILS_FAIL,
  FORM_LIST_MY_REQUEST,
  FORM_LIST_MY_SUCCESS,
  FORM_LIST_MY_FAIL,
  FORM_LIST_MY_RESET,
  FORM_LIST_USER_REQUEST,
  FORM_LIST_USER_SUCCESS,
  FORM_LIST_USER_FAIL,
  FORM_LIST_USER_RESET,
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
  FORM_DELIVER_FAIL,
  FORM_DELIVER_REQUEST,
  FORM_DELIVER_SUCCESS,
  FORM_DELIVER_RESET,
  FORM_DAILY_MY_REQUEST,
  FORM_DAILY_MY_SUCCESS,
  FORM_DAILY_MY_FAIL,
} from "../../constants/form.js";

export const formDetailsReducer = (
  state = { loading: true, formFields: [] },
  action
) => {
  switch (action.type) {
    case FORM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case FORM_DETAILS_SUCCESS:
      return { loading: false, success: true, form: action.payload };
    case FORM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case FORM_DETAILS_RESET:
      return { loading: true, formFields: [] };
    default:
      return state;
  }
};

const formListReducer = (state = { forms: [] }, action) => {
  switch (action.type) {
    case FORM_LIST_REQUEST:
      return { loading: true };
    case FORM_LIST_SUCCESS:
      return {
        loading: false,
        forms: action.payload.forms,
        page: action.payload.page,
        pages: action.payload.pages,
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

const formListUserReducer = (state = { userForms: [] }, action) => {
  switch (action.type) {
    case FORM_LIST_USER_REQUEST:
      return { loading: true };
    case FORM_LIST_USER_SUCCESS:
      return { loading: false, userForms: action.payload };
    case FORM_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    case FORM_LIST_USER_RESET:
      return { userForms: [] };
    default:
      return state;
  }
};

const formMyDailyReducer = (state = { dailyForm: {} }, action) => {
  switch (action.type) {
    case FORM_DAILY_MY_REQUEST:
      return { loading: true };
    case FORM_DAILY_MY_SUCCESS:
      return { loading: false, dailyForm: action.payload };
    case FORM_DAILY_MY_FAIL:
      return { loading: false, error: action.payload };
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

export const formDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case FORM_DELIVER_REQUEST:
      return { loading: true };
    case FORM_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case FORM_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case FORM_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export {
  formListReducer,
  formListMyReducer,
  formListUserReducer,
  formSubmitReducer,
  formMyDailyReducer,
};
