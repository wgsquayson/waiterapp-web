import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { Header } from './components/Header';
import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center' />
    </>
  );
};
