import axios from "axios";
import { useEffect, useState } from "react";

function Update() {
  const [description, setDescription] = useState("");
  const [job, setJob] = useState("");
  const [completed, setCompleted] = useState(false);
  var id = "";

  useEffect(() => {
    var url = window.location.href;
    id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get("http://localhost:4000/todos/"+id)
      .then((response) => {
        console.log(response.data);
        setDescription(response.data.todo_description);
        setJob(response.data.todo_job);
        setCompleted(response.data.todo_completed);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    const updatedTodo = {
      todo_description: description,
      todo_job: job,
      todo_completed: completed,
    };

    var url = window.location.href;
    id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .post( `http://localhost:4000/todos/update/${id}`, updatedTodo)
      .then((res) => console.log(res.data));
    window.setTimeout(function () {
      window.location = "http://localhost:3000";
    }, 1000);

  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSetJob = (e) => {
    setJob(e.target.value);
  };

  const onChangeTodoCompleted = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <div>
      <h2 align="center">Update Todo Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description : </label>
          <input
            type="text"
            value={description}
            onChange={handleSetDescription}
            className="form-control"
          />
        </div>
        <br />
        <div className="form-group">
          <label>Job : </label>
          <input
            type="text"
            value={job}
            onChange={handleSetJob}
            className="form-control"
          />
        </div>
        <br />
        <div className="form-check">
      <input 
            className="form-check-input"
            id="completedCheckbox"
            type="checkbox"
            name="completedCheckbox"
            onChange={onChangeTodoCompleted}
            value={completed}
            checked={completed}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
        </div>

        <br />

        <div className="form-group">
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default Update;
