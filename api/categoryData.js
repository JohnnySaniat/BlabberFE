const getAllCategories = () => fetch('https://localhost:7193/categories', {
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

const createCategory = (category) => fetch('https://localhost:7193/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(category),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

const deleteCategoryById = (categoryId) => fetch(`https://localhost:7193/categories/${categoryId}`, {
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

const updateCategory = (categoryId, updatedCategory) => fetch(`https://localhost:7193/categories/${categoryId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedCategory),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  });

const getPostsByCategoryId = (categoryId) => fetch(`https://localhost:7193/categories/${categoryId}/posts`, {
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

const getCategoryById = (categoryId) => fetch(`https://localhost:7193/categories/${categoryId}`, {
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

export {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategory,
  getPostsByCategoryId,
  getCategoryById,
};
