const apiBase = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`;
// const apiBase = "";

const apiUri = {
  users: `${apiBase}/api/v1/users`,
  listUsers: `${apiBase}/api/v1/users?pageNumber=%s&recordsPerPage=%s`,
  login: `${apiBase}/api/v1/users/login`,
  logout: `${apiBase}/api/v1/users/me/logout`,
  usersId: `${apiBase}/api/v1/users/%s`,
  updateProfile: `${apiBase}/api/v1/users/profile`,
  usersDepartments: `${apiBase}/api/v1/users/departments`,

  forms: `${apiBase}/api/v1/forms`,
  formDetails: `${apiBase}/api/v1/forms/%s`,
  listForms: `${apiBase}/api/v1/forms?pageNumber=%s`,
  listAllForms: `${apiBase}/api/v1/forms/allforms`,
  deliverForm: `${apiBase}/api/v1forms/%s/deliver`,
  listUserForms: `${apiBase}/api/v1/forms/userforms/%s`,
  listMyForms: `${apiBase}/api/v1/forms/myforms`,
  dailyForm: `${apiBase}/api/v1/forms/mydailyforms`,
};

export default apiUri;
