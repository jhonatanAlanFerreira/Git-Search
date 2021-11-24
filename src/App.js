import Card from "./components/card/Card";
import Search from "./components/search/Search";
import { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "./components/loading/Loading";

function App() {
  const [repoData, setRepoData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const [currentItems, setCurrentItems] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const ulRef = useRef();

  function search(searhcValue) {
    if (!searhcValue) return;

    setLoading(true);

    fetch(
      `https://api.github.com/search/repositories?q=${searhcValue}&per_page=10`
    )
      .then((res) => res.json())
      .then((res) => {
        setRepoData(res.items);
        setTotal(res.total_count);
        setSearched(true);
        setLoading(false);
      });
  }

  function handlePageClick() {}

  function liClicked(li, ulRef) {
    let liNativeEvent = li.nativeEvent;
    let ulCurrent = ulRef.current;

    let lis = Array.from(ulCurrent.getElementsByTagName("li"));
    lis.map((li) => li.classList.remove("selected"));

    liNativeEvent.target.classList.add("selected");
  }

  function Cards() {
    return (
      <>
        {!loading ? (
          <div className="cards-grid">
            {repoData.map((data) => (
              <Card key={data.id} values={data}></Card>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <div className="search-bar">
        <Search searchFn={search}></Search>
      </div>
      <div className="page-grid">
        <div className="sort">
          <i>Ordenações</i>
          <ul ref={ulRef}>
            <li onClick={(li) => liClicked(li, ulRef)} className="selected">
              Melhor match
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>Mais estrelas</li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>Menas estrelas</li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>Mais forks</li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>Menas forks</li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>
              Atualizado recentemente
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef)}>
              Atualização mais antiga
            </li>
          </ul>
        </div>
        <div>
          <div className="results">
            <h3>
              {searched ? <span>{total} Resultados Encontrados</span> : null}
            </h3>
            <hr></hr>
          </div>

          <Loading loading={loading}></Loading>

          <Cards></Cards>

          {repoData.length && !loading ? (
            <div className="paginator">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
