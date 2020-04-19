import React, { useState, useEffect, useRef } from 'react';
import './Search.css';

function Search({ filter }) {
  const [formData, setFormData] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value
    setFormData(value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    filter(formData);
    //somehow implement clearTimeout when submitted
  }

  const timerId = useRef(null);
  const didMount = useRef(false);
  useEffect(() => {
    if(didMount.current) {
      timerId.current = setTimeout(() => filter(formData), 1000)
      
      return () => clearTimeout(timerId.current);
    }
    didMount.current = true;
  }, [formData])


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