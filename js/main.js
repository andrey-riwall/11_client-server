(async function(){

    async function getPosts(page) {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
        const data = await response.json();

        return data;
    }

    function displayPosts(data) {
        for (item of data) {
            const post = createPost(item);
        }

        const posts = document.querySelectorAll(".posts__item");
        return posts;
    }

    function createPost(item) {
        const posts = document.querySelector(".posts__list");

        const post = document.createElement('li');
        const link = document.createElement('a');
        const heading = document.createElement('h2');

        post.classList.add('posts__item');
        link.classList.add('posts__link');
        heading.classList.add('posts__title');

        link.href = `./templates/post.html?id=${item.id}`
        heading.textContent = item.title;

        link.append(heading);
        post.append(link);
        posts.append(post);

        return post;
    }



    function getPagination(pagination) {
        let pages = [];
        for (let i=-1; i<pagination.limit-1; i++) {
            pages.push(pagination.page+i)
        }
        pages = pages.filter(el => el > 0);
        for (let i=0; i<pagination.limit-pages.length; i++) {
            pages.push(pages[pages.length-1]+1)
        }
        pages = pages.filter(el => el <= pagination.pages)

        return pages;
    }

    function displayPagination(pages, thisPage) {
        for (item of pages) {
            const page = createPagination(item);
            if (item === thisPage) {
                page.classList.add('is_active')
            }
        }

        const page = document.querySelectorAll(".header__item");
        return page;
    }

    function createPagination(item) {
        const list = document.querySelector(".header__list");

        const page = document.createElement('li');
        const link = document.createElement('a');
        
        page.classList.add('header__item', 'btn');
        link.classList.add('header__link');

        link.href = `./?page=${item}`
        link.textContent = item;

        page.append(link);
        list.append(page);

        return page;
    }



    async function engine() {
        const urlParams = new URLSearchParams(window.location.search)
        const posts = await getPosts(urlParams.get('page'));
        const postsEl = displayPosts(posts.data)

        const pagination = getPagination(posts.meta.pagination);
        const paginationEl = displayPagination(pagination, posts.meta.pagination.page);
    }

    document.addEventListener('DOMContentLoaded', () => {
        engine();
    });

})();
