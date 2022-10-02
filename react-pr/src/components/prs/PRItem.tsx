import PR from '../../models/pr';

import classes from './PRItem.module.css';

const PRItem: React.FC<PR> = (props: PR) => {
    return (
        <li className={classes.item}>
            <figure>
                <blockquote>
                    <div>{props.status}</div>
                </blockquote>
                <p>{props.createdAt}</p>
                <p>{props.labels}</p>
                <div>{props.description}</div>
                <p>{props._id}</p>
                <figcaption>{props.author}</figcaption>
            </figure>
        </li>
    );
};

export default PRItem;
