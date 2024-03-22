import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCategoryById } from '../../../api/categoryData';
import CategoryForm from '../../../components/forms/CategoryForm';

function EditCategory() {
  const [editCategory, setEditCategory] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getCategoryById(id).then(setEditCategory);
    }
  }, [id]);

  return (
    <CategoryForm category={editCategory} />
  );
}

export default EditCategory;
