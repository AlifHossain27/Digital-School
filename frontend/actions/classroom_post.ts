export async function getPost(class_id:string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/post/classroom/${class_id}/`, {
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function createPost(class_id: string, post: string, post_type: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/post/create/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "classroom": class_id,
            "post": post,
            "post_type": post_type
        })
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function updatePost(postID: number, class_id: string, post: string, post_type: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/post/${postID}/`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            "classroom": class_id,
            "post": post,
            "post_type": post_type
        })
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}

export async function delPost(postID: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resp = await fetch(`http://localhost:8000/api/post/${postID}/`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!resp.ok) {
        window.location.replace('/classroom');
    }
    const data = await resp.json();
    return data
}