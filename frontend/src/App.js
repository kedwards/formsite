import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import OrderList from "./views/OrderList";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";
import ProductList from "./views/ProductList";
import ProductEdit from "./views/ProductEdit";
import AttestationForm from "./views/AttestationForm";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faTrash,
  faTimes,
  faCheck,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  far,
  faUser,
  faTrash,
  faTimes,
  faCheck,
  faEdit,
  faPlus
);

const App = () => (
  <Router>
    <Route>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={Login} exact />
          <Route path='/form' component={AttestationForm} exact />
          <Route path='/admin/orderlist' component={OrderList} />
          <Route path='/profile' component={Profile} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/admin/productlist' component={ProductList} exact />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductList}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />
          <Route path='/admin/userlist' component={UserList} exact />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/' component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Route>
  </Router>
);

export default App;
