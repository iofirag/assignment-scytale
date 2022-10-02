import PR from "../models/pr";

// const FIREBASE_DOMAIN = 'https://test-react-http-7b253-default-rtdb.europe-west1.firebasedatabase.app';
const SERVER_DOMAIN = 'http://localhost:3001';

export async function getAllPrs() {
    const response = await fetch(`${SERVER_DOMAIN}/prs`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quotes.');
    }

    //   const transformedQuotes = [];

    //   for (const key in data) {
    //     const quoteObj = {
    //       id: key,
    //       ...data[key],
    //     };

    //     transformedQuotes.push(quoteObj);
    //   }

    //   return transformedQuotes;
    return data;
}

export async function addPR(prData: PR) {
    const response = await fetch(`${SERVER_DOMAIN}/prs`, {
        method: 'POST',
        body: JSON.stringify(prData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create quote.');
    }

    return data;
}

export async function getSinglePR(quoteId: string) {
    // const response = await fetch(`${SERVER_DOMAIN}/prs/${quoteId}.json`);
    // const data = await response.json();

    // if (!response.ok) {
    //     throw new Error(data.message || 'Could not fetch quote.');
    // }

    // const loadedQuote = {
    //     id: quoteId,
    //     ...data,
    // };

    // return loadedQuote;
}

// export async function addComment(requestData) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
//     method: 'POST',
//     body: JSON.stringify(requestData.commentData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Could not add comment.');
//   }

//   return { commentId: data.name };
// }

// export async function getAllComments(quoteId) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Could not get comments.');
//   }

//   const transformedComments = [];

//   for (const key in data) {
//     const commentObj = {
//       id: key,
//       ...data[key],
//     };

//     transformedComments.push(commentObj);
//   }

//   return transformedComments;
// }
