import React from 'react';
import Routes from '../components/Routes';
import {Provider} from 'react-redux';
import store from '../store/store'
const index= () => {
  return (
   <Provider store={store}>
      <Routes />
  </Provider>
  );
};


export default index;
