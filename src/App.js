import logo from "./logo.svg";
import "./App.css";
import EditableCanvas from "./EditableCanvas";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel things to consider</h1>
        <EditableCanvas />
      </header>
    </div>
  );
}

export default App;
