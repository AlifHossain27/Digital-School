
export default async function getClassroom(classroomID:string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/teachers/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}