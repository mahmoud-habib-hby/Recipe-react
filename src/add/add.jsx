import axios from "axios";
import { useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
function ADDRECIPE(){
const [name,setname]=useState("");
const [ingredients,setingredients]=useState("");
const [steps,setsteps]=useState("");
const Navigate=useNavigate();
const ADD= async (e)=>{
    e.preventDefault();
    try{
        const res= await axios.post('http://127.0.0.1:8000/api/Recipe',{
            name,
            ingredients,
            steps
        });
        console.log(res);
        setname("");
        setingredients("");
        setsteps("");
        Navigate("/")
    }catch(err){
        console.log(err)
    }
}
return (
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
          <Link to="/"
      className="material-symbols-outlined" style={{padding:"10px",textDecoration:"none",color:"red"}}>
arrow_back
      </Link>
      <div className="card-body p-4">

        <h2 className="text-center fw-bold mb-4 text-dark">
          إضافة وصفة جديدة 🍽️
        </h2>

        <form onSubmit={ADD}>

          <div className="mb-3 text-end">
            <label className="form-label fw-semibold">اسم الوصفة</label>
            <input
              type="text"
              className="form-control p-3"
              value={name}
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
            إضافة الوصفة
          </button>

        </form>
      </div>
    </div>
  </div>
);

}

export default ADDRECIPE;