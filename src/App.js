import LangProvider from './context/lang';

import Title from './components/title';
import TitleChange from './components/titleChange';

function App() {
  return (
    <div className="App">
      <LangProvider >
        <div>
          <TitleChange />
          <Title />
        </div>
      </LangProvider>
    </div>
  );
}

export default App;