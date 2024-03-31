export async function getExam(examID:number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function getExams(classroomID:string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/exams/${classroomID}/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export default async function updateExam(examID:number, content:string) {
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/`, {
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