import { useEffect } from 'react';

import PRList from '../components/prs/PRList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoPRsFound from '../components/prs/NoPRsFound';
import useHttp from '../hooks/use-http';
import { getAllPrs } from '../lib/api';

const AllPRs = () => {
  const { sendRequest, status, data: loadedPRs, error } = useHttp(
    getAllPrs,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!loadedPRs || loadedPRs.length === 0)) {
    return <NoPRsFound />;
  }

  return <PRList list={loadedPRs} />;
};

export default AllPRs;
