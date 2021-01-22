import {
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
} from "../../constants/form.js";

const formSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case FORM_SUBMITTED_REQUEST:
      return { loading: true };
    case FORM_SUBMITTED_SUCCESS:
      return { loading: false, details: action.payload };
    case FORM_SUBMITTED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { formSubmitReducer };
