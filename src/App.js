import './App.css';
import { useSelector } from 'react-redux';
import Editor from './components/Editor';
import Header from './components/header';

function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <div className={`App ${(mode === 'dark') && 'dark'}`}>
      <Header />
      <Editor />
    </div>
  );
}

export default App;
