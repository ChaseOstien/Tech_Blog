const editFormHandler = async (event) => {
    event.preventDefault();
    console.log('updated');
    const title = document.querySelector('input[name="title"]').value.trim();
    const contents = document.querySelector('input[name="contents"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);