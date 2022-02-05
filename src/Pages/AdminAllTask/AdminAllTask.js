import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
const AdminAllTask = () => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    fetch("https://whispering-woodland-96025.herokuapp.com/submit")
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, []);
  const handeldelet = (id) => {
    fetch(`https://whispering-woodland-96025.herokuapp.com/submit/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const promise = window.confirm("Are Your Sure Deleted");
        if (promise) {
          const remove = task.filter((re) => re._id !== id);
          setTask(remove);
        }
      });
  };
  const navigate = useNavigate();
  const edit = (id) => {
    navigate(`single/${id}`);
  };
  return (
    <div className="container">
      <h1 className="text-center my-4">Submit All Task</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Serial</th>
            <th className="text-center">Email</th>
            <th className="text-center">Task Info</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {task.map((tsk, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{tsk.email}</td>
              <td className="text-center">{tsk.task}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => edit(tsk._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handeldelet(tsk._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminAllTask;
