/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import UserCard from '../components/cards/UserCard';
import { getUserDetails } from '../api/userData';
import { getSubscriptionsByUser } from '../api/subscriptionData';
import { useAuth } from '../utils/context/authContext';
import SubscriptionCard from '../components/cards/SubscriptionCard';
import SubscriptionForm from '../components/forms/SubscriptionForm';

export default function Profile() {
  const [userObj, setUserObj] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const getProfile = async () => {
    const userDeets = await getUserDetails(user.uid);
    const userSubs = await getSubscriptionsByUser(userDeets.id);
    setUserObj(userDeets);
    setSubscriptions(userSubs);
  };

  const onUpdate = () => {
    setShowForm(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="profile">
        <div className="userCard">
          <UserCard userObj={userObj} />
        </div>
        <div className="subs">
          <h4>{subscriptions ? 'Here are your subscriptions!' : 'No subscriptions to show yet!'}</h4>
          <Button className="create-sub" variant="danger" type="click" onClick={() => setShowForm(true)}>Create Subscription</Button>
          {showForm ? (
            <SubscriptionForm onUpdate={onUpdate} />
      ) : null}
          {subscriptions.map((subs) => (
            <div key={subs.id}>
              <SubscriptionCard subObj={subs} onUpdate={onUpdate} />
            </div>
      ))}
        </div>
      </div>

    </>
  );
}
