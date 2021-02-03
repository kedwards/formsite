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
  formListUserReducer,
  formListMyReducer,
  formMyDailyReducer,
  formAllListReducer,
} from "../reducers/form";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userFormsList: formListUserReducer,
  formSubmit: formSubmitReducer,
  formDetails: formDetailsReducer,
  formList: formListReducer,
  formAllList: formAllListReducer,
  formDeliver: formDeliverReducer,
  formListMy: formListMyReducer,
  formDailyMy: formMyDailyReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});
