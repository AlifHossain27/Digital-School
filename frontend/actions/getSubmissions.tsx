export default async function getAssignment(classworkID: number) {
    const resp = await fetch(`http://localhost:8000/api/assignment/submission/${classworkID}`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}