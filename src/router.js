import React, { Component } from "react";
import { HashRouter, Route, Switch,Redirect } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Buttons from "./pages/ui/buttons";
import Models from './pages/ui/models';
import noMatch from './pages/nomatch';
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Login from './pages/form/login'
import Register from './pages/form/reg'
import Home from './pages/home'
import BaseTable from './pages/table/baseTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <App>
            
            <Route path="/" render={()=>
             <Admin>
                 <Switch>
                 <Route path="/home" component={Home} />
                 <Route path='/admin/ui/buttons' component={Buttons}></Route>
                 <Route path='/admin/ui/modals' component={Models}></Route>
                 <Route path='/admin/ui/loadings' component={Loadings}></Route>
                 <Route path='/admin/ui/Notification' component={Notification}></Route>
                 <Route path='/admin/ui/Messages' component={Messages}></Route>
                 <Route path='/admin/ui/tabs' component={Tabs}></Route>
                 <Route path='/admin/ui/gallery' component={Gallery}></Route>
                 <Route path='/admin/ui/carousel' component={Carousel}></Route>
                 <Route path='/admin/form/login' component={Login}></Route>
                 <Route path='/admin/form/reg' component={Register}></Route>  
                 <Route path='/admin/table/basic' component={BaseTable}></Route> 
                 <Route path='/admin/table/high' component={HighTable}></Route>  
                 <Route path='/admin/city' component={City}></Route>   
                 <Redirect to="/home" />         
                 <Route component={noMatch}></Route>                 
                 </Switch>
             </Admin>
            }/>
            </App>
        </HashRouter>
      </div>
    );
  }
}

export default IRouter;
