import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  // observer 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('Observing user from Auth Provider:', currentUser);
      setUser(currentUser);
      setLoading(false);
    })

    return (() => {
      unsubscribe();
    })
  }, [])

  const authValue = { user, loading, logOut, createUser, loginUser };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;