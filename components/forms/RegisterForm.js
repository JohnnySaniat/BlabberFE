import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { newUser, updateUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  firstName: '',
  lastName: '',
  bio: '',
  image: '',
  email: '',
  active: true,
  isStaff: false,
};

function RegisterForm({ userObj, onUpdate }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userObj.id) {
      updateUser(userObj.id, formData)?.then(onUpdate);
    } else {
      newUser({ uid: user.uid, ...formData })?.then(onUpdate);
    }
  };

  useEffect(() => {
    if (userObj.id) {
      setFormData(userObj);
    }
  }, [userObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your First Name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your Last Name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          type="text"
          name="bio"
          value={formData.bio}
          placeholder="Enter your Bio"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          placeholder="Enter your Image URL"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="switch"
          label="Are you a staff member?"
          name="isStaff"
          checked={formData.isStaff}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              isStaff: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    createdOn: PropTypes.string,
    active: PropTypes.bool,
    isStaff: PropTypes.bool,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
RegisterForm.defaultProps = {
  userObj: initialState,
};

export default RegisterForm;
