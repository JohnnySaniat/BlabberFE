import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUsers, getUserDetails } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { getSubscriptionsByUser, newSubscription } from '../../api/subscriptionData';

const initialState = {
  authorId: -1,
};
export default function SubscriptionForm({ onUpdate }) {
  const [users, setUsers] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const [thisUser, setThisUser] = useState({});
  const { user } = useAuth();

  const getPeople = async () => {
    const userObj = await getUserDetails(user.uid);

    try {
      const [allUsers, currentUser, userSubscriptions] = await Promise.all([
        getUsers(),
        userObj,
        getSubscriptionsByUser(userObj.id),
      ]);

      const filteredUsers = allUsers.filter((p) => !userSubscriptions.some((subscription) => subscription.authorId === p.id || p.id === userObj.id));

      setUsers(filteredUsers);
      setThisUser(currentUser);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { followerId: thisUser.id, authorId: formInput.authorId };
    newSubscription(payload).then(onUpdate);
  };

  useEffect(() => {
    getPeople();
    setFormInput(initialState);
  }, []);

  return (
    <div className="new-sub">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Create a new subscription</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              aria-label="Goal Type"
              name="authorId"
              onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
              className="mb-3 rounded-0"
              value={formInput.authorId}
              required
            >
              <option value="">Select an author</option>
              {users.map((person) => (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {`${person.firstName} ${person.lastName}`}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

SubscriptionForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
