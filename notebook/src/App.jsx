import { LayoutList, NotebookPen } from "lucide-react";
import { useState } from "react";

const App = () => {
  const [heading, setHeading] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const submitForm = () => {
    setError("");

    if (!heading.trim() || !notes.trim()) {
      setError("All fields are required!");
      return;
    }

    if (heading.length > 10) {
      setError("Title must be max 10 characters!");
      return;
    }

    if (notes.length > 100) {
      setError("Description must be max 100 characters!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: heading,
      task: notes,
      date: new Date().toLocaleDateString(),
    };

    setTasks((prev) => [...prev, newTask]);

    setHeading("");
    setNotes("");
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen">
      {/* FORM */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="w-full max-w-md"
        >
          <div className="flex gap-4 items-center mb-4">
            <NotebookPen className="w-16 h-16 text-green-700" />
            <h1 className="text-3xl font-bold text-green-900">Add Task</h1>
          </div>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          {/* TITLE */}
          <input
            type="text"
            maxLength={10}
            placeholder="Task title (max 10)"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full bg-green-100 px-3 py-2 rounded-md mb-1"
          />
          <p className="text-xs text-right text-gray-500 mb-2">
            {heading.length}/10
          </p>

          {/* DESCRIPTION */}
          <textarea
            rows={5}
            maxLength={100}
            placeholder="Description (max 100)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-green-100 px-3 py-2 rounded-md mb-1"
          />
          <p className="text-xs text-right text-gray-500 mb-3">
            {notes.length}/100
          </p>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* TASK LIST */}
      <div className="w-1/2 border-l-2 border-dashed p-4 bg-[#faf3ee] overflow-y-auto">
        <div className="flex justify-center items-center gap-3 mb-4">
          <LayoutList className="w-7 h-7 text-[#582f0e]" />
          <h1 className="text-2xl text-[#582f0e] font-semibold">Your Tasks</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet...</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className="w-64 border-2 border-[#582f0e] rounded-2xl p-2"
              >
                <div className="bg-[#582f0e] text-white rounded-xl p-3 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-white text-[#582f0e] rounded-full flex items-center justify-center font-bold mb-2">
                      {index + 1}
                    </div>

                    <h2 className="text-lg font-semibold text-center">
                      {task.title}
                    </h2>

                    <p className="text-sm mt-2 break-words">{task.task}</p>
                  </div>

                  <p className="text-xs text-right text-[#faf3ee]/60 mt-3">
                    {task.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
