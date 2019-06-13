import React, { Component } from 'react';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops';

import NewCourseButton from './NewCourseButton';
import Course from './Course';

class Courses extends Component {
  state = {
    courses: {}
  };

  componentDidMount() {
    this.getDataOnLoad();
  }

  getDataOnLoad = () => {
    axios
      .get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch(err => {
        console.log('Error fetching courses', err);
      });
  };

  render() {
    const { courses } = this.state;

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <hr />
            <div className="bounds">
              {Object.keys(courses).map(key => {
                return (
                  <Course
                    title={courses[key].title}
                    key={key}
                    index={key}
                    id={courses[key]._id}
                    courseUserId={courses[key].user._id}
                  />
                );
              })}
              <NewCourseButton />
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Courses;
