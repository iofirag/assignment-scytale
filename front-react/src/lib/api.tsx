import PR from "../models/pr";

export const SERVER_DOMAIN = 'http://localhost:3001';

export async function getAllPrs() {
    const response = await fetch(`${SERVER_DOMAIN}/prs`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quotes.');
    }

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
