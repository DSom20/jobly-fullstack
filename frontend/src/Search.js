import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Search.css';

function Search({ filter }) {
  const [formData, setFormData] = useState("");

  // Don't really need useCallback, since not passing down to a child component
  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Don't want useEffect's debounce to redundantly call filter, so clear it out
    clearTimeout(timerId.current);
    filter(formData);
  };

  const timerId = useRef(null);
  // Don't want useEffect to run on component mounting, just updating
  const didMount = useRef(false);
  
  useEffect(() => {
    if(didMount.current) {
      timerId.current = setTimeout(() => filter(formData), 1000)
      // Clean up function gets run before executing next effect
      return () => clearTimeout(timerId.current);
    } else {
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