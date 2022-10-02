import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import PRForm from '../components/prs/PRForm';
import useHttp from '../hooks/use-http';
import { addPR } from '../lib/api';
import PR from '../models/pr';

const NewPR = () => {
  const { sendRequest, status } = useHttp(addPR);
//   const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
//       history.push('/quotes');
    }
  }, [status]);

  const addPRHandler = (prData: PR) => {
    sendRequest(prData);
  };

  return <PRForm isLoading={status === 'pending'} onAddPR={addPRHandler} />;
};

export default NewPR;
