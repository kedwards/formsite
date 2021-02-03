import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { localDateTime, isSafeToWork, localDate} from "../utils/index";
import { listAllForms } from "../redux/actions/form";

import { Pie, Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";

const Dashboard = ({ history, match: { params } }) => {
  const dispatch = useDispatch();

  const formList = useSelector((state) => state.formAllList);
  const { forms, loading, error } = formList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [safeReports, setSafeReports] = useState([]);
  const [safePercent, setSafePercent] = useState("0");
  const [notworkingReports, setNotworkingReports] = useState([]);
  const [notworkingPercent, setNotworkingPercent] = useState("0");
  const [dates, setDates] = useState([]);

  const pieOptions = {
    height: '300px',
    legend: {
      display: false,
      position: "right",
      legendCallback: function (chart) {
        // Return the HTML string here.
        console.log("CHART :", chart);
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
    let dataset = new Array();
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
      calculations();
      barCalculation();
    } else {
    }
  }, [forms]);

  const calculations = () => {
    const result = forms.filter((form) => form.isSafe === true);
    setSafeReports(result);
    const safepercent = Math.floor((safeReports.length / forms.length) * 100);
    setSafePercent(safepercent);
    const notworking = forms.filter((form) => form.working === false);
    setNotworkingReports(notworking);
    const notworkingcount = notworking.length;
    const notworkingpercent = Math.floor(
      (notworkingcount / forms.length) * 100
    );
    setNotworkingPercent(notworkingpercent);
  };

  const barCalculation = () => {
    if (forms) {
      // console.log("Forms : ", forms);
      // const obj = Object.fromEntries(
      //   forms.map(form =>  [ localDateTime(form.createdAt).split("T")[0], {form}  ]
      // ));
      // console.log("OBJ :", obj)
      function groupBy(key) {
        return function group(forms) {
          return forms.reduce((acc, obj) => {
            const property = localDateTime(obj[key]).split(',')[0];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
          }, {});          
        };
      }      
      const groupByYear = groupBy("createdAt");
      const ordered_forms = groupByYear(forms);
      console.log("FORMS ORDERED :", ordered_forms);
      setDates(Object.keys(ordered_forms));
    }
  };





  const marketingOverviewData = {
    labels: dates,
    datasets: [
      {
        label: "OVERDUE",
        data: [145, 238, 148, 293, 242, 235, 256, 334],
        backgroundColor: "#826af9",
        borderColor: "#826af9",
        borderWidth: 0,
      },
      {
        label: "SNOOZED",
        data: [330, 380, 230, 400, 309, 430, 340, 310],
        borderColor: "#9e86ff",
        borderWidth: 0,
      },
      {
        label: "COMPLETED",
        data: [375, 440, 284, 450, 386, 480, 400, 365],
        backgroundColor: "#d0aeff",
        borderColor: "#d0aeff",
        borderWidth: 0,
      },
      {
        label: "PENDING",
        data: [425, 480, 324, 490, 426, 520, 440, 405],
        backgroundColor: "#f7d2ff",
        borderColor: "#f7d2ff",
        borderWidth: 0,
      },
    ],
  };
  const marketingOverviewOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: '500px',
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
            max: 400,
            display: true,
            beginAtZero: true,
            fontColor: "#b9b8b8",
            stepSize: 100,
          },
          gridLines: {
            display: false,
            color: "#dde4eb",
            zeroLineColor: "#dde4eb",
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            fontColor: "#b9b8b8",
            color: "#dde4eb",
            zeroLineColor: "#dde4eb",
          },
          gridLines: {
            display: true,
            color: "#dde4eb",
            zeroLineColor: "#dde4eb",
          },
          barPercentage: 0.2,
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

  let chartInstance = null;
  const goBack = () => {
    history.goBack();
  };

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
                    <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin-xl-0 grid-margin">
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
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
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
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
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
                    <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
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
                    // datasetKeyProvider={this.datasetKeyProvider}
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
                    ref={(input) => {
                      chartInstance = input;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
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
              {forms.map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{form.user.name}</td>
                  <td>{localDateTime(form.createdAt)}</td>
                  <td>{form.user.manager ? form.user.manager.name : null}</td>
                  <td>{form.user.department}</td>
                  <td>
                    {isSafeToWork(form) ? (
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
