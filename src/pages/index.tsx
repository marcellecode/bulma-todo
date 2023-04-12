import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";
import { Todo } from "@/utils/types";

interface IndexProps {
  tasks: Array<Todo>;
  url: string;
}

export default function Home(props: IndexProps) {
  const [isOpen, setOpen] = useState(false);
  const [priority, setPriority] = useState(1);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskList, setTaskList] = useState([]);

  const { tasks } = props;

  const submitForm = async () => {
    let todo: Todo = { task: taskTitle, completed: false, priority: priority };
    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data)
      })
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">Hi Marcelle!</p>
          <p className="subtitle">You have {tasks.length} pending tasks.</p>
          <button
            className="button is-primary is-light"
            onClick={() => setOpen(!isOpen)}
          >
            Create new Task
          </button>
        </div>
      </section>

      <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create Task</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setOpen(!isOpen)}
            ></button>
          </header>
          <section className="modal-card-body">
            <h5 className="title is-5">Task</h5>
            <input
              className="input is-primary"
              type="text"
              placeholder="Primary input"
              onChange={(event) => setTaskTitle(event.target.value)}
            />
            <div className="select is-primary">
              <select
                onChange={(event) => setPriority(parseInt(event.target.value))}
              >
                <option defaultValue={0}>Selecione o nível de prioridade</option>
                <option value={3}>Alta</option>
                <option value={2}>Media</option>
                <option value={1}>Baixa</option>
              </select>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => submitForm()}>
              Save
            </button>
          </footer>
        </div>
      </div>

    {taskList.map((item) =>(
      <div className="box" key={item._id}>
        {item.task}
     </div>
    ))}
      
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL as string);
  const tasks = await res.json();
  const url = process.env.API_URL;

  return {
    props: { tasks, url },
  };
}
