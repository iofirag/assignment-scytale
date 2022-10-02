import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PR, { StatusEnum } from '../../models/pr';

import PRItem from './PRItem';
import classes from './PRList.module.css';

const sortPRs = (prs: PR[], isAscending: boolean) => {
  return prs.sort((pr, PRB) => {
    if (isAscending) {
      return pr._id > PRB._id ? 1 : -1;
    } else {
      return pr._id < PRB._id ? 1 : -1;
    }
  });
};

const PRList: React.FC<{list: PR[]}> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending: boolean = queryParams.get('sort') === 'asc';

  const sortedPRs = sortPRs(props.list, isSortingAscending);

  const changeSortingHandler = () => {
    navigate(`${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`)
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedPRs.map((pr) => (
          <PRItem
            key={pr._id}
            _id={pr._id}
            author={pr.author}
            status={StatusEnum[pr.status]}
            labels={pr.labels}
            description={pr.description}
            createdAt={pr.createdAt}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default PRList;
