import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { updateCategory, createCategory } from '../../api/categoryData';

const initialState = {
  label: '',
};

function CategoryForm({ category }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setFormInput(category);
    } else {
      setFormInput(initialState);
    }
  }, [category]);

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
    };

    if (category && category.id) {
      updateCategory(category.id, payload)
        .then(() => {
          console.log('Category updated successfully');
          router.push('/categories');
        })
        .catch((error) => console.error('Error updating category:', error));
    } else {
      createCategory(payload)
        .then(() => {
          console.log('Category created successfully');
          router.push('/categories');
        })
        .catch((error) => console.error('Error creating category:', error));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{category && category.id ? 'Update' : 'Create'} a Category</h2>

      <FloatingLabel controlId="label" label="Category Label" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Category Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="danger" type="submit">{category && category.id ? 'Update' : 'Create'} Category</Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  category: null,
};

export default CategoryForm;
