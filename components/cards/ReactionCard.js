import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteReaction } from '../../api/reactionData';

function ReactionCard({ reactionObj, onUpdate }) {
  const removeReaction = () => {
    if (window.confirm('Remove reaction?')) {
      deleteReaction(reactionObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card key={reactionObj.id} border="dark" style={{ width: '18rem' }}>
      <div className="d-flex justify-content-center mx-4 mb-1 mt-2">
        <h5>{reactionObj.label}</h5>
      </div>
      <Card.Text>
        <img src={reactionObj.image} alt="Uploaded reaction" width={100} height={100} />
      </Card.Text>
      <Button variant="danger" className="w-30 m-auto mb-1 mt-1" onClick={removeReaction}>Delete</Button>
    </Card>
  );
}

ReactionCard.propTypes = {
  reactionObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionCard;
