import React, { useState, useEffect, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
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

  const filterJobs = useCallback(async (searchTerm) => {
    const jobsResult = await JoblyApi.getJobs({search: searchTerm});
    // calling two stateSetters inside async doesn't batch them by default, so
    // technically would render twice. One option is to use ReactDOM's unstable_batchedUpdates(),
    // which is getting called under the hood in useEffects/for syncronous functions, and supposedly
    // will be used by default for async fxs in React v.17. 
    // Another option is to just have single state as an object: {jobsList: ..., startSliceIndex: ...}
    // That latter option is probably better...see Company component
    unstable_batchedUpdates(() => {
      setJobsList(jobsResult);
      setStartSliceIndex(0);
    });
  }, [setJobsList, setStartSliceIndex]);
  
  // default main element when useEffect is first fetching data
  let jobsOrLoadingMessage = <div>Fetching jobs from database...</div>;

  // jobsList is array after API call, but might be empty. and empty array is truthy
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