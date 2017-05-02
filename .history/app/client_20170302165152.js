import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux' //利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import routes from './routes';
import configure from './store/configureStore';
import myhistory from './history'

const store = configure({ config: global.$GLOBALCONFIG })
const history = syncHistoryWithStore(myhistory, store)
// history.listen(location => console.log('location:', location))
history.listen(function (location) { return location })


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
        { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);