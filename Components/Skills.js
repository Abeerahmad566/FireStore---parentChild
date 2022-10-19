import { useState, useEffect } from 'react';
const Skills = ({ skills, onAddSkill, onDeleteSkill, skillsError }) => {
  const [handleFieldValue, setHandleFieldValue] = useState('');
  const handleSkills = (e) => {
    if (e.key === 'Enter') {
      onAddSkill(handleFieldValue);
      setHandleFieldValue('');
    }
  };
  const handleDelete = (index) => {
    const list = [...skills];
    list.splice(index, 1);
    onDeleteSkill(list);
  };

  return (
    <>
      <label>Enter Employee Skills</label>
      <div className="skills-wrapper">
        {skills.map((skill, index) => {
          return (
            <div key={index} className="mapped-skills">
              {skill}

              <span className="superscript-tag">
                <span key={index} onClick={() => handleDelete(index)}>
                  x
                </span>
              </span>
            </div>
          );
        })}
        <input
          className="skills-input"
          value={handleFieldValue}
          placeholder="Enter Skills"
          onChange={(e) => setHandleFieldValue(e.target.value)}
          onKeyPress={(e) => handleSkills(e)}
        />
      </div>
      {skillsError === true ? <p>Please Enter Skills</p> : null}
    </>
  );
};

export default Skills;
