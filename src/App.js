import Card from "./components/card/Card";
import Search from "./components/search/Search";
import { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "./components/loading/Loading";

var searchValue = '';
var sort = 'order=desc&sort=';

function App() {
  const [repoData, setRepoData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const [currentItems, setCurrentItems] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const ulRef = useRef();

  function search(useSearchValue) {
    if (!useSearchValue) return;

    searchValue = useSearchValue;
    setLoading(true);

    fetch(
      `https://api.github.com/search/repositories?q=${searchValue}&per_page=10&${sort}`
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

  function liClicked(li, ulRef, useSort) {
    sort = useSort;

    let liNativeEvent = li.nativeEvent;
    let ulCurrent = ulRef.current;

    let lis = Array.from(ulCurrent.getElementsByTagName("li"));
    lis.map((li) => li.classList.remove("selected"));

    liNativeEvent.target.classList.add("selected");

    search(searchValue);
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
          <ul ref={ulRef}>
            <div className="sort-title">
            <i>Ordenações</i>
            </div>
            <li onClick={(li) => liClicked(li, ulRef, 'order=desc&sort=')} className="selected">
             Melhor match
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=desc&sort=stars')}>
              Mais estrelas
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=asc&sort=stars')}>
              Menas estrelas
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=desc&sort=forks')}>
              Mais forks
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=asc&sort=forks')}>
              Menos forks
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=desc&sort=help-wanted-issues')}>
              Mais issues
            </li>
            <hr></hr>
            <li onClick={(li) => liClicked(li, ulRef, 'order=asc&sort=help-wanted-issues')}>
              Menos issues
            </li>
           <hr></hr>
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
