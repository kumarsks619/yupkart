import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductsListScreen from './screens/ProductsListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrdersListScreen from './screens/OrdersListScreen'
import PasswordForgotScreen from './screens/PasswordForgotScreen'
import PasswordUpdateScreen from './screens/PasswordUpdateScreen'

const App = () => {
    return (
        <Router>
            {/* The Render Props syntax is used to pass in the history */}
            <Route render={({ history }) => <Header history={history} />} />
            <main className="py-3">
                <Container>
                    <Route exact path="/" component={HomeScreen} />
                    {/* for pagination for homepage products */}
                    <Route exact path="/page/:pageNum" component={HomeScreen} />
                    <Route exact path="/search/:keyword" component={HomeScreen} />
                    {/* for pagination for search result products */}
                    <Route
                        exact
                        path="/search/:keyword/page/:pageNum"
                        component={HomeScreen}
                    />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/register" component={RegisterScreen} />
                    <Route exact path="/profile" component={ProfileScreen} />
                    <Route exact path="/shipping" component={ShippingScreen} />
                    <Route exact path="/payment" component={PaymentScreen} />
                    <Route exact path="/place-order" component={PlaceOrderScreen} />
                    <Route path="/product/:productID" component={ProductScreen} />
                    <Route path="/cart/:productID?" component={CartScreen} />
                    <Route path="/orders/:orderID" component={OrderScreen} />
                    <Route exact path="/admin/users-list" component={UsersListScreen} />
                    <Route path="/admin/users/:userID/edit" component={UserEditScreen} />
                    <Route
                        exact
                        path="/admin/products-list"
                        component={ProductsListScreen}
                    />
                    <Route
                        exact
                        path="/admin/products-list/:pageNum"
                        component={ProductsListScreen}
                    />
                    <Route
                        path="/admin/products/:productID/edit"
                        component={ProductEditScreen}
                    />
                    <Route exact path="/admin/orders-list" component={OrdersListScreen} />

                    <Route
                        exact
                        path="/password-reset/forgot"
                        component={PasswordForgotScreen}
                    />
                    <Route
                        path="/password-reset/:userID/:token"
                        render={(props) => <PasswordUpdateScreen {...props} />}
                    ></Route>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
