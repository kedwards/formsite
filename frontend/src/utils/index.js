export const isSafeToWork = (formFields) => {
  return !Object.keys(formFields).filter((field) => formFields[field] === true).length;
};

export const localDateTime = (UTCDateTime) =>
  new Date(UTCDateTime).toLocaleString();


  export const localDate = (UTCDateTime) =>
  new Date(UTCDateTime).toLocaleString()[0];