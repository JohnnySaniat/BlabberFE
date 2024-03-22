import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { removeSubscription } from '../../api/subscriptionData';

export default function SubscriptionCard({ subObj, onUpdate }) {
  const onClick = () => {
    if (window.confirm(`Are you sure you want to remove your subscription to ${subObj.author.firstName} ${subObj.author.lastName}?`)) {
      removeSubscription(subObj.followerId, subObj.authorId).then(onUpdate);
    }
  };

  useEffect(() => {

  }, [subObj]);

  return (
    <div className="sub-card">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{subObj.author.firstName} {subObj.author.lastName}</Card.Title>
          <p>Date Created: {subObj.createdOn}</p>
          <Button variant="secondary" type="click" onClick={onClick}>
            Remove Subscription
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

SubscriptionCard.propTypes = {
  subObj: PropTypes.shape({
    id: PropTypes.number,
    followerId: PropTypes.number,
    authorId: PropTypes.number,
    createdOn: PropTypes.string,
    endedOn: PropTypes.string,
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
