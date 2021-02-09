import React from "react";

const Metric = ({ forms, onclick, id, title, percent, color, active }) => {
  return (
    <div
      className={`col-xl-3 col-lg-6 col-sm-6 grid-margin-xl-0 grid-margin ${active}`}
      id={id}
      onClick={(e) => onclick(e)}
    >
      <div className='d-flex'>
        <div className='wrapper'>
          <h3 className='mb-0 font-weight-semibold'>{forms.length}</h3>
          <h5 className={`mb-0 font-weight-medium ${color}`}>{title}</h5>
          <p className='mb-0 text-muted'>{percent}%</p>
        </div>
      </div>
    </div>
  );
};

export default Metric;
