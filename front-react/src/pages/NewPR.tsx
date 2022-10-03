import { useNavigate } from 'react-router-dom';
import useFetch from 'use-http'

import PRForm from '../components/prs/PRForm';
import { SERVER_DOMAIN } from '../lib/api';
import PR from '../models/pr';

const NewPR: React.FC = () => {
    const navigate = useNavigate();
    const { response, loading, post } = useFetch(`${SERVER_DOMAIN}/prs`, {});

    const addPRHandler = async (prData: PR) => {
        await post(prData);
        if (response.ok) {
            navigate(`/prs`)
            navigate(0)
        }
    };

    return <PRForm isLoading={loading} onAddPR={addPRHandler} />;
};

export default NewPR;
