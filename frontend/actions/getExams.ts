export default async function getExams(classroomID:string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/exams/${classroomID}/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}