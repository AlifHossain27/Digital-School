
export default async function getClassroom() {
    const resp = await fetch('http://localhost:8000/api/classroom/', {
        credentials: 'include',
    });
    const data = await resp.json();
    return data
}