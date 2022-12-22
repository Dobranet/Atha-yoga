import React from 'react';
import { AuthContext } from '../../providers/auth/index.jsx';

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
