import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Upload from "./Pages/Restaurant";

function App() {
    return (
        <HashRouter>
            {/* <Header /> */}
            <Switch>
                <Route path="/restaurant" component={Upload} />
                <Route path="/" component={Home} />
            </Switch>
        </HashRouter>
    );
}

export default App;
