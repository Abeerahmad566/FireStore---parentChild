import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
const EmployeeEducation = ({
  education,
  handleSetEducation,
  onAddEducation,
  educationError,
}) => {
  const handleInputChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    handleSetEducation(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...education];
    list.splice(index, 1);
    handleSetEducation(list);
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    onAddEducation();
  };

  return (
    <>
      <label>Enter Employee Education</label>
      <div className="wrapper">
        {education.map((educations, index) => {
          return (
            <div className="map-wrapper" key={index}>
              <div className="inner-wrapper">
                <button
                  type="button"
                  key={index}
                  onClick={() => handleRemoveClick(index)}
                  className="remove-btn"
                >
                  x
                </button>
                <Row>
                  <Col lg={12} md={8} sm={9} xs={9}>
                    {' '}
                    <input
                      placeholder="Enter Institue Name"
                      name="institueName"
                      value={education.instituteName}
                      key={index}
                      onChange={(e) => handleInputChangeEducation(e, index)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={12} md={8} sm={9} xs={9}>
                    {' '}
                    <input
                      placeholder="Enter Degree name"
                      name="degreeName"
                      value={education.degreeName}
                      key={index}
                      onChange={(e) => handleInputChangeEducation(e, index)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={12} md={8} sm={9} xs={9}>
                    {' '}
                    <input
                      placeholder="Enter Duration"
                      name="duration"
                      value={education.duration}
                      key={index}
                      onChange={(e) => handleInputChangeEducation(e, index)}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={(e) => handleAddClick(e)}
          className="add-button"
        >
          +
        </button>
      </div>
      {educationError === true ? <p>Please Enter Employee Education</p> : null}
    </>
  );
};

export default EmployeeEducation;
