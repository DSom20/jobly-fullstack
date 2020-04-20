import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Search.css';

function Search({ filter }) {
  const [formData, setFormData] = useState("");


  const handleChange = useCallback((evt) => {
    const value = evt.target.value
    setFormData(value);
  }, [setFormData]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Don't want useEffect's debounce to redundantly call filter, so clear it out
    clearTimeout(timerId.current);
    filter(formData);
  }

  const timerId = useRef(null);
  // Don't want useEffect to run on component mounting, just updating
  const didMount = useRef(false);
  const filterMethod = useRef(filter);
  const handleChangeMethod = useRef(handleChange);
  const initialHandleSubmit = useRef(handleSubmit);
  console.log("Inside search", `didMount: ${didMount.current}`);
  console.log("Inside search", `prevFilter === currentFilter: ${filter === filterMethod.current}`);
  console.log("Inside search", `prevHandleChange === currentHandleChange: ${handleChange === handleChangeMethod.current}`);
  console.log("Inside search", `prevSubmit === currentSubmit: ${handleSubmit === initialHandleSubmit.current}`);
  useEffect(() => {
    if(didMount.current) {
      console.log("inside useEffect", {formData});
      timerId.current = setTimeout(() => filter(formData), 1000)
      // Clean up fx gets run before executing next effect
      return () => clearTimeout(timerId.current);
    } else {
      console.log("Mounted")
      didMount.current = true;
    }
  }, [formData, filter])


  return (
    <form className="Search">
      <div className="Search-container">
        <input 
          onChange={handleChange}
          type="text"
          name="search"
          placeholder="Enter search term..."
          value={formData} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}

export default Search;