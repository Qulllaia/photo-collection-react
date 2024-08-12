import './css/main.css'


function App() {
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="navigation">
        <div className="tags">
          <ul>
            <li>Все</li>
            <li>Горы</li>
            <li>Леса</li>
          </ul>
        </div>
      </div>
      <div className="photos">

      </div>
      <div className="pages">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
