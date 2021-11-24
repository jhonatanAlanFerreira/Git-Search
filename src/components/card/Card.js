import classes from "./Card.module.scss";

function Card(props) {
  let { values } = props;

  return (
    <>
      <div
        title={"Ir para o repositório " + values.name}
        onClick={(_) => goToGitHub(values.html_url)}
        className={classes.container}
      >
        <div className={classes.card}>
          <div className={classes.title}>
            <h1>{values.name}</h1>
            <h2>
              <b>Criador: </b>
              <u
                title={"Ir para o usuário " + values.owner.login}
                onClick={(_) => goToGitHub(values.owner.html_url)}
              >
                {values.owner.login}
              </u>
            </h2>
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
  window.open(githubLink, "_blank");
}

export default Card;
