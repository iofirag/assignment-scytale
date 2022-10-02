import PR from '../../models/pr';
import classes from './HighlightedPR.module.css';

const HighlightedPR: React.FC<PR> = (props) => {
  return (
    <figure className={classes.pr}>
      <figcaption>{props.author}</figcaption>
      <div>{props._id}</div>
      <div>{props.createdAt}</div>
      <div>{props.description}</div>
      <div>{props.labels}</div>
      <div>{props.status}</div>
    </figure>
  );
};

export default HighlightedPR;
