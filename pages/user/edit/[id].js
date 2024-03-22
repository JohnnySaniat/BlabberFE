import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../../api/userData';
import RegisterForm from '../../../components/forms/RegisterForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState({});
  const { user } = useAuth();

  const getUser = async () => {
    const getPerson = await getUserDetails(user.uid);
    setPerson(getPerson);
  };

  const onUpdate = () => {
    router.push('/profile');
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (<RegisterForm userObj={person} onUpdate={onUpdate} />);
}
