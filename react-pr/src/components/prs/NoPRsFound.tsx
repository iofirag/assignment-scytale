import { Link } from 'react-router-dom';

import classes from './NoPRsFound.module.css';

const NoPRsFound: React.FC = () => {
  return (
    <div className={classes.noprs}>
      <p>No prs found!</p>
      <Link className='btn' to='/new-pr'>
        Add a PR
      </Link>
    </div>
  );
};

export default NoPRsFound;
