import React, { ReactNode, useState } from 'react';
import PR from '../models/pr'

type PRContextObj = {
    items: PR[];
    initPR: (initialPR: PR[]) => void;
    addPR: (pr: PR) => void;
}

export const PRContext = React.createContext<PRContextObj>({
    items: [],
    initPR: (initialPR: PR[]) => {},
    addPR: () => { },
});

const PRContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [prList, setPRList] = useState<PR[]>([]);

    const initPRHandler = (initialPR: PR[]) => {
        const prList: PR[] = initialPR.map((pr) => {
            return {
                ...pr,
                id: pr._id,
            }
        }) as PR[]
        setPRList(prList)
    }

    const addPRHandler = (prDoc: PR) => {
        setPRList((prevPRList) => {
            return prevPRList.concat([prDoc])
        })
    }

    const contextValue: PRContextObj = {
        items: prList,
        initPR: initPRHandler,
        addPR: addPRHandler,
    }

    return (
        <PRContext.Provider value={contextValue}>
            {props.children}
        </PRContext.Provider>
    )
}

export default PRContextProvider;