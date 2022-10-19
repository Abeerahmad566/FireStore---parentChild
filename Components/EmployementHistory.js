import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
const EmployementHistory = ({
  employementHistory,
  handleSetEmployementHistory,
  onAddEmployementHistory,
  employementHistoryError,
}) => {
  const handleChangeEmployementHistory = (e, index) => {
    const { name, value } = e.target;
    const list = [...employementHistory];
    list[index][name] = value;
    handleSetEmployementHistory(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...employementHistory];
    list.splice(index, 1);
    handleSetEmployementHistory(list);
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    onAddEmployementHistory();
  };
  return (
    <>
      <label>Enter Employee Employement History</label>
      <div className="wrapper">
        {employementHistory.map((employement, index) => {
          return (
            <div className="inner-wrapper" key={index}>
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
                    placeholder="Enter Job Title"
                    name="jobTitle"
                    value={employementHistory.jobTitle}
                    key={index}
                    onChange={(e) => handleChangeEmployementHistory(e, index)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={12} md={8} sm={9} xs={9}>
                  {' '}
                  <input
                    placeholder="Enter Employement Description "
                    name="description"
                    value={employementHistory.description}
                    key={index}
                    onChange={(e) => handleChangeEmployementHistory(e, index)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={12} md={8} sm={9} xs={9}>
                  {' '}
                  <input
                    placeholder="Enter Company name"
                    name="companyName"
                    value={employementHistory.companyName}
                    key={index}
                    onChange={(e) => handleChangeEmployementHistory(e, index)}
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
                    value={employementHistory.duration}
                    key={index}
                    onChange={(e) => handleChangeEmployementHistory(e, index)}
                  />
                </Col>
              </Row>
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
      {employementHistoryError === true ? (
        <p>Please Enter Employement History</p>
      ) : null}
    </>
  );
};

export default EmployementHistory;
