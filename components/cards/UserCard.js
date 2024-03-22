import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function UserCard({ userObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{userObj.firstName} {userObj.lastName}</Card.Title>
          <img src={userObj.image} alt={userObj.firstName} />
          <p>Email: {userObj.email}</p>
          <p>Bio: {userObj.bio}</p>
          <p>Active: {userObj.active ? 'Yes' : 'No'}</p>
          <p>Staff: {userObj.isStaff ? 'Yes' : 'No'}</p>
          <p>Member Since: {userObj.createdOn}</p>
          <Link href={`/user/edit/${userObj.id}`}>
            <Button variant="secondary">Edit Profile</Button>
          </Link>
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
