import { useState } from 'react';
const Languages = ({
  languages,
  onAddLanguages,
  onDeleteLanguage,
  languagesError,
}) => {
  const [handleFieldValue, setHandleFieldValue] = useState('');
  const handleLanguages = (e) => {
    if (e.key === 'Enter') {
      onAddLanguages(handleFieldValue);
      setHandleFieldValue('');
    }
  };
  const handleDelete = (index) => {
    const list = [...languages];
    list.splice(index, 1);
    onDeleteLanguage(list);
  };
  return (
    <>
      <label>Enter Employee Languages</label>
      <div className="skills-wrapper">
        {languages.map((skill, index) => {
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
          placeholder="Enter Languages"
          onChange={(e) => setHandleFieldValue(e.target.value)}
          onKeyPress={(e) => handleLanguages(e)}
        />
      </div>
      {languagesError === true ? <p>Please Enter Languages</p> : null}
    </>
  );
};

export default Languages;
