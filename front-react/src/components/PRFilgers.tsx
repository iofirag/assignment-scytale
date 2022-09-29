import { useContext } from 'react';
import { PRContext } from '../store/pr-list-context';
import classes from './PRFilters.module.css';

const PRFilters: React.FC = (props) => {
    const prListCtx = useContext(PRContext);

    return (
        <div>
            <label htmlFor="sort">Sort</label>
            <select name="sort" ref={null}>
                <option value='asc' key='asc'>asc</option>
                <option value='desc' key='desc'>desc</option>
            </select>
        </div>
    )
}

export default PRFilters;