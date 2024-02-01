export default async function getExamSubmissions(examID:number) {
    const resp = await fetch(`http://localhost:8000/api/classroom/exam/${examID}/submission/`, {
        credentials: 'include'
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}