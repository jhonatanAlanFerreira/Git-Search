import classes from './Search.module.scss';

function Search() {
  return <form onsubmit="event.preventDefault();" role="search">
  <input id="search" type="search" placeholder="Procurar repositórios" autofocus required />
  <button type="submit">Buscar</button>    
</form>
}

export default Search;