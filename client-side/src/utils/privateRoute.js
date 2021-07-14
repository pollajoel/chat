import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('Token') ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login'></Redirect>
        )
      }
    ></Route>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any
}

export default PrivateRoute