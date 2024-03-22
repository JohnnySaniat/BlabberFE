import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllCategories } from '../api/categoryData';
import CategoryCard from '../components/cards/CategoryCard';

function ShowAllCategories() {
  const [categories, setCategories] = useState([]);

  const getAllTheCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getAllTheCategories();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="http://localhost:3000/category/new" passHref>
          <Button className="category-card-button" variant="secondary">CREATE CATEGORY</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {categories.map((category) => {
            console.warn(category); // Add this line to log the category to the console
            return <CategoryCard key={category.id} category={category} onUpdate={getAllCategories} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ShowAllCategories;
