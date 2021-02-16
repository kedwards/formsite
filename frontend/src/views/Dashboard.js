import React, { useEffect, useState, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { localDateTime } from "../utils/index";
import { listAllForms } from "../redux/actions/form";
import Metric from "../components/Metric";
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
  const [safeReportsPercent, setSafeReportsPercent] = useState(0);

  const [notSafeReports, setNotSafeReports] = useState([]);
  const [notSafeReportsPercent, setNotSafeReportsPercent] = useState(0);

  const [notWorkingReports, setNotWorkingReports] = useState([]);
  const [notWorkingReportsPercent, setNotWorkingReportsPercent] = useState(0);

  const [dates, setDates] = useState([]);
  const [safeReportsWeekly, setSafeReportsWeekly] = useState([]);
  const [notsafeReportsWeekly, setNotsafeReportsWeekly] = useState([]);

  const [filteredForms, setFilteredForms] = useState([]);
  const [activeFilterText, setActiveFilterText] = useState("All Submitted");
  const [isActive, setIsActive] = useState("submitted");

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
      dataset.push(notWorkingReports.length);
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

  const formFilters = useCallback(
    (FormList) => {
      const safeForms = forms.filter((form) => form.isSafe === true);
      setSafeReports(safeForms);

      const safeFormsPercent = Math.floor(
        (safeForms.length / forms.length) * 100
      );
      setSafeReportsPercent(safeFormsPercent);

      const notSafeForms = forms.filter((form) => form.isSafe !== true);
      setNotSafeReports(notSafeForms);

      const notSafeFormsPercent = Math.floor(
        (notSafeForms.length / forms.length) * 100
      );
      setNotSafeReportsPercent(notSafeFormsPercent);

      const notWorkingForms = forms.filter((form) => form.working === false);
      setNotWorkingReports(notWorkingForms);

      const notWorkingFormsPercent = Math.floor(
        (notWorkingForms.length / forms.length) * 100
      );
      setNotWorkingReportsPercent(notWorkingFormsPercent);
    },
    [forms]
  );

  const weeklySafeCheck = useCallback((ordered_forms) => {
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
  }, []);

  const barCalculation = useCallback(() => {
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

      setDates(sorted);
      weeklySafeCheck(ordered_forms);
    }
  }, [forms, weeklySafeCheck]);

  useEffect(() => {
    if (!userInfo || !userInfo.isOhs || !userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(listAllForms());
    setAllForms(forms);
    setFilteredForms(forms);
    formFilters();
    barCalculation();
  }, [dispatch, history, userInfo]);

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

  const setActiveFilterElement = (e) => {
    const selection = e.currentTarget.id;
    setIsActive(selection);
    switch (selection) {
      case "isSafe":
        setActiveFilterText("Safe To Work");
        setFilteredForms(safeReports);
        return;
      case "notSafe":
        setActiveFilterText("Not Safe To Work");
        setFilteredForms(notSafeReports);
        return;
      case "notWorking":
        setActiveFilterText("Not Working");
        setFilteredForms(notWorkingReports);
        return;
      default:
        setActiveFilterText("All Submitted");
        setFilteredForms(allForms);
        return;
    }
  };

  return (
    <>
      <Button type='button' className='btn btn-light my-3' onClick={goBack}>
        Go Back
      </Button>
      <h1>Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row'>
            <div className='col-md-12 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <div className='row'>
                    <Metric
                      forms={forms}
                      id='submitted'
                      onclick={(e) => setActiveFilterElement(e)}
                      title='Forms Submitted'
                      percent=''
                      color='blue'
                      active={
                        isActive === "submitted" ? "active-card-item" : ""
                      }
                    />
                    <Metric
                      forms={safeReports}
                      id='isSafe'
                      onclick={(e) => setActiveFilterElement(e)}
                      title='Safe to Work'
                      percent={safeReportsPercent}
                      color='green'
                      active={isActive === "isSafe" ? "active-card-item" : ""}
                    />
                    <Metric
                      forms={notSafeReports}
                      id='notSafe'
                      onclick={(e) => setActiveFilterElement(e)}
                      title='Not Safe to Work'
                      percent={notSafeReportsPercent}
                      color='red'
                      active={isActive === "notSafe" ? "active-card-item" : ""}
                    />
                    <Metric
                      forms={notWorkingReports}
                      id='notWorking'
                      onclick={(e) => setActiveFilterElement(e)}
                      title='Not Working'
                      percent={notWorkingReportsPercent}
                      color='yellow'
                      active={
                        isActive === "notWorking" ? "active-card-item" : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-md-6 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <Bar
                    data={marketingOverviewData}
                    options={marketingOverviewOptions}
                    height={200}
                    id='marketingOverviewChart1'
                  />
                </div>
              </div>
            </div>
            <div className='col-md-6 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <Pie data={data} options={pieOptions} height={200} />
                </div>
              </div>
            </div>
          </div>
          <h2 className='text-primary mt-5'>
            Showing {activeFilterText} Forms :
          </h2>
          <Table striped bordered hover responsive className='table-sm'>
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
                        icon='check'
                        style={{ color: "green" }}
                      />
                    ) : (
                      <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/form/${form._id}`}>
                      <Button className='btn-sm' variant='light'>
                        <FontAwesomeIcon icon='eye' />
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
