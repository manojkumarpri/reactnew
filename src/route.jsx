import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import Cart from './components/cart';
import Order from './components/order';
import CheckOut from './components/checkout';
import UserDashBoard from './components/userdashboard';
import Signup from './components/signup';
import Login from './components/login';
import Men from './components/men';
import Women  from './components/women';
import Payment from './components/payment';
import Tracking from './components/tracking';
import Invoice from './components/invoice';
import Err from './components/err';
import Err1 from './components/err1';
import Err2 from './components/err2';
import Err3 from './components/err3';
import Qr from './components/qr';


import Hello from './components/hello';
 const Routes =() => (
     <BrowserRouter basename={'/product'}>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/cart' component={Cart}></Route>
            <Route path='/order' component={Order}></Route>
            <Route path='/checkout' component={CheckOut}></Route>
            <Route path='/userdash' component={UserDashBoard}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/men' component={Men}/>
            <Route path='/women' component={Women}/>
            <Route path='/payment' component={Payment}/>
            <Route path='/track' component={Tracking} />
            <Route path='/invoice' component={Invoice} />
            <Route path='/err' component={Err} />
            <Route path='/err1' component={Err1} />
            <Route path='/err2' component={Err2} />
            <Route path='/err3' component={Err3} />
            <Route path='/qr' component={Qr} />
            <Route path='/hello' component={Hello} />


        </Switch>
    </BrowserRouter>
 )

 export default Routes;
