import React, { useState, useEffect, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import Search from './Search';
import CompanyCard from './CompanyCard';
import JoblyApi from './helpers/JoblyApi';
import Pagination from './Pagination';
import './Companies.css';

const NUM_ITEMS_PER_PAGE = 20;

function Companies() {
  const [companyList, setCompanyList] = useState(null)
  const [startSliceIndex, setStartSliceIndex] = useState(0);

  useEffect(() => {
    let getCompanyList = async () => {
      const companyResult = await JoblyApi.getCompanies({});
      setCompanyList(companyResult);
    }
    getCompanyList();
  }, []);

  const filterCompanies = useCallback(async (searchTerm) => {
    const companyResult = await JoblyApi.getCompanies({search: searchTerm});
    unstable_batchedUpdates(() => {
      setCompanyList(companyResult);
      setStartSliceIndex(0);
    });
  }, [setCompanyList, setStartSliceIndex]);

  let companiesOrLoadingMessage = <div>Fetching companies from database...</div>
  if (companyList && companyList.length === 0) {
    companiesOrLoadingMessage = "No results match those search criteria";
  } else if (companyList && companyList.length > 0) {
    const companyListJSX = companyList
      .slice(startSliceIndex, startSliceIndex + NUM_ITEMS_PER_PAGE)
      .map(comp => <CompanyCard key={comp.handle} company={comp} />);
    
    companiesOrLoadingMessage = (
      <div>
        {companyListJSX}
        <Pagination 
          setStartSliceIndex={setStartSliceIndex} 
          currentStartIndex={startSliceIndex} 
          arrayLength={companyList.length} 
          numItemsPerPage={NUM_ITEMS_PER_PAGE}/>
      </div>
    )
  }

  return (
    <div className="Companies">
      <h1>Company Board</h1>
      <Search filter={filterCompanies}/>
      {companiesOrLoadingMessage}
    </div>
  )
}

export default Companies;