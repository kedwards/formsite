import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Shipping from "./views/Shipping";
import Payment from "./views/Payment";
import PlaceOrder from "./views/PlaceOrder";
import Order from "./views/Order";
import OrderList from "./views/OrderList";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";
import ProductList from "./views/ProductList";
import ProductEdit from "./views/ProductEdit";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  faShoppingCart,
  faStar,
  faStarHalfAlt,
  faUser,
  faTrash,
  faTimes,
  faCheck,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  far,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
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
          <Route path='/order/:id' component={Order} />
          <Route path='/admin/orderlist' component={OrderList} />
          <Route path='/placeorder' component={PlaceOrder} exact />
          <Route path='/shipping' component={Shipping} exact />
          <Route path='/payment' component={Payment} exact />
          <Route path='/profile' component={Profile} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/product/:id' component={Product} />
          <Route path='/admin/productlist' component={ProductList} exact />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductList}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/admin/userlist' component={UserList} exact />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/page/:pageNumber' component={Home} />
          <Route path='/search/:keyword/page/:pageNumber' component={Home} />
          <Route path='/' component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Route>
  </Router>
);

export default App;
