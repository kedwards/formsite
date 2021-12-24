import _ from "lodash";
import faker from "faker";

const users = [];

const getDetails = () => {
  let titles = null;
  const department = faker.random.arrayElement([
    "Administration",
    "Recovery",
    "Laboratory",
    "Pathology",
    "Logistics",
  ]);

  switch (department) {
    case "Administration":
      titles = ["Executive Assistant", "VP", "CEO"];
      break;
    case "Recovery":
      titles = ["Support", "R&D", "Recoverer"];
      break;
    case "Laboratory":
    case "Processing":
      titles = ["Assistant I", "Assistant II", "Technologist"];
      break;
    case "Logistics":
      titles = ["Representative", "Supervisor", "Auditor"];
      break;
  }

  const title = faker.random.arrayElement(titles);

  return { department, title };
}

const count = 100;

// let i = 0;
// for (; i <= count; i++) {
//   const employeeNumber = faker.datatype.number({ min: 0, max: 9999 });
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   const name = `${firstName} ${lastName}`;
//   const badgeId = faker.datatype.number({ min: 0, max: 999999999999 });
//   const { department, title }  = getDetails();
//   const email = faker.internet.email(
//     firstName,
//     lastName,
//     faker.internet.domainName()
//   );

//   users.push({
//     employeeNumber,
//     name,
//     badgeId,
//     title,
//     department,
//     email,
//   });
// }

users.push(
  {
    employeeNumber: "000000000",
    name: "Adam Min",
    badgeId: "00000000000",
    title: "Administrator",
    department: "Occupational Health and Safety",
    email: "adam.min@formsite.ca",
    isAdmin: true,
  },
  {
    employeeNumber: "000000001",
    name: "Jake Healthman",
    badgeId: "000000000001",
    title: "Occupational Health & Safety",
    department: "Recovery",
    email: "jake.heathman@formsite.ca",
    isOhs: true,
  },
)

export default users;
