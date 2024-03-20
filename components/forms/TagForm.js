import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { newTag, updateTag } from '../../api/tagData';

const initialState = {
  // id: -1,
  label: '',
};

export default function TagForm({ tagObj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tagObj.id) {
      const payload = { label: formInput.label };
      updateTag(tagObj.id, payload).then(onUpdate);
    } else {
      const payload = { label: formInput.label };
      newTag(payload).then(onUpdate);
      setFormInput(initialState);
    }
  };

  useEffect(() => {
    if (tagObj.id) {
      setFormInput(tagObj);
    }
  }, [tagObj]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{formInput.id === -1 ? 'Create a tag' : 'Update your tag'}</Form.Label>
              <Form.Control
                type="text"
                name="label"
                value={formInput.label}
                placeholder="Enter the tag's label"
                onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {formInput.id === -1 ? 'Create' : 'Update'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

TagForm.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
TagForm.defaultProps = {
  tagObj: initialState,
};
