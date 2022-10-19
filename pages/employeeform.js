import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { storage, db } from '../utils/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';

import Skills from '../Components/Skills';
import Languages from '../Components/Languages';
import EmployeeEducation from '../Components/EmployeeEducation';
import EmployementHistory from '../Components/EmployementHistory';
const EmployeeForm = () => {
  const educationInitialState = {
    instituteName: '',
    degreeName: '',
    duration: '',
  };
  const employementHistoryInitialState = {
    jobTitle: '',
    companyName: '',
    duration: '',
    description: '',
  };
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [imageFile, setImageFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [education, setEducation] = useState([educationInitialState]);
  const [employementHistory, setEmployementHistory] = useState([
    employementHistoryInitialState,
  ]);

  const [employeeNameError, setEmployeeNameError] = useState(false);
  const [employeeAddressError, setEmployeeAddressError] = useState(false);
  const [jobTitleError, setJobTitleError] = useState(false);
  const [jobDescriptionError, setJobDescriptionError] = useState(false);
  const [skillsError, setSkillsError] = useState(false);
  const [languagesError, setLanguagesError] = useState(false);
  const [educationError, setEducationError] = useState(false);
  const [employementHistoryError, setEmployementHistoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const usersCollectionRef = collection(db, 'Employee-Details');
  const onsubmit = async () => {
    if (employeeName === '') {
      setEmployeeNameError(true);
    }
    if (employeeAddress === '') {
      setEmployeeAddressError(true);
    }
    if (jobTitle === '') {
      setJobTitleError(true);
    }
    if (jobDescription === '') {
      setJobDescriptionError(true);
    }
    if (skills.length === 0) {
      setSkillsError(true);
    }
    if (languages.length === 0) {
      setLanguagesError(true);
    }
    if (JSON.stringify(education[0]) == JSON.stringify(educationInitialState)) {
      setEducationError(true);
    }
    if (
      JSON.stringify(employementHistory[0]) ==
      JSON.stringify(employementHistoryInitialState)
    ) {
      setEmployementHistoryError(true);
    }
    if (imageUrl === '') {
      setImageError(true);
    } else {
      await addDoc(usersCollectionRef, {
        description: jobDescription,
        employeeAddress: employeeAddress,
        employeeEducation: education,
        employeeImage: imageUrl,
        employeeLanguages: languages,
        employeeName: employeeName,
        employmentHistory: employementHistory,
        jobTitle: jobTitle,
        skills: skills,
      })
        .then(() => {
          alert('data uploaded');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const ImageUpload = (event) => {
    setImageUploading(true);
    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    uploadBytes(imageRef, imageFile).then((response) => {
      getDownloadURL(response.ref).then((response) => {
        setImageUrl(response);
        setImageUploading(false);
      });
    });
  };

  const onAddSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const onAddLanguages = (language) => {
    setLanguages([...languages, language]);
  };
  const onDeleteSkill = (skill) => {
    setSkills(skill);
  };
  const onDeleteLanguage = (language) => {
    setLanguages(language);
  };
  const handleSetEducation = (education) => {
    setEducation(education);
  };
  const onAddEducation = () => {
    setEducation([
      ...education,
      { instituteName: '', degreeName: '', duration: '' },
    ]);
  };
  const handleSetEmployementHistory = (employementHistory) => {
    setEmployementHistory(employementHistory);
  };
  const onAddEmployementHistory = () => {
    setEmployementHistory([
      ...employementHistory,
      { jobTitle: '', companyName: '', duration: '', description: '' },
    ]);
  };

  return (
    <Container>
      <div className="display-flex">
        <div className="employee-registration-form">
          <form>
            <br />
            <Row className="row">
              <Col lg={9} md={8} sm={9} xs={9}>
                {' '}
                <label>Enter Employee Name</label>
                <input
                  placeholder="Enter Employee Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                {employeeNameError ? <p>Employee Name is required</p> : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                {' '}
                <label>Enter Employee Address</label>
                <input
                  placeholder="Enter Employee Address"
                  value={employeeAddress}
                  onChange={(e) => setEmployeeAddress(e.target.value)}
                />
                {employeeAddressError ? (
                  <p>Employee Address is required</p>
                ) : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                {' '}
                <label>Enter Employee Job Title</label>
                <input
                  placeholder="Enter Employee Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                {jobTitleError ? <p>Job Title is required</p> : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                {' '}
                <label>Enter Employee Job Description</label>
                <input
                  placeholder="Enter Employee Job Description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                {jobDescriptionError ? (
                  <p>Job Description is required</p>
                ) : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                <Skills
                  skills={skills}
                  onAddSkill={onAddSkill}
                  onDeleteSkill={onDeleteSkill}
                  skillsError={skillsError}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                <Languages
                  languages={languages}
                  onAddLanguages={onAddLanguages}
                  onDeleteLanguage={onDeleteLanguage}
                  languagesError={languagesError}
                />
              </Col>
            </Row>
            <br />
            <EmployeeEducation
              education={education}
              handleSetEducation={handleSetEducation}
              onAddEducation={onAddEducation}
              educationError={educationError}
            />
            <EmployementHistory
              employementHistory={employementHistory}
              handleSetEmployementHistory={handleSetEmployementHistory}
              onAddEmployementHistory={onAddEmployementHistory}
              employementHistoryError={employementHistoryError}
            />
            <Row>
              <Col lg={9} md={8} sm={9} xs={9}>
                <input
                  accept="image/*"
                  id="raised-button-file"
                  type="file"
                  onChange={(event) => setImageFile(event.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    component="span"
                    color="primary"
                    onClick={ImageUpload}
                  >
                    Upload Image
                  </Button>
                  {imageUploading && (
                    <span className="image-uploading">
                      Image is Uploading...
                    </span>
                  )}
                </label>
              </Col>
            </Row>
            {imageError ? <p>Please Upload an Image</p> : null}
            <Row>
              <Col>
                {!imageUrl ? (
                  <p>You can not Submit until Image is not upload</p>
                ) : (
                  <Button className="submitBtn" onClick={onsubmit}>
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EmployeeForm;
