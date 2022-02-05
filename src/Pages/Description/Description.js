import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../hooks/useAuth";
const Description = () => {
  const [viewShow, setViewShow] = useState(false);
  const handleShow = () => setViewShow(true);
  const handleCloses = () => setViewShow(false);
  // submit
  const [show, setShow] = useState(false);
  const handleShowSubmit = () => setShow(true);
  const handleClose = () => setShow(false);
  const { logOut, users } = useAuth();
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(
      `https://whispering-woodland-96025.herokuapp.com/tasks?email=${users.email}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [users.email]);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const newData = {
      ...data,
      email: users.email,
      sumbitDate: new Date().toISOString().slice(0, 10),
    };
    axios
      .post("https://whispering-woodland-96025.herokuapp.com/submit", newData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    reset();
  };
  return (
    <div className="container">
      <h1 className="text-primary text-center mt-4">User Dashboard</h1>
      <h5 className="text-center mb-4">My Task</h5>
      <small className="text-center">
        Name: <span className="text-danger fw-bold">{users.displayName}</span>{" "}
        Email: <span className="text-danger fw-bold">{users.email}</span>
      </small>
      {user.map((task, index) => (
        <div className="my-4" key={index}>
          <p>
            Task Details: {task.details.slice(0, 20)}...
            <br />{" "}
            <button className="btn btn-outline-warning" onClick={handleShow}>
              View Details
            </button>
            <Modal show={viewShow} onHide={handleCloses}>
              <Modal.Header closeButton>
                <Modal.Title>Task Description</Modal.Title>
              </Modal.Header>
              <Modal.Body>{task.details}</Modal.Body>
            </Modal>
          </p>
          <p className="text-danger">DeadLine: {task.date}</p>
          {/* task submit option */}
          <button className="btn btn-primary" onClick={handleShowSubmit}>
            Submit
          </button>
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Task Link Submit</label>
            <br />
            <textarea {...register("task")} required />
            <br />
            <input
              className="btn btn-primary my-3"
              value="task send"
              type="submit"
            />
          </form>
        </Modal.Body>
      </Modal>
      <button className="btn btn-outline-danger" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default Description;
