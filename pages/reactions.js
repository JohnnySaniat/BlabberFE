/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getReactions } from '../api/reactionData';
import ReactionCard from '../components/cards/ReactionCard';

function ViewReactions() {
  const [reactions, setReactions] = useState([]);

  const getAllReactions = () => {
    getReactions().then(setReactions);
  };

  useEffect(() => {
    getAllReactions();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="http://localhost:3000/reaction/new" passHref>
          <Button variant="dark" size="lg">Create Reaction</Button>
        </Link>
        <div className="d-flex flex-wrap justify-content-center mt-3 gap-3">
          {reactions.map((reaction) => (
            <ReactionCard
              key={reaction.id}
              reactionObj={reaction}
              onUpdate={getAllReactions}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewReactions;
