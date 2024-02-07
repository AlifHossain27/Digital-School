export async function getClassroom(userType: string, uid: string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/${userType}/${uid}/`, {
        credentials: 'include',
    });
    const data = await resp.json();
    return data
}

export async function getTeachers(classroomID:string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/teachers/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function getStudents(classroomID:string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/students/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}