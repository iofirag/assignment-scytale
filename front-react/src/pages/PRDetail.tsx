import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getSinglePR } from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import HighlightedPR from '../components/prs/HighlightedPR';

const PRDetail: React.FC = () => {
    //   const match = useRouteMatch();
    const params = useParams();

    const { prId } = params;

    const { sendRequest, status, data: loadedPR, error } = useHttp(
        getSinglePR,
        true
    );

    useEffect(() => {
        sendRequest(prId);
    }, [sendRequest, prId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered'>{error}</p>;
    }

    if (!loadedPR.text) {
        return <p>No PR found!</p>;
    }

    return (
        <Fragment>
            <HighlightedPR 
            author={loadedPR.author} 
            _id={loadedPR._id} 
            description={loadedPR.description} 
            createdAt={loadedPR.createdAt} 
            status={loadedPR.status} 
            labels={loadedPR.labels} />
        </Fragment>
    );
};

export default PRDetail;
