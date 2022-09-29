import { useCallback, useContext, useEffect } from "react";
import PR, { StatusEnum } from "../models/pr"
import { PRContext } from "../store/pr-list-context";
import PRItem from "./PRItem"

import classes from './PRList.module.css'

const PRList: React.FC = () => {
    const prListCtx = useContext(PRContext);

    const fetchPRHandler = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3001/prs');
            const prDocList: PR[] = await res.json();
            prListCtx.initPR(prDocList)
        } catch (error) {
            alert('fetch error!')
        }
    }, [prListCtx])

    useEffect(() => {
        fetchPRHandler()
    }, [])

    return (
        <div className={classes.list}>
            {
                prListCtx.items.map((pr) => (
                    <PRItem
                        key={pr._id}
                        _id={pr._id}
                        createdAt={pr.createdAt}
                        author={pr.author}
                        description={pr.description}
                        status={pr.status as StatusEnum}
                        labels={pr.labels} />
                ))
            }
        </div>
    )
}

export default PRList
