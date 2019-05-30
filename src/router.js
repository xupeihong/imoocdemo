import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Buttons from "./pages/ui/buttons";
import Models from './pages/ui/models';
import noMatch from './pages/nomatch';
class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <App>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={()=>
             <Admin>
                 <Switch>
                 <Route path='/admin/ui/buttons' component={Buttons}></Route>
                 <Route path='/admin/ui/modals' component={Models}></Route>
                 <Route component={noMatch}></Route>
                 </Switch>
             </Admin>
            }/>
            <Route path="/order/detail" component={Login} />
          </App>
        </HashRouter>
      </div>
    );
  }
}

export default IRouter;
