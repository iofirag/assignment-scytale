import PRList from '../components/prs/PRList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoPRsFound from '../components/prs/NoPRsFound';
import useFetch from 'use-http'
import { SERVER_DOMAIN } from '../lib/api';

const AllPRs = () => {
  const { data = [], loading, error, response } = useFetch(`${SERVER_DOMAIN}/prs`, {suspense: true}, []);

  if (!response && loading) {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (response && !loading && error) {
    return <p className='centered focused'>{'Could not fetch quotes.'}</p>;
  }

  if (response.ok && data.length === 0) {
    return <NoPRsFound />;
  }

  return <PRList list={data} />;
};

export default AllPRs;
