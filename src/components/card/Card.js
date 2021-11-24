import classes from "./Card.module.scss";

function Card(props) {
  let { values } = props;

  return (
    <>
      <div onClick={_ => goToGitHub(values.html_url)} className={classes.container}>
        <div className={classes.card}>
          <div className={classes.title}>
            <h1>{values.name}</h1>
            <h2>"{values.owner.login}"</h2>
          </div>
          <span>{values.description}</span>
          <div className={classes.content}></div>
        </div>
      </div>
    </>
  );
}

function goToGitHub(githubLink){
  window.location = githubLink;
}

export default Card;
