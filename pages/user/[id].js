import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../api/userData';
import RegisterForm from '../../components/forms/RegisterForm';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});

  const getUser = async () => {
    const getPerson = await getUserDetails(id);
    setUser(getPerson);
  };

  const onUpdate = () => {
    router.push(() => '/profile');
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (<RegisterForm userObj={user} onUpdate={onUpdate} />);
}
