export default async function publishExam(examID:number) {
    const resp = await fetch(`http://localhost:8000/api/classroom/exam/${examID}/publish/`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "published": true
        })
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}