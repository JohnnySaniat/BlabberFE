import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function UserCard({ userObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{userObj.firstName} {userObj.lastName}</Card.Title>
          <Card.Text>
            <p>Image URL: {userObj.image}</p>
            <p>Email: {userObj.email}</p>
            <p>Bio: {userObj.bio}</p>
            <p>Active: {userObj.active ? 'Yes' : 'No'}</p>
            <p>Staff: {userObj.isStaff ? 'Yes' : 'No'}</p>
            <h3>Member Since: {userObj.createdOn}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
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
  }).isRequired,
};
