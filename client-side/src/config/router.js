import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import UserComponent from '../components/usercomponent';
import Home from '../screens/Home';
import Login from '../screens/login';
import Register from '../screens/register';
import PrivateRoute from '../utils/privateRoute';

const Routes = () => {

    return(
        <Router>
            <Switch>
                <PrivateRoute component={Home} path="/"  exact/>
                <Route component={Login} path="/login" exact></Route>
                <Route component={Register} path="/register"></Route>
                <PrivateRoute component={UserComponent} to="/users"></PrivateRoute>
            </Switch>
        </Router>
    )
}


export default Routes;