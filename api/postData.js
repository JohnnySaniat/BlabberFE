const getAllPosts = () => fetch('https://localhost:7193/posts', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => Object.values(data));

const getPostById = (id) => fetch(`https://localhost:7193/posts/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

const deletePostById = (id) => fetch(`https://localhost:7193/posts/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  });

const createPost = (postDto) => fetch('https://localhost:7193/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postDto),
})
  .then((response) => {
    if (!response.ok) {
      console.warn(response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  });

const updatePostById = (id, postData) => fetch(`https://localhost:7193/posts/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

const removePostCategory = (postId, categoryId) => fetch(`https://localhost:7193/posts/${postId}/categories/${categoryId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  });

const updatePostCategory = (postId, categoryId) => fetch(`https://localhost:7193/posts/${postId}/categories/${categoryId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  });

const getPostByUid = (uid) => fetch(`https://localhost:7193/posts/users/${uid}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data)) throw new Error('Unexpected response format: expected an array');
    return data;
  })
  .catch((error) => {
    console.error('Error fetching posts:', error);
    throw error;
  });

export {
  getAllPosts,
  getPostById,
  deletePostById,
  createPost,
  updatePostById,
  removePostCategory,
  updatePostCategory,
  getPostByUid,
};
