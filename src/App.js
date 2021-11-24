import Card from "./components/card/Card";
import Search from "./components/search/Search";
import { useState } from "react";

function App() {
  const [repoData, setRepoData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  function search(searhcValue) {
    if (!searhcValue) return;

    fetch(`https://api.github.com/search/repositories?q=${searhcValue}`)
      .then((res) => res.json())
      .then((res) => {
        setRepoData(res.items);
        setTotal(res.total_count);
        setSearched(true);
      });
  }

  return (
    <>
      <div className="search-bar">
        <Search searchFn={search}></Search>
      </div>
      <div className="page-grid">
        <div className="linguages">
          <ul>
            <li>Python</li>
            <li>Java</li>
            <li>Javascript</li>
            <li>C#</li>
            <li>Node</li>
            <li>SQL</li>
          </ul>
        </div>
        <div>
          <h3>
            {searched ? <span>{total} Resultados Encontrados</span> : null}
          </h3>
          <hr></hr>
          <div className="cards-grid">
            {repoData.map((d) => (
              <Card key={d.id} values={d}></Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
