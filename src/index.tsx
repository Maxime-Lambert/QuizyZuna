import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './i18n'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Settings from './features/settings/Settings';
import FinalScreen from './features/finalScreen/FinalScreen';
import Question from './features/question/Question';
import App from './App';
import Home from './features/home/Home';

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/question",
        element: <Question/>,
      },
      {
        path: "/score",
        element: <FinalScreen/>,
      },
      {
        path: "/settings",
        element: <Settings/>,
      },
    ]
  }
]);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>
);

reportWebVitals();
