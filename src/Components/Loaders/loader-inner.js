import classes from "./loader.module.css";

const LoaderInner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "-2rem 0 0 0",
      }}
    >
      <p>Loading..</p>
      <div className={classes["loader-inner"]}></div>
    </div>
  );
};

export default LoaderInner;
