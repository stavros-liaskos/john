import { useEffect, useState } from 'react';

// TODO use when implementing custom session management
export function useUser() {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const sessionCookie = document.cookie.split(';').some(item => item.trim().startsWith('q_session='));

    if (!user && sessionCookie) {
      setUser(true);
    }
  }, [user]);

  return {
    user,
  };
}
