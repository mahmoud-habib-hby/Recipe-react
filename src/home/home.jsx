import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
function HOME() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgs = ["./img/مقلاة.jpeg", "./img/الادوات.jpeg", "./img/جهاز.jpeg"];
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Recipe")
      .then((response) => {
        setRecipes(
          Array.isArray(response.data) ? response.data : response.data.data
        );
      })
      .catch((err) => {
        console.error("❌ خطأ أثناء الجلب:", err);
        setError("فشل تحميل البيانات");
      })
      .finally(() => setLoading(false)); // يحدث دائمًا
  }, []);

  if (loading) return <div>⏳ جارٍ تحميل البيانات...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      {/* <svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg" data--h-bstatus="0OBSERVED"><defs data--h-bstatus="0OBSERVED"><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0" data--h-bstatus="0OBSERVED"><stop stop-color="rgba(16.948, 17.811, 65.884, 1)" offset="0%" data--h-bstatus="0OBSERVED"></stop><stop stop-color="rgba(21.803, 41.099, 88.652, 1)" offset="100%" data--h-bstatus="0OBSERVED"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,196L80,163.3C160,131,320,65,480,57.2C640,49,800,98,960,138.8C1120,180,1280,212,1440,187.8C1600,163,1760,82,1920,114.3C2080,147,2240,294,2400,334.8C2560,376,2720,310,2880,310.3C3040,310,3200,376,3360,400.2C3520,425,3680,408,3840,375.7C4000,343,4160,294,4320,253.2C4480,212,4640,180,4800,163.3C4960,147,5120,147,5280,130.7C5440,114,5600,82,5760,122.5C5920,163,6080,278,6240,310.3C6400,343,6560,294,6720,285.8C6880,278,7040,310,7200,294C7360,278,7520,212,7680,196C7840,180,8000,212,8160,187.8C8320,163,8480,82,8640,114.3C8800,147,8960,294,9120,359.3C9280,425,9440,408,9600,367.5C9760,327,9920,261,10080,253.2C10240,245,10400,294,10560,261.3C10720,229,10880,114,11040,89.8C11200,65,11360,131,11440,163.3L11520,196L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z" data--h-bstatus="0OBSERVED"></path></svg> */}

      <div className="top">
        <div className=".div">
          <h1 style={{ direction: "ltr" }}>
            {" "}
            <ReactTyped
              strings={["Recipe"]}
              typeSpeed={500}
              backSpeed={60}
              backDelay={200}
              loop
              fadeOut={true}
              cursorChar="|"
            />
          </h1>
          <p>
            موقع لوصفات الاكل
            <br /> مع مكونات الوصفة
            <br /> وطريقة التحضير
          </p>
          <Link className="btn btn-success" to="/add">
            اضافة وصفة
          </Link>
          <img src="-yellow.png" className="img" alt="" />
        </div>
        <div className="imgs">
          <img src="./img/فراخ.jpeg" alt="" />
          <img src="./img/بيتزا.jpeg" alt="" />
          <img src="./img/برجر.jpeg" alt="" />
        </div>
      </div>
      <div className="hr"></div>
      <div className="container py-10" style={{ backgroundColor: "#ffffffff" ,marginTop:"50px"}}>
        <div className="text-center mb-4">
          <span className="fw-bold fs-3 text-danger">🍲 قائمة الوصفات</span>
        </div>

        <div className="row g-4">
          {recipes.map((r) => {
            const randomIndex = Math.floor(Math.random() * imgs.length);
            const randomItem = imgs[randomIndex];

            return (
              <div className="col-md-4 col-sm-6" key={r.id}>
                <div className="card shadow-sm rounded-4 recipe-card d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={randomItem}
                    className="card-img-top"
                    alt="recipe"
                    style={{
                      height: "160px",
                      width: "120px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      overflow:"visible"
                    }}
                  />

                  <div className="card-body text-center">
                    <h5 className="text-dark fw-bold">{r.name}</h5>
                    <Link
                      to={`/${r.id}`}
                      className="btn fw-bold mt-2"
                      style={{ backgroundColor: "#ffce00", color: "#000" }}
                    >
                       التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HOME;
