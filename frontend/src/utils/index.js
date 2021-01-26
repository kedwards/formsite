export const isSafeToWork = ({ formFields }) => {
  {
    return Object.keys(formFields).filter(
      (field) => formFields[field] !== "yes"
    ).length;
  }
};
