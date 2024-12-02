// TODO
// - remove port 3001

import './App.css'; // TODO: just use index.css
import Background from './components/Background';
import Phone from './components/Phone';

function App() {
  return (
    <div className="App flex items-center justify-center h-screen">
      <Background />
      <Phone />
    </div>
  );
}

export default App;
