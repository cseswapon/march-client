import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const SingleRoute = () => {
  const [single, setSingle] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    fetch(`https://whispering-woodland-96025.herokuapp.com/submit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          alert("Update Successfully");
        }
      });
    reset();
  };
  useEffect(() => {
    fetch(`https://whispering-woodland-96025.herokuapp.com/submit/${id}`)
      .then((res) => res.json())
      .then((data) => setSingle(data));
  }, [id]);
  const navigate = useNavigate();
  const history = () => {
    navigate("/admin/alltask");
  };
  return (
    <div className="container">
      <h6 className="my-4">Edit Content {id}</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Task Link Submit</label>
        <br />
        {single[0]?.task && (
          <textarea
            defaultValue={single[0]?.task}
            {...register("task")}
            required
          />
        )}
        <br />
        <input className="btn btn-primary my-3" value="Save" type="submit" />
      </form>
      <button className="btn btn-primary" onClick={history}>
        Back
      </button>
    </div>
  );
};

export default SingleRoute;
