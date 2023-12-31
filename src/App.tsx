import { createResource, type Component } from 'solid-js';
import { createStore } from "solid-js/store";
import { Routes, Route } from "@solidjs/router";
import AuthState from './components/AuthState';

import HomePage from './pages/HomePage';
import Summary from './pages/Summary';
import Documentation from './pages/Documentation';
import Administration from './pages/Administration';
import PasswordRecovery from './pages/PasswordRecovery';
import NewPassword from './pages/NewPassword';
import Profile from './pages/Profile';
import { SessionProvider } from './contexts';
import { getApiToken } from './utils/session';

const App: Component = () => {
  const session: {
    authorized: boolean,
    username?: string,
    access_token?: string,
    token_type?: string
  } = getApiToken() ? {...getApiToken()!, authorized: true} : {
    username: undefined,
    authorized: false,
    access_token: undefined,
    token_type: undefined
  };
  return (
    
      <SessionProvider session={session}>
        <Routes>
          <AuthState>
            <Route path='/'  component={HomePage} />
              <Route path='/summary' component={Summary} />
              <Route path='/docs' component={Documentation} />
              <Route path='/admin' component={Administration} />
              <Route path='/password_recovery' component={PasswordRecovery} />
              <Route path='/profile'  component={Profile} />
              <Route path='/new_password'  component={NewPassword} />
          </AuthState>
        </Routes>
      </SessionProvider>
  );
}

export default App;
