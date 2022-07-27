(function(){

    function historyBack() {
        const btnBack = document.querySelector(".header__link");
        btnBack.addEventListener('click', (e) => {
            history.back();
        })
    }



    async function getPost(id) {
        const response = await fetch(`https://gorest.co.in/public-api/posts/?id=${id}`);
        const data = await response.json();

        return data;
    }

    function displayPost(data) {
        const post = document.querySelector(".post__container");

        const title = document.createElement('h1');
        const desc = document.createElement('p');

        title.classList.add('post__heading');
        desc.classList.add('post__desc');

        title.textContent = data.title;
        desc.textContent = data.body;

        post.append(title, desc);
    }



    async function getComments(id) {
        const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
        const data = await response.json();

        return data;
    }

    function displayCommentsList() {
        const post = document.querySelector(".post__container");

        const comments = document.createElement('div');
        const heading = document.createElement('h2');
        const list = document.createElement('ul');

        comments.classList.add('post__comments');
        heading.classList.add('post__heading_comments');
        list.classList.add('post__list');

        heading.textContent = 'Комментарии:';

        comments.append(heading, list);
        post.append(comments);
    }

    function displayComments(data) {
        for (item of data) {
            const comment = createComment(item);
        }

        const comments = document.querySelectorAll(".post__item");
        return comments;
    }

    function createComment(item) {
        const list = document.querySelector(".post__list");

        const comment = document.createElement('li');
        const name = document.createElement('h3');
        const email = document.createElement('span');
        const body = document.createElement('p');

        comment.classList.add('post__item');
        name.classList.add('post__name');
        email.classList.add('post__email');
        body.classList.add('post__body');

        name.textContent = item.name;
        email.textContent = item.email;
        body.textContent = item.body;

        comment.append(name, email, body);
        list.append(comment);
    }



    async function engine() {
        const urlParams = new URLSearchParams(window.location.search)
        const post = await getPost(urlParams.get('id'));
        const postEl = displayPost(post.data[0]);
        const comments = await getComments(urlParams.get('id'));
        const commentsListEl = displayCommentsList();
        const commentsEl = displayComments(comments.data);

        historyBack();
    }



    document.addEventListener('DOMContentLoaded', () => {
        engine();
    });

})();
