export async function getClassroom(userType: string, uid: string) {
    const resp = await fetch(`http://localhost:8000/api/classroom/${userType}/${uid}/`, {
        credentials: 'include',
    });
    const data = await resp.json();
    return data
}