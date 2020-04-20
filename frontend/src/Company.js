import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from "./helpers/JoblyApi";
import JobCard from './JobCard';
import './Company.css';

function Company() {
  const { handle } = useParams();
  const [state, setState] = useState({jobsList: null, company: null});

  useEffect(() => {
    const updateState = async () => {
      const [companyResult, jobsResult] = await Promise.all([
        JoblyApi.getCompany(handle),
        JoblyApi.getJobs({company_handle: handle})
      ]);
      setState({jobsList: jobsResult, company: companyResult});
    }
    updateState();
  }, [handle])

  let companyJSX = <div>Company info loading</div>;
  let jobsJSX = <div>Job list loading</div>;

  if (state.jobsList && state.company) {
    companyJSX = (
      <div className="Company-title">
        <h1>{state.company.name}</h1>
        <p>{state.company.description}</p>
      </div>
    )
    jobsJSX = (
      <div>
        {state.jobsList.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    )
  }

  return (
    <div className="Company">
      {companyJSX}
      {jobsJSX}
    </div>
  )
}

export default Company;