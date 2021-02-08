import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { localDateTime, isSafeToWork } from "../utils/index";
import { listAllForms } from "../redux/actions/form";

import { Pie, Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";

const Dashboard = ({ history, match: { params } }) => {
  const dispatch = useDispatch();

  const formList = useSelector((state) => state.formAllList);
  const { forms, loading, error } = formList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [allForms, setAllForms] = useState([]);
  const [safeReports, setSafeReports] = useState([]);
  const [notSafeReports, setNotSafeReports] = useState([]);
  const [safePercent, setSafePercent] = useState("0");
  const [notworkingReports, setNotworkingReports] = useState([]);
  const [notworkingPercent, setNotworkingPercent] = useState("0");
  const [dates, setDates] = useState([]);
  const [safeReportsWeekly, setSafeReportsWeekly] = useState([]);
  const [notsafeReportsWeekly, setNotsafeReportsWeekly] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Submitted");

  const pieOptions = {
    height: "300px",
    legend: {
      display: false,
      position: "right",
      legendCallback: function (chart) {
        return [];
      },
    },
    plugins: {
      labels: {
        render: "value",
        fontSize: 14,
        fontStyle: "bold",
        fontColor: "#000",
        fontFamily: '"Lucida Console", Monaco, monospace',
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  const pieDatasets = () => {
    let dataset = [];
    if (forms) {
      dataset.push(forms.length);
      dataset.push(safeReports.length);
      dataset.push(forms.length - safeReports.length);
      dataset.push(notworkingReports.length);
    }
    return dataset;
  };

  const chartColors = ["#4285F4", "#0F9D58", "#DB4437", "#F4B400"];

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: [
      "Forms Submitted",
      "Safe To Work",
      "Not Safe To Work",
      "Not Working",
    ],
    datasets: [
      {
        data: pieDatasets(),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listAllForms());
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (forms) {
      setAllForms(forms);
      setFilteredForms(forms);
      formFilters();
      barCalculation();
    } else {
    }
  }, [forms]);

  const formFilters = () => {
    const safeForms = forms.filter((form) => form.isSafe === true);
    setSafeReports(safeForms);

    const notSafeForms = forms.filter((form) => form.isSafe === false);
    setNotSafeReports(notSafeForms);

    const safepercent = Math.floor((safeReports.length / forms.length) * 100);
    setSafePercent(safepercent);

    const notworkingForms = forms.filter((form) => form.working === false);
    setNotworkingReports(notworkingForms);

    const notworkingcount = notworkingForms.length;
    const notworkingpercent = Math.floor(
      (notworkingcount / forms.length) * 100
    );
    setNotworkingPercent(notworkingpercent);
  };

  const weeklySafeCheck = (ordered_forms) => {
    for (const [key, value] of Object.entries(ordered_forms)) {
      const isSafeObj = { isSafeList: [], noSafeList: [] };
      value.forEach((form) => {
        if (form.isSafe) {
          isSafeObj["isSafeList"].push(form);
        } else {
          isSafeObj["noSafeList"].push(form);
        }
      });
      ordered_forms[key] = isSafeObj;
    }

    const safeReportsCurrentWeek = Object.keys(ordered_forms).map((key) => {
      return ordered_forms[key].isSafeList
        ? ordered_forms[key].isSafeList.length
        : 0;
    });
    setSafeReportsWeekly(safeReportsCurrentWeek);
    const notsafeReportsCurrentWeek = Object.keys(ordered_forms).map((key) => {
      return ordered_forms[key].noSafeList
        ? ordered_forms[key].noSafeList.length
        : 0;
    });
    setNotsafeReportsWeekly(notsafeReportsCurrentWeek);
  };

  const barCalculation = () => {
    if (forms) {
      function groupBy(key) {
        return function group(forms) {
          return forms.reduce((acc, obj) => {
            const property = localDateTime(obj[key]).split(",")[0];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
          }, {});
        };
      }
      const groupByYear = groupBy("createdAt");
      const ordered_forms = groupByYear(forms);
      const dateArr = Object.keys(ordered_forms);
      const sortedDates = dateArr.sort((a, b) => b - a);
      const sorted = sortedDates.slice(Math.max(sortedDates.length - 7, 0));

      setDates(sortedDates);
      weeklySafeCheck(ordered_forms);
    }
  };

  const marketingOverviewData = {
    labels: dates,
    datasets: [
      {
        label: "SAFE TO WORK",
        data: safeReportsWeekly,
        backgroundColor: "#826af9",
        borderColor: "#826af9",
        borderWidth: 1,
      },
      {
        label: "NOT SAFE TO WORK",
        data: notsafeReportsWeekly,
        backgroundColor: "#f7d2ff",
        borderColor: "#f7d2ff",
        borderWidth: 1,
      },
    ],
  };
  const marketingOverviewOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: "500px",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            max: allForms.length,
            display: true,
            beginAtZero: true,
            fontColor: "#b9b8b8",
            stepSize: Math.ceil(allForms.length / 10),
          },
          gridLines: {
            display: false,
            color: "#dde4eb",
            zeroLineColor: "#dde4eb",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };


  const goBack = () => {
    history.goBack();
  };
  const setActiveFilterElement = (e, selection) => {
    const currentActiveEle = document.getElementsByClassName('active-card-item')[0];
    currentActiveEle.classList.remove('active-card-item');
    const activeEle = document.getElementById(selection);
    activeEle.classList.toggle('active-card-item');
    if(selection==="notWorking") {
      setActiveFilter("Not Working")
      setFilteredForms(notworkingReports);
    } else if(selection === "isSafe") {
      setActiveFilter("Safe To Work")
      setFilteredForms(safeReports);
    } else if(selection === "notSafe") {
      setActiveFilter("Not Safe To Work")
      setFilteredForms(notSafeReports);
    } else {
      setActiveFilter("All Submitted")
      setFilteredForms(allForms);
    }
  }

  return (
    <>
      <Button type="button" className="btn btn-light my-3" onClick={goBack}>
        Go Back
      </Button>
      <h1>Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin-xl-0 grid-margin active-card-item" id="submitted" onClick={(e) => setActiveFilterElement(e, "submitted")}>
                      <div className="d-flex">
                        <div className="wrapper">
                          <h3 className="mb-0 font-weight-semibold">
                            {forms.length}
                          </h3>
                          <h5 className="mb-0 font-weight-medium blue">
                            Forms Submitted
                          </h5>
                          <p className="mb-0 text-muted">100%</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin" id="isSafe" onClick={(e) => setActiveFilterElement(e,'isSafe')}>
                      <div className="d-flex">
                        <div className="wrapper">
                          <h3 className="mb-0 font-weight-semibold">
                            {safeReports.length}
                          </h3>
                          <h5 className="mb-0 font-weight-medium green">
                            Safe to Work
                          </h5>
                          <p className="mb-0 text-muted">{safePercent}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin" id="notSafe" onClick={(e) => setActiveFilterElement(e,'notSafe')}>
                      <div className="d-flex">
                        <div className="wrapper">
                          <h3 className="mb-0 font-weight-semibold">
                            {forms.length - safeReports.length}
                          </h3>
                          <h5 className="mb-0 font-weight-medium red">
                            Not safe to Work
                          </h5>
                          <p className="mb-0 text-muted">
                            {100 - safePercent}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin" id="notWorking" onClick={(e) => setActiveFilterElement(e,'notWorking')}>
                      <div className="d-flex">
                        <div className="wrapper">
                          <h3 className="mb-0 font-weight-semibold">
                            {notworkingReports.length}
                          </h3>
                          <h5 className="mb-0 font-weight-medium yellow">
                            Not Working
                          </h5>
                          <p className="mb-0 text-muted">
                            {notworkingPercent}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-6 grid-margin">
              <div className="card">
                <div className="card-body">
                  <Bar
                    data={marketingOverviewData}
                    options={marketingOverviewOptions}
                    height={200}
                    id="marketingOverviewChart1"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin">
              <div className="card">
                <div className="card-body">
                  <Pie
                    data={data}
                    options={pieOptions}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <h2 className="text-primary">
            Showing {activeFilter} Forms :
          </h2>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>SUBMITTED DATE</th>
                <th>MANAGER</th>
                <th>DEPARTMENT</th>
                <th>SAFE TO WORK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredForms.map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{form.user.name}</td>
                  <td>{localDateTime(form.createdAt)}</td>
                  <td>{form.user.manager ? form.user.manager.name : null}</td>
                  <td>{form.user.department}</td>
                  <td>
                    {form.isSafe ? (
                      <FontAwesomeIcon
                        icon="check"
                        style={{ color: "green" }}
                      />
                    ) : (
                      <FontAwesomeIcon icon="times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/form/${form._id}`}>
                      <Button className="btn-sm" variant="light">
                        {/* Details */}
                        <FontAwesomeIcon icon="eye" />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Dashboard;
