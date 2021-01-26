export const isSafeToWork = ({ formFields }) => {
  return Object.keys(formFields).filter((field) => formFields[field] !== "yes")
    .length;
};

export const isFormSubmittedToday = () => {
  // return forms.filter((form) =>
  //   isSameDay(new Date(form.createdAt), new Date())
  // );
};
