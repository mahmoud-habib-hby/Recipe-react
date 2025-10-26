import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UPDATE(){
    const [name,setname]=useState("");
    const [ingredients,setingredients]=useState("");
    const [steps,setsteps]=useState("");
    const {id}=useParams();
    const navigate = useNavigate();

    const update=(e)=>{
    e.preventDefault();
      axios.put(`http://127.0.0.1:8000/api/Recipe/${id}`,{
        name,
        ingredients,
        steps
      })
      .then(()=>{
navigate(`/${id}`);

      })
      .catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
             axios.get(`http://127.0.0.1:8000/api/Recipe/${id}`)
            .then((res)=>{
                setname(res.data.data.name)
                setingredients(res.data.data.ingredients)
                setsteps(res.data.data.steps)
                console.log(res.data.data)
            })
            .catch ((err)=>console.log(err))
    },[id])
    return(
 <div
    className="d-flex justify-content-center align-items-center min-vh-100 p-3"
    style={{
      background: "linear-gradient(135deg, #2E7D32, #66BB6A)"
    }}
  >
    <div
      className="card shadow-lg rounded-4 border-0"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <div className="card-body p-4">
      <Link to={`/${id}`}
      class="material-symbols-outlined" style={{textDecoration:"none",color:"red" , direction:"ltr",width:"100%"}}>
arrow_back
      </Link>
        <h2 className="text-center fw-bold mb-4 text-dark">
            تعديل الوصفة
        </h2>

        <form onSubmit={update}>

          <div className="mb-3 text-end">
            <label className="form-label fw-semibold">اسم الوصفة</label>
            <input
              type="text"
              className="form-control p-3"
              value={name || ""}
              placeholder="مثال: مكرونة بالبشاميل"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="mb-3 text-end">
            <label className="form-label fw-semibold">المكونات</label>
            <input
              type="text"
              className="form-control p-3"
              value={ingredients}
              placeholder="مثال: دجاج، بصل، ملح..."
              onChange={(e) => setingredients(e.target.value)}
            />
          </div>

          <div className="mb-4 text-end">
            <label className="form-label fw-semibold">الخطوات</label>
            <input
              type="text"
              className="form-control p-3"
              value={steps}
              placeholder=" خطوات التحضير "
              onChange={(e) => setsteps(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-bold fs-5"
            style={{
              backgroundColor: "#FF7043",
              color: "#fff",
              borderRadius: "10px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E64A19")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF7043")}
          >
            تعديل
          </button>

        </form>
      </div>
    </div>
  </div>
    );
    
    
}
export default UPDATE;