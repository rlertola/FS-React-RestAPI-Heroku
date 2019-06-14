import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Spring } from 'react-spring/renderprops';

import ActionsBar from './ActionsBar';

class CourseDetail extends Component {
  state = {
    course: {},
    id: this.props.match.params.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    name: ''
  };

  componentDidMount() {
    this.getCourse();
  }

  getCourse = () => {
    const { id } = this.state;
    const { history } = this.props;
    const normalUrl = `http://localhost:5000/api/courses/${id}`;
    const herokuUrl = `https://fs-app-with-react-and-restapi.herokuapp.com/api/courses/${id}`;

    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          course: response.data,
          title: response.data.title,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded,
          name: `${response.data.user.firstName} ${response.data.user.lastName}`
        });
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

  render() {
    const {
      id,
      course,
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
            <ActionsBar id={id} course={course} withRouter={this.props} />
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{title}</h3>
                  <p>By {name}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default CourseDetail;
