import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";
import AttestationForm from "./views/AttestationForm";
import Form from "./views/Form";
import FormList from "./views/FormList";
import Dashboard from "./views/Dashboard";
import defineAbilitiesFor from "./utils/can";
import "./utils/fontawesome";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const ability = defineAbilitiesFor(userInfo);

  return (
    <Router>
      <Route>
        <Header />
        <main className='px-3'>
          <Container style={{ overflow: "hidden" }}>
            <Route path='/login' component={Login} exact />
            <Route path='/form/:id' component={Form} />
            <Route path='/form' component={AttestationForm} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/admin/userlist' component={UserList} exact />
            <Route path='/admin/formlist' component={FormList} exact />
            <Route
              path='/admin/formlist/:pageNumber'
              component={FormList}
              exact
            />
            <Route
              path='/admin/userlist/:pageNumber'
              component={UserList}
              exact
            />
            {ability.can("read", "Dashboard") ||
              (userInfo && userInfo.isSysAdmin && (
                <Route exact path='/admin/dashboard' component={Dashboard} />
              ))}
            <Route path='/admin/formList/user/:id' component={FormList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/' component={Home} exact />
          </Container>
          <Footer />
        </main>
      </Route>
    </Router>
  );
};

export default App;
