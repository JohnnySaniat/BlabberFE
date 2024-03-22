import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';
import { getUserDetails } from '../api/userData';

function Home() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getUserDetails(user.uid)?.then(setCurrentUser);
  }, [user]);

  const onUpdate = () => {
    router.reload();
    getUserDetails(user.uid)?.then(setCurrentUser);
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {currentUser ? (
        <>
          <h1>Hello {user.fbUser.displayName}! </h1>
          <p>Your Bio: {user.bio}</p>
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </>
      )
        : (<RegisterForm onUpdate={onUpdate} />)}

    </div>
  );
}

export default Home;
