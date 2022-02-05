import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SingleUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("https://whispering-woodland-96025.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://whispering-woodland-96025.herokuapp.com/task", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    reset();
  };
  const navigate = useNavigate();
  const handelback = () => {
    navigate("/admin");
  };
  return (
    <div className="container">
      <h1 className="text-primary text-center my-4">Set Task</h1>
      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th className="text-center">Serial</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Task Info</th>
          </tr>
        </thead>
        <tbody>
          {user.map((us, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{us.displayName}</td>
              <td className="text-center">{us.email}</td>
              <td className="text-center">
                <Button variant="primary" onClick={handleShow}>
                  Set Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Email</label>
              <br />
              <input
                placeholder="Enter your email"
                required
                {...register("email")}
              />
              <br />
              <label>Task Details</label>
              <br />
              <textarea {...register("details")} required />
              <br />
              <label>Deadline</label>
              <br />
              <input type="date" {...register("date")} required />
              <br />
              <input
                className="btn btn-primary my-3"
                value="task send"
                type="submit"
              />
            </form>
          </Modal.Body>
        </Modal>
      </Table>
      <Button variant="danger" onClick={handelback}>
        Back Admin Description
      </Button>
    </div>
  );
};

export default SingleUser;
