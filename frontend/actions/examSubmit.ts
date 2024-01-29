export default async function submitExam(examID:number, content:string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/exam/${examID}/submission/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "exam": examID,
            "content": content
        })
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}