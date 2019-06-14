import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import ValidationErrors from './ValidationErrors';
import { withAppContext } from './withAppContext';

// Gets the course when rendered, and updates when button is clicked. Redirects to forbidden if user not signed in.
class UpdateCourse extends Component {
  _isMounted = false;
  state = {
    title: null,
    description: null,
    estimatedTime: null,
    materialsNeeded: null,
    name: null,
    errors: null
  };

  componentDidMount() {
    this._isMounted = true;
    this.getCourse();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Checks if the book's user id matches the currently auth'd user. Redirects to forbidden of not.
  getCourse = () => {
    const { id } = this.props.match.params;
    const { _id } = this.props.context.state;
    const { history } = this.props;

    const normalUrl = `http://localhost:5000/api/courses/${id}`;
    const herokuUrl = `https://fs-app-with-react-and-restapi.herokuapp.com/api/courses/${id}`;

    axios
      .get(normalUrl)
      .then(response => {
        if (response.data.user._id === _id) {
          if (this._isMounted) {
            this.setState({
              title: response.data.title,
              description: response.data.description,
              estimatedTime: response.data.estimatedTime,
              materialsNeeded: response.data.materialsNeeded,
              name: `${response.data.user.firstName} ${
                response.data.user.lastName
              }`
            });
          }
        } else {
          history.push('/forbidden');
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          history.push('/error');
        } else {
          history.push('/notfound');
          console.log('Error fetching course', err);
        }
      });
  };

  updateCourse = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { _id, emailAddress, password } = this.props.context.state;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    axios
      .put(
        `http://localhost:5000/api/courses/${id}`,
        {
          user: _id,
          title: title,
          description: description,
          estimatedTime: estimatedTime,
          materialsNeeded: materialsNeeded
        },
        {
          auth: {
            username: emailAddress,
            password: password
          }
        }
      )
      .then(() => {
        this.props.history.push(`/courses/${id}`);
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState({
            errors: err.response.data.message
          });
        } else {
          console.log('Error updating course', err);
        }
      });
  };

  // Updates as user types in inputs.
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  // Shows validation errors if title and description are not entered.
  render() {
    const {
      errors,
      title,
      name,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <hr />
            <div className="bounds course--detail">
              <h1>Update Course</h1>
              <div>
                <ValidationErrors errors={errors} />
                <form onSubmit={this.updateCourse}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input
                          className="input-title course--title--input"
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Course title..."
                          onChange={this.handleChange}
                          value={title || ''}
                        />
                      </div>
                      <p>By {name}</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea
                          id="description"
                          name="description"
                          className=""
                          placeholder="Course description..."
                          onChange={this.handleChange}
                          value={description || ''}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input
                              id="estimatedTime"
                              name="estimatedTime"
                              type="text"
                              className="course--time--input"
                              placeholder="Hours"
                              onChange={this.handleChange}
                              value={estimatedTime || ''}
                            />
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea
                              id="materialsNeeded"
                              name="materialsNeeded"
                              className=""
                              placeholder="List materials..."
                              onChange={this.handleChange}
                              value={materialsNeeded || ''}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">
                      Update Course
                    </button>
                    <NavLink to={'/'} className="button button-secondary">
                      {' '}
                      Cancel
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default withAppContext(UpdateCourse);
