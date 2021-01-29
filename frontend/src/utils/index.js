export const isSafeToWork = (formFields) => {
  return !Object.keys(formFields).filter((field) => formFields[field] === "yes")
    .length;
};

export const localDateTime = (UTCDateTime) =>
  new Date(UTCDateTime).toLocaleString();
