export default async function getAssignment(uid: string, classworkID: number) {
    const resp = await fetch(`http://localhost:8000/api/assignment/submission/student/${uid}/${classworkID}`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    console.log(data);
    return data
}