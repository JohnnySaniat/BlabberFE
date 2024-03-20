import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePostById } from '../../api/postData';
import { getAllCategories } from '../../api/categoryData';

function PostCard({ post, onUpdate }) {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((categories) => setAllCategories(categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleDelete = (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      deletePostById(postId)
        .then(() => {
          console.log(`Post with ID ${postId} deleted successfully`);
          onUpdate();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting post:', error.message);
        });
    }
  };

  const postCategory = allCategories.find((category) => category.id === post.categoryId);

  return (
    <Card className="complete-post-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={post.image} alt={post.title} style={{ height: '215px' }} />
      <Card.Body>
        <Card.Title className="card-title">{post.title}</Card.Title>
        <Card.Text className="card-content">{post.content}</Card.Text>
        <p className="card-date"><strong>Date:</strong> {new Date(post.publicationDate).toLocaleDateString()}</p>
        <p className="card-category"><strong>Category:</strong> {postCategory ? postCategory.label : 'Unknown'}</p>

        <Link href={`/post/${post.id}`} passHref>
          <Button className="post-card-button" variant="dark">View</Button>
        </Link>
        <Link href={`/post/edit/${post.id}`} passHref>
          <Button className="post-card-button" variant="secondary">EDIT</Button>
        </Link>
        <Button className="post-card-button" variant="danger" onClick={() => handleDelete(post.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    userId: PropTypes.number,
    categoryId: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string,
      author: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
