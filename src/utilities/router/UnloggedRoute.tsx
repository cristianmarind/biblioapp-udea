import React from "react";
import { Redirect, Route } from "react-router-dom";

export default class LoggedRoute extends React.Component<any, any> {
    render() {
      const { component: Component, ...props } = this.props
      
      return (
        <Route 
          {...props} 
          render={props => (
              !localStorage.getItem('isLogged')?
              <Component {...props} /> :
              <Redirect to='/lobby' />
          )} 
        />
      )
    }
  }