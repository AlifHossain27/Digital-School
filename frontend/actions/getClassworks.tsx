export default async function getAssignments(classroomID:string) {
    const resp = await fetch(`http://localhost:8000/api/assignment/classroom/${classroomID}/`, {
        credentials: 'include',
    });
    const data = await resp.json();
    return data
}