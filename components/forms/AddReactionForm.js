/* eslint-disable react/forbid-prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { addReactionToPost, getReactions } from '../../api/reactionData';
import PostReactionCard from '../cards/PostReactionCard';
import { getUserDetails } from '../../api/userData';

function AddReactionForm({ postId }) {
  const [reactionId, setReactionId] = useState(-1);
  const { user } = useAuth();
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();
  const [reactions, setReactions] = useState([]);

  // modal functionality
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) return;

    getUserDetails(user.uid)
      .then(setUserObj)
      .catch((error) => console.error('Error fetching user details:', error));

    getReactions().then(setReactions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      reactionId,
      postId,
      userId: userObj.id,
    };

    addReactionToPost(postId, payload)
      .then(() => {
        console.log('reaction created successfully');
        router.push(`/post/${postId}`);
        window.location.reload();
      })
      .catch((error) => console.error('Error adding to post:', error));
  };

  return (
    <>
      <Button variant="light" size="sm" className="mt-3 mb-3" onClick={handleShow}>
        React
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="p-3">
          <Form.Group className="mb-3 d-flex row" controlId="formBasicInput">
            <Form.Label className="text-black">Pick a reaction</Form.Label>
            <div className="d-flex flex-wrap justify-content-center">
              {reactions.map((r) => (
                <Button className="blank" type="submit" onClick={() => setReactionId(r.id)}>
                  <PostReactionCard
                    key={r.id}
                    reactionObj={r}
                  />
                </Button>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}

AddReactionForm.propTypes = {
  reaction: PropTypes.shape({
    postId: PropTypes.number,
    userId: PropTypes.number,
    reactionId: PropTypes.number,
  }),
  postId: PropTypes.number,
};

AddReactionForm.defaultProps = {
  reaction: null,
  postId: null,
};

export default AddReactionForm;
