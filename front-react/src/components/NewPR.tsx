import { useContext, useRef } from 'react';
import PR, { StatusEnum } from '../models/pr';
import { PRContext } from '../store/pr-list-context';

import classes from './NewPR.module.css';

const NewPR: React.FC = () => {
    const prListCtx = useContext(PRContext);

    const statusRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const authorRef = useRef<HTMLInputElement>(null)
    const labelsRef = useRef<HTMLInputElement>(null)

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        // validation
        const status: StatusEnum = statusRef.current?.value as StatusEnum
        const description: string = descriptionRef.current?.value as string
        const author: string = authorRef.current?.value as string
        const labels: string[] = [labelsRef.current?.value] as string[]

        try {
            const res = await fetch('http://localhost:3001/prs', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({status, description, author, labels})
            });
            const prDoc: PR = await res.json();
            prListCtx.addPR(prDoc);
            // Clean
            statusRef.current!.value = StatusEnum.Open
            descriptionRef.current!.value = ''
            authorRef.current!.value = ''
            labelsRef.current!.value = ''
        } catch(error) {
            alert('save error!')
        }
    }

    const statusOptions: StatusEnum[] = [StatusEnum.Open, StatusEnum.Draft, StatusEnum.Closed];

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="status">Status</label>
            <select name="status" ref={statusRef}>
                {
                    statusOptions.map(status => (
                        <option value={status} key={status}>{status.toString()}</option>
                    ))
                }
            </select>

            <label htmlFor="description">Description</label>
            <textarea name="description" ref={descriptionRef} />

            <label htmlFor="author">Author</label>
            <input type='author' ref={authorRef} />

            <label htmlFor="labels">Labels</label>
            <input type='labels' ref={labelsRef} />

            <input type="submit" value="Submit PR" />
        </form>
    )
}

export default NewPR;