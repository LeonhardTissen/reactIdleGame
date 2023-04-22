import './App.css';

function MemoryCard(props) {
  return <button className="memoryCard" onClick={ (event) => clickCard(event.target) }>{props.word}</button>
}

let one_clicked = false;
function clickCard(element) {
  const cls = 'shown';
  element.classList.add(cls);
  
  if (one_clicked) {
    setTimeout(() => {
      document.querySelectorAll('.' + cls).forEach((e) => {
        e.classList.remove(cls);
      })
    }, 1000)
    one_clicked = false;
  } else {
    one_clicked = true;
  }
}

function MemoryGame() {
  return <div className="MemoryCardContainer">
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
    <MemoryCard word="Apple"/>
  </div>
}

function App() {
  return (
    <div className="App">
      <div className="MemoryCardContainer">
        <MemoryGame/>
      </div>
    </div>
  );
}

export default App;
