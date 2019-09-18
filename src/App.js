import React from "react";
import "react-animated-slider/build/horizontal.css";
import Carousel from "./components/slider";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./assets/styles/App.css";

const App = () => (
  <Provider store={store}>
    <div className="wh100">
      <Carousel />
    </div>
  </Provider>
);

export default App;
