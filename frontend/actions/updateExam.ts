export default async function getExam(examID:number, content:string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/exam/${examID}/`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "content": content
        })
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}