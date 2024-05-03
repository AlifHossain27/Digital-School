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

export async function updateExam(examID:number, content:string) {
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

export async function publishExam(examID:number) {
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/publish/`, {
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

export async function submitExam(examID:number, content:string) {
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/submission/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "content": content
        })
    });
    return resp
}

export async function getExamSubmissions(examID:number) {
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/submission/`, {
        credentials: 'include'
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function getExamSubmission(examID:number, submissionId:number) {
    const resp = await fetch(`http://localhost:8000/api/exam/${examID}/submission/${submissionId}/`, {
        credentials: 'include'
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}