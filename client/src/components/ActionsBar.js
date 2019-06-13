import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { AuthConsumer } from './AuthContext';
import { withAppContext } from './withAppContext';

// Only shows the UpdateCourse and DeleteCourse buttons if user isAuth and that user owns the course. Always shows the Return to List button.
class ActionsBar extends Component {
  // Only auth'd users can delete. Redirects to the courses page after deletion.
  deleteCourse = e => {
    e.preventDefault();
    const { emailAddress, password } = this.props.context.state;
    const { id } = this.props.context;
    const { history } = this.props.withRouter;

    // const normalUrl = `http://localhost:5000/api/courses/${this.props.id}`;
    const herokuUrl = `https://fs-app-with-react-and-restapi.herokuapp.com/api/courses/${
      this.props.id
    }`;

    axios
      .delete(
        herokuUrl,
        {
          auth: {
            username: emailAddress,
            password
          }
        },
        {
          user: id
        }
      )
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        if (err.response.status === 500) {
          history.push('/error');
        } else {
          console.log('Error deleting data', err);
        }
      });
  };

  render() {
    const { id } = this.props;

    return (
      <AuthConsumer>
        {({ isAuth, ownsCourse }) => (
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {isAuth && ownsCourse ? (
                  <span>
                    <NavLink to={`${id}/update`} className="button">
                      Update Course
                    </NavLink>
                    <button className="button" onClick={this.deleteCourse}>
                      Delete Course
                    </button>
                  </span>
                ) : null}
                <NavLink className="button button-secondary" to="/">
                  Return to List
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

// React.memo stops component from unnecessarily rerendering.
const ActionsBarMemo = React.memo(ActionsBar);
export default withAppContext(ActionsBarMemo);
