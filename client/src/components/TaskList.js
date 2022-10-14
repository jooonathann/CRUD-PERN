import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function TaskList() {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const loadTask = async () => {
    const response = await fetch("http://localhost:3001/task");

    const data = await response.json();
    setTask(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/task/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    setTask(task.filter((e) => e.id !== id));
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1> Task List</h1>
      {task.map((e) => (
        <Card
          style={{
            marginBottom: "1.7rem",
            backgroundColor: "#1e272e",
          }}
          key={e.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{e.title}</Typography>
              <Typography>{e.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/task/${e.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(e.id)}
                style={{
                  margin: ".5rem",
                }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
