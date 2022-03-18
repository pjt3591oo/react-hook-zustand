import LangProvider from './context/lang';

import Title from './components/title';
import TitleChange from './components/titleChange';

import { store } from '../redux';
import { Provider } from 'react-redux'


function App() {
  return (
    <div className="App">
      <LangProvider >
        <div>
          <TitleChange />
          <Title />
        </div>
      </LangProvider>

      <Provider store={store}>
          
      </Provider>
    </div>
  );
}

export default App;