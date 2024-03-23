import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllCategories } from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { updatePostById, createPost } from '../../api/postData';
import { getUserDetails } from '../../api/userData';

const initialState = {
  title: '',
  image: '',
  categoryId: '',
  content: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useAuth();
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    getUserDetails(user.uid)
      .then(setUserObj)
      .catch((error) => console.error('Error fetching user details:', error));
  }, [user]);

  useEffect(() => {
    if (obj) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  useEffect(() => {
    getAllCategories()
      .then((categories) => setCategoryList(categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      userId: userObj.id,
      publicationDate: new Date().toISOString(),
      approved: true,
      uid: user.uid,
    };

    if (obj && obj.id) {
      updatePostById(obj.id, payload)
        .then(() => {
          console.log('Post updated successfully');
          router.push('/all-posts');
        })
        .catch((error) => console.error('Error updating post:', error));
    } else {
      createPost(payload)
        .then(() => {
          console.log('Post created successfully');
          router.push('/all-posts');
        })
        .catch((error) => console.error('Error creating post:', error));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj && obj.id ? 'Update' : 'Create'} a Post</h2>

      <FloatingLabel controlId="title" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="image" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="categoryId" label="Category" className="mb-3">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          value={formInput.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="content" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter Content"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="danger" type="submit">{obj && obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: null,
};

export default PostForm;
