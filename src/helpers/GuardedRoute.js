import React from 'react';
import { useNavigate, Route } from "react-router-dom";
import {useSelector} from 'react-redux'


// const GuardedRoute = ({ component: Component, auth, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         auth === true
//             ? <Component {...props} />
//             : <Navigate to='/login' />
//     )} />
// )

function GuardedRoute({ children, isAuth }) {
    const navigate = useNavigate();
    console.log(isAuth);
    if(isAuth) {
        return children;
    }
    navigate('/');
  }

export default GuardedRoute;