import logo from "./logo.svg";
import "./App.css";
import EditableCanvas from "./EditableCanvas";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Clickable Canvas</h1>
        <EditableCanvas />
      </header>
    </div>
  );
}

export default App;
