import React, { Fragment, useRef, useState } from 'react';
import Select from 'react-select'
import { StatusEnum } from '../../models/pr';

import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import classes from './PRForm.module.css';

const statusOptions: { label: string, value: string }[] = [
    { value: StatusEnum.Open, label: StatusEnum.Open },
    { value: StatusEnum.Draft, label: StatusEnum.Draft },
    { value: StatusEnum.Closed, label: StatusEnum.Closed },
];

const PRForm: React.FC<{ isLoading: boolean, onAddPR: Function }> = (props) => {

    const [statusOption, setStatusOption] = useState<any>(null);

    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const authorRef = useRef<HTMLInputElement>(null)
    const labelsRef = useRef<HTMLInputElement>(null)

    function submitFormHandler(event: React.FormEvent) {
        event.preventDefault();

        const description: string = descriptionRef.current?.value as string
        const author: string = authorRef.current?.value as string
        const labels: string[] = [labelsRef.current?.value] as string[]

        props.onAddPR({ status: statusOption.value, description, author, labels });

        setStatusOption(null)
        descriptionRef.current!.value = ''
        authorRef.current!.value = ''
        labelsRef.current!.value = ''
    }
    
    return (
        <Fragment>
            <Card>
                <form
                    className={classes.form}
                    onSubmit={submitFormHandler}
                >
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor="status">Status</label>
                        <Select
                            value={statusOption}
                            options={statusOptions}
                            onChange={setStatusOption}
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" ref={descriptionRef} />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="author">Author</label>
                        <input type='author' ref={authorRef} />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="labels">Labels</label>
                        <input type='labels' ref={labelsRef} />
                    </div>

                    <div className={classes.actions}>
                        <button type="submit" className='btn'>Add PR</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default PRForm;

