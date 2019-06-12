import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Buttons from "./pages/ui/buttons";
import Models from "./pages/ui/models";
import noMatch from "./pages/nomatch";
import Loadings from "./pages/ui/loadings";
import Notification from "./pages/ui/notification";
import Messages from "./pages/ui/messages";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousel from "./pages/ui/carousel";
import Login from "./pages/form/login";
import Register from "./pages/form/reg";
import Home from "./pages/home";
import BaseTable from "./pages/table/baseTable";
import HighTable from "./pages/table/highTable";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import Detail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <App>
            <Route
              path="/admin"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/admin/ui/buttons" component={Buttons} />
                    <Route path="/admin/ui/modals" component={Models} />
                    <Route path="/admin/ui/loadings" component={Loadings} />
                    <Route
                      path="/admin/ui/Notification"
                      component={Notification}
                    />
                    <Route path="/admin/ui/Messages" component={Messages} />
                    <Route path="/admin/ui/tabs" component={Tabs} />
                    <Route path="/admin/ui/gallery" component={Gallery} />
                    <Route path="/admin/ui/carousel" component={Carousel} />
                    <Route path="/admin/form/login" component={Login} />
                    <Route path="/admin/form/reg" component={Register} />
                    <Route path="/admin/table/basic" component={BaseTable} />
                    <Route path="/admin/table/high" component={HighTable} />
                    <Route path="/admin/city" component={City} />
                    <Route path="/admin/order" component={Order} />
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/bikeMap" component={BikeMap} />
                    <Route path="/admin/charts/bar" component={Bar} />
                    <Route path="/admin/charts/pie" component={Pie} />
                    <Route path="/admin/charts/line" component={Line} />
                    <Redirect to="/home" />
                    <Route component={noMatch} />
                  </Switch>
                </Admin>
              )}
            />
            <Route
              path="/common"
              render={() => 
                <Common>
                  <Route path="/common/order/detail/:orderId" component={Detail} />
                </Common>
              }
            />
          </App>
        </HashRouter>
      </div>
    );
  }
}

export default IRouter;
