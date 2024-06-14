import {createContext} from 'react';

import {AuthType} from './types';

const AuthContext = createContext<AuthType | undefined>(undefined);

export default AuthContext;
