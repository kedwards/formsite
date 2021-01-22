import axios from "axios";
import {
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL,
  FORM_LIST_MY_REQUEST,
  FORM_LIST_MY_SUCCESS,
  FORM_LIST_MY_FAIL,
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
} from "../../constants/form.js";



export const listForms = () => async (
  dispatch
) => {
  try {
    dispatch({
      type: FORM_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/forms");
    dispatch({
      type: FORM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyForms = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/forms/myforms`, config);

    dispatch({
      type: FORM_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FORM_LIST_MY_FAIL,
      payload: message,
    });
  }
};


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

    const { data } = await axios.post("/api/forms", formFields, config);

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
