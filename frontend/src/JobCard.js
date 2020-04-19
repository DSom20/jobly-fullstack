import React, { useState } from 'react';
import JoblyApi from './helpers/JoblyApi';
import './JobCard.css';

function JobCard({ job }) {
  const [jobState, setJobState] = useState(job.state)

  const handleApply = async () => {
      const result = await JoblyApi.applyToJob({id : job.id, state: job.state});
      if (result.message) {
        setJobState(result.message);
      }

  }

  const jobAppState = jobState === "applied" ? "APPLIED" : "APPLY";

  return (
    <div className="JobCard">
      <div className="JobCard-title">{job.title}</div>
      <div className="JobCard-description">
        <div>Salary: ${job.salary.toLocaleString('en-US')}</div>
        <div>Equity: {job.equity}</div>
      </div>
      <div className="JobCard-btn-container">
        <button className={`JobCard-btn ${jobState ? "applied" : "apply"}`}
          onClick={handleApply}>{jobAppState}
        </button>
      </div>
    </div>
  );
}

export default JobCard;