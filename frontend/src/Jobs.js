import React, { useState, useEffect } from 'react';
import JoblyApi from "./helpers/JoblyApi";
import Search from './Search';
import JobCard from './JobCard';
import Pagination from './Pagination';
import './Jobs.css';

const NUM_ITEMS_PER_PAGE = 20;

function Jobs() {
  const [jobsList, setJobsList] = useState(null);
  const [startSliceIndex, setStartSliceIndex] = useState(0);
  
  useEffect(() => {
    let getJobsList = async () => {
      const jobsResult = await JoblyApi.getJobs({});
      setJobsList(jobsResult);
    }
    getJobsList();
  }, []);

  const filterJobs = async (searchTerm) => {
    const jobsResult = await JoblyApi.getJobs({search: searchTerm});
    setJobsList(jobsResult);
    setStartSliceIndex(0);
  };
  
  let jobsOrLoadingMessage = <div>Fetching jobs from database...</div>;
  if (jobsList && jobsList.length === 0) {
    jobsOrLoadingMessage = "No results match those search criteria";
  } else if (jobsList && jobsList.length > 0) {
    const jobsListJSX = jobsList
      .slice(startSliceIndex, startSliceIndex + NUM_ITEMS_PER_PAGE)
      .map(job => <JobCard key={job.id} job={job} />);
    
    jobsOrLoadingMessage = (
      <div>
        {jobsListJSX}
        <Pagination 
          setStartSliceIndex={setStartSliceIndex} 
          currentStartIndex={startSliceIndex} 
          arrayLength={jobsList.length} 
          numItemsPerPage={NUM_ITEMS_PER_PAGE}/>
      </div>
    )
  }

  return (
    <div className="Jobs">
      <h1>Job Board</h1>
      <Search filter={filterJobs} />
      {jobsOrLoadingMessage}
    </div>
  )
}

export default Jobs;