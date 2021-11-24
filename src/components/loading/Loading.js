function Loading(props) {
    let { loading } = props;

    return (
      <>
        {loading ? (
          <div className="loader">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
      </>
    );
}
  
export default Loading;