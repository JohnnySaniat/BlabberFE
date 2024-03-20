import React, { useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import { getUserDetails } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const [userObj, setUserObj] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getUserDetails(user.uid)?.then(setUserObj);
  }, []);

  return (
    <UserCard userObj={userObj} />
  );
}
