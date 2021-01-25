import { combineReducers } from "redux";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./user";
import {
  formSubmitReducer,
  formListReducer,
  formDeliverReducer,
  formDetailsReducer,
  formListMyReducer,
} from "../reducers/form";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  formSubmit: formSubmitReducer,
  formDetails: formDetailsReducer,
  formList: formListReducer,
  formDeliver: formDeliverReducer,
  formListMy: formListMyReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});
