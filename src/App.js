import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAutoLogin, signUp } from "./services/AuthService";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";


function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    checkAutoLogin(dispatch, props.history);

    const key = "v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKu";
    const secret = "91BEGtP8Iv5UcmGpEljgKTzYCmNwUAvCwMSyFi1H";

    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        key +
        "&client_secret=" +
        secret,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (resp) {
        // Return the response as JSON
        return resp.json();
      })
      .then(function (data) {
        // Log the API data
        console.log("token", data);
      })
      .catch(function (err) {
        // Log any errors
        console.log("something went wrong", err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container px-3 mx-auto">
        <Switch>
          <Route path="/signup" component={signUp} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
