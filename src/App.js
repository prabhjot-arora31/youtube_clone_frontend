import logo from "./logo.svg";
import "./App.css";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReactLoading from "react-loading";
import axios from "axios";
const override: CSSProperties = {
  // display: "block",
  margin: "0 auto",
  borderColor: "black",
};
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [data, setdata] = useState([]);
  const [isRelevant, setisrelevant] = useState(true);
  const [myDiv, setmydiv] = useState("myDiv");
  const search = () => {
    const call = async () => {
      setLoading(true);
      const res = await axios
        .post(`http://localhost:3001/`, {
          search1: searchQuery,
        })
        .then((result) => {
          console.log(result);
          setdata(result.data);
          setisrelevant(true);
          setLoading(false);
        })
        .catch(() => {
          setisrelevant(false);
        });
    };
    call();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.7rem" }}>
        <div style={{ width: "75px" }}>
          <img
            src="https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg?w=2000"
            style={{ width: "100%" }}
          />
        </div>
        <h2 style={{ textAlign: "center" }}>Youtube Search</h2>
      </div>
      <h4 style={{ textAlign: "center", margin: 0 }}>
        Developer:{" "}
        <span style={{ color: "crimson" }}>PRABHJOT SINGH ARORA</span>
      </h4>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.7rem",
            flexWrap: "wrap",
          }}
        >
          <input
            style={{
              padding: "0.4rem",
              padding: "0.35rem 0.65rem",
              border: "2px solid",
              borderRadius: "0.6rem",
            }}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            onClick={search}
            style={{
              padding: "0.35rem 0.65rem",
              border: "none",
              borderRadius: "0.6rem",
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </header>
      {loading === true ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            type="balls"
            color="black"
            height={"3.5%"}
            width={"3.5%"}
          />
        </div>
      ) : (
        <main
          style={{
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2rem",
          }}
        >
          {isRelevant ? (
            data.map((ele) => {
              return (
                <button
                  style={{ border: "none", backgroundColor: "white" }}
                  // onMouseEnter={() => {
                  //   setmydiv("myDiv2");
                  // }}
                  // onMouseLeave={() => {
                  //   setmydiv("myDiv");
                  // }}
                >
                  <a
                    key={ele.title}
                    href={ele.link}
                    style={{
                      textDecoration: "none",
                      position: "relative",
                      color: "black",
                    }}
                  >
                    <div
                      style={{
                        width: "300px",
                        minHeight: "240px",
                        // border: "2px solid black",
                        marginBottom: "12px",
                        padding: "0.6rem",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          ele.thumbnail.rich
                            ? ele.thumbnail.rich
                            : ele.thumbnail.static
                        }
                        style={{ width: "100%" }}
                      />
                      <h5 style={{ textAlign: "left", margin: 0 }}>
                        {ele.title.length > 70
                          ? ele.title.substring(0, 70) + "...."
                          : ele.title}
                      </h5>
                      <p style={{ fontSize: "11.5px", textAlign: "left" }}>
                        <a
                          href={ele.channel.link}
                          style={{
                            color: "white",
                            padding: "0.2rem 0.8rem",
                            marginTop: "0.6rem",
                            fontWeight: 700,
                            textDecoration: "none",
                            backgroundColor: "crimson",
                          }}
                        >
                          {ele.channel.name}
                        </a>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 0,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11.5px",
                            textAlign: "left",
                            margin: 0,
                          }}
                        >
                          {ele.published_date}
                        </p>
                        <p
                          style={{
                            fontSize: "11.5px",
                            textAlign: "left",
                            margin: 0,
                          }}
                        >
                          {ele.views} views
                        </p>
                      </div>
                    </div>
                    <div className={myDiv}>Kuchbhi</div>
                  </a>
                </button>
              );
            })
          ) : (
            <h3>Please enter the relevant search...</h3>
          )}
        </main>
      )}
    </>
  );
}

export default App;
