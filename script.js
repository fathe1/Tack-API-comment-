fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts =>  posts.forEach((page , index) => {
        const apiContainer = document.getElementById('api');

        const post = document.createElement('div');
        post.classList.add('post', 'col-md-4');

        // مكتبه صور عشوائيه
        const imgUrl = `https://picsum.photos/seed/${index}/300/200`;
        post.innerHTML = `
            <img src="${imgUrl}" >
            <h2>${page.title}</h2>
            <p>${page.body}</p>
            <button class="toggle-comments-btn">عرض التعليقات</button>
            <div class="comments"></div>
        `;

        const button = post.querySelector('.toggle-comments-btn');
        const commentsDiv = post.querySelector('.comments');

        button.addEventListener('click', () => {
            if (commentsDiv.style.display === 'none') {
                fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(response => response.json())
                    .then(comments => {
                        const postComments = comments.filter(comment => comment.postId === page.id);
                        commentsDiv.innerHTML = postComments.map(comment => `
                            <p><strong>${comment.name}:</strong> ${comment.body}</p>
                        `).join('');
                        commentsDiv.style.display = 'block';
                        button.textContent = 'إخفاء التعليقات';
                    });
            } else {
                commentsDiv.style.display = 'none';
                button.textContent = 'عرض التعليقات';
            }
        });

        apiContainer.appendChild(post);
    })
);
