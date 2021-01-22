import axios from "axios";
import {
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
} from "../../constants/form.js";

export const submitForm = (formFields) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_SUBMITTED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(formFields);
    const { data } = await axios.post("/api/form", formFields, config);

    dispatch({
      type: FORM_SUBMITTED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORM_SUBMITTED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
