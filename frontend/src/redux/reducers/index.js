import { combineReducers } from "redux";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDepartmentsReducer,
} from "./user";

import {
  formSubmitReducer,
  formListReducer,
  // formDeliverReducer,
  formDetailsReducer,
  formListUserReducer,
  formListMyReducer,
  formMyDailyReducer,
  formAllListReducer,
} from "../reducers/form";

const appReducer = combineReducers({
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
  // formDeliver: formDeliverReducer,
  formListMy: formListMyReducer,
  formDailyMy: formMyDailyReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDepartments: userDepartmentsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT_SUCCESS") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
