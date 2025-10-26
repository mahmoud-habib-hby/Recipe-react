import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Details() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
const delet=async (id)=>{
  if(window.confirm("هل انت متاكد من حذف الوصفة")){
    axios.delete(`http://127.0.0.1:8000/api/Recipe/${id}`)
    .then(()=>{
      alert("done")
      navigate("/");
    })
    .catch ((err)=>console.log(err))
  }
  
}
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Recipe/${id}`)
      .then((response) => {
        setRecipe(response.data.data || response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>تحميل ...</p>;
  if (error) return <p>فشل التحميل</p>;

  return (
   <div className="container d-flex justify-content-center align-items-center min-vh-100"
  style={{ backgroundColor: "#ffffffff" }}>

      <div className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "500px", width: "100%", backgroundColor: "#ffffffff" }}
      >
      {/* <span style={{direction:"ltr"}}>back</span> */}
      <Link to="/"
      class="material-symbols-outlined" style={{textDecoration:"none",color:"red"}}>
arrow_back
      </Link>
        <h1 className="text-center fw-bold mb-3 text-danger">
          {recipe.name}
        </h1>

        <hr />

        <p className="text-end fs-5">
          <strong className="text-danger">المكونات:</strong><br />
          {recipe.ingredients}
        </p>

        <hr />

        <p className="text-end fs-5">
          <strong className="text-danger">الخطوات:</strong><br />
          {recipe.steps}
        </p>

        <div className="text-center mt-3">
<Link  to={`/update/${recipe.id}`}
  className="btn fw-bold ms-2" 
  style={{ backgroundColor: "#4caf50", color: "#fff" }} 
>
  تعديل
</Link> 

<button 
  className="btn fw-bold" 
  style={{ backgroundColor: "#f44336", color: "#fff" }} 
  onClick={()=>delet(recipe.id)}
>
  حذف
</button>

        </div>
      </div>
    </div>
  );
}

export default Details;
