import React from 'react';
import { NavLink } from 'react-router-dom';
import CourseDetail from './CourseDetail';

const Course = props => {
  return (
    <div className="grid-33">
      <NavLink
        className="course--module course--link"
        component={<CourseDetail id={props.id} />}
        to={`/${props.id}`}
      >
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </NavLink>
    </div>
  );
};

export default Course;
