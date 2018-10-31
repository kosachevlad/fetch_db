window.addEventListener("DOMContentLoaded", () => {
    const getPosts = () => {
        return fetch(`http://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then(posts => console.log(posts));
    };
    getPosts();

    const post = {
        title: 'All about fetch!',
        body: 'Fetch is cool!',
        userId: 1
    };

    const newPost = post => {
        const options = {
            method: 'PATCH', // PUT, PATCH, DELETE, 
            body: JSON.stringify(post),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        return fetch(`http://jsonplaceholder.typicode.com/posts`, options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.error(`Error: ${error}`));
    };
    newPost(post);
});