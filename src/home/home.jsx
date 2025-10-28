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
           مع مكونات الوصفة
            وطريقة التحضير
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
