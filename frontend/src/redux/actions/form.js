import axios from "axios";
import {
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL,
  FORM_LIST_MY_REQUEST,
  FORM_LIST_MY_SUCCESS,
  FORM_LIST_MY_FAIL,
  FORM_DETAILS_REQUEST,
  FORM_DETAILS_SUCCESS,
  FORM_DETAILS_FAIL,
  FORM_SUBMITTED_REQUEST,
  FORM_SUBMITTED_SUCCESS,
  FORM_SUBMITTED_FAIL,
  FORM_DELIVER_FAIL,
  FORM_DELIVER_REQUEST,
  FORM_DELIVER_SUCCESS,
  FORM_DAILY_MY_REQUEST,
  FORM_DAILY_MY_SUCCESS,
  FORM_DAILY_MY_FAIL,
} from "../../constants/form.js";

export const listForms = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/forms", config);

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

export const deliverForm = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/forms/${form._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: FORM_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FORM_DELIVER_FAIL,
      payload: message,
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
    dispatch(listMyForms());
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

export const getFormDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/forms/${id}`, config);

    dispatch({
      type: FORM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyDailyForm = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORM_DAILY_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/forms/mydailyforms`, config);

    dispatch({
      type: FORM_DAILY_MY_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FORM_DAILY_MY_FAIL,
      payload: message,
    });
  }
};
