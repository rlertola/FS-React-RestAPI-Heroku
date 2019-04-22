import React from 'react';
import { AuthConsumer } from './AuthContext';

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthConsumer>
        {state => <Component {...props} context={state} />}
      </AuthConsumer>
    );
  };
}
