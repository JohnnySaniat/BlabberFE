import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCategoryById } from '../../api/categoryData';

function CategoryCard({ category, onUpdate }) {
  const handleDelete = (categoryId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      deleteCategoryById(categoryId)
        .then(() => {
          console.log(`Category with ID ${categoryId} deleted successfully`);
          onUpdate();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting category:', error.message);
        });
    }
  };

  return (
    <Card className="complete-category-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className="card-title">{category.label}</Card.Title>
        <Link href={`/category/edit/${category.id}`} passHref>
          <Button className="category-card-button" variant="secondary">EDIT</Button>
        </Link>
        <Button className="category-card-button" variant="danger" onClick={() => handleDelete(category.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CategoryCard;
