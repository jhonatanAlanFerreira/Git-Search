import classes from "./Card.module.scss";

function Card(props) {
  let { values } = props;

  return (
    <>
      <div onClick={_ => goToGitHub(values.html_url)} className={classes.container}>
        <div className={classes.card}>
          <div className={classes.title}>
            <h1>{values.name}</h1>
            <h2 onClick={_ => goToGitHub(values.owner.html_url)}><b>Criador: </b><u>{values.owner.login}</u></h2>
            <hr></hr>
          </div>
          <span>{values.description}</span>
          <div className={classes.content}></div>
        </div>
      </div>
    </>
  );
}

function goToGitHub(githubLink) {
  window.open(githubLink, '_blank');
}

export default Card;
