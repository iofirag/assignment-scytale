import classes from './PRItem.module.css';
import PR from '../models/pr';

const PRItem: React.FC<PR> = (props) => {
    return (
        <div className={classes.item}>
            <div><b>id:</b> {props._id}</div>
            <div><b>status:</b> {props.status}</div>
            <div><b>Author:</b> {props.author}</div>
            <div><b>Description:</b> {props.description}</div>
            <div><b>Labels:</b> {props.labels}</div>
            <div><b>Created-At:</b> {props.createdAt}</div>
        </div>
    )
}

export default PRItem;