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
import Detail from "./pages/order/detail";
import User from "./pages/user";
import BikeMap from "./pages/map";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import Rich from "./pages/rich";
import Perssion from "./pages/permission";
class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <App>
            <Switch>
              <Route path="/login" component={Login} />
              <Route
                path="/common"
                render={() => (
                  <Common>
                    <Route
                      path="/common/order/detail/:orderId"
                      component={Detail}
                    />
                  </Common>
                )}
              />
              <Route
                path="/"
                render={() => (
                  <Admin>
                    <Switch>
                      <Route path="/home" component={Home} />
                      <Route path="/ui/buttons" component={Buttons} />
                      <Route path="/ui/modals" component={Models} />
                      <Route path="/ui/loadings" component={Loadings} />
                      <Route path="/ui/Notification" component={Notification} />
                      <Route path="/ui/Messages" component={Messages} />
                      <Route path="/ui/tabs" component={Tabs} />
                      <Route path="/ui/gallery" component={Gallery} />
                      <Route path="/ui/carousel" component={Carousel} />
                      <Route path="/form/login" component={Login} />
                      <Route path="/form/reg" component={Register} />
                      <Route path="/table/basic" component={BaseTable} />
                      <Route path="/table/high" component={HighTable} />
                      <Route path="/city" component={City} />
                      <Route path="/order" component={Order} />
                      <Route path="/user" component={User} />
                      <Route path="/bikeMap" component={BikeMap} />
                      <Route path="/charts/bar" component={Bar} />
                      <Route path="/charts/pie" component={Pie} />
                      <Route path="/charts/line" component={Line} />
                      <Route path="/rich" component={Rich} />
                      <Route path="/permission" component={Perssion} />
                      <Redirect to="/home" />
                      <Route component={noMatch} />
                    </Switch>
                  </Admin>
                )}
              />
            </Switch>
          </App>
        </HashRouter>
      </div>
    );
  }
}

export default IRouter;
