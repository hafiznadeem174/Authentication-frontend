import { useEffect } from 'react';

function RefreshHandler({ setAuthenticated }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token); // Set authenticated to true if token exists
  }, [setAuthenticated]);

  return null;
}

export default RefreshHandler;