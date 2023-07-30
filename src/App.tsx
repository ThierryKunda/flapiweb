import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router";

import HomePage from './pages/HomePage';
import Summary from './pages/Summary';
import Documentation from './pages/Documentation';
import Administration from './pages/Administration';
import PasswordRecovery from './pages/PasswordRecovery';
import NewPassword from './pages/NewPassword';
import Profile from './pages/Profile';

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path='/'  component={HomePage} />
        <Route path='/summary' component={Summary} />
        <Route path='/docs' component={Documentation} />
        <Route path='/admin' component={Administration} />
        <Route path='/password_recovery' component={PasswordRecovery} />
        <Route path='/profile'  component={Profile} />
        <Route path='/new_password'  component={NewPassword} />
      </Routes>
    </>
  );
}

export default App;
