import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { postReaction, updateReaction } from '../../api/reactionData';

const initialState = {
  label: '',
  image: '',
};

function ReactionForm({ reaction }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (reaction) {
      setFormInput(reaction);
    } else {
      setFormInput(initialState);
    }
  }, [reaction]);

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

    if (reaction && reaction.id) {
      updateReaction(reaction.id, payload)
        .then(() => {
          router.push('/reactions');
        })
        .catch((error) => console.error('Error updating reaction:', error));
    } else {
      postReaction(payload)
        .then(() => {
          router.push('/reactions');
        })
        .catch((error) => console.error('Error creating reaction:', error));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <h2 className="text-white mt-5">{reaction && reaction.id ? 'Update' : 'Create'} a Reaction</h2>

      <FloatingLabel controlId="label" label="Reaction Label" className="mb-3 w-25 m-auto">
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="Name your reaction"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="image" label="Reaction Image" className="mb-3 w-25 m-auto">
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="Enter image url of your reaction"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="success" type="submit">{reaction && reaction.id ? 'Update' : 'Create'} Reaction</Button>
    </Form>
  );
}

ReactionForm.propTypes = {
  reaction: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ReactionForm;
