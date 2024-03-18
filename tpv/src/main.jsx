import React from 'react'
import ReactDOM from 'react-dom/client'

import store from "./redux/store";
import { Provider } from "react-redux";
import TableContext from './context/TableContext.jsx';
import MountedApp from './MountedApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TableContext>
    <MountedApp />
    </TableContext>
    </Provider>
  </React.StrictMode>,
)
