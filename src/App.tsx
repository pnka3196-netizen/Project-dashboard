import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  owner: string;
  status: "Active" | "Paused" | "Completed";
  lastUpdated: string;
  openTasks: number;
}

interface Task {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate?: string;
}

const mockProjects: Project[] = [
  {
    id: "p-101",
    name: "Agentic Workforce Portal",
    owner: "Anita",
    status: "Active",
    lastUpdated: "2025-10-25T10:30:00Z",
    openTasks: 2,
  },
  {
    id: "p-102",
    name: "Clinical Trials Insight",
    owner: "Rahul",
    status: "Paused",
    lastUpdated: "2025-10-26T16:40:00Z",
    openTasks: 1,
  },
  {
    id: "p-103",
    name: "Disaster Alerts Network",
    owner: "Meera",
    status: "Completed",
    lastUpdated: "2025-10-20T09:10:00Z",
    openTasks: 0,
  },
];

const mockTasks: { [key: string]: Task[] } = {
  "p-101": [
    {
      id: "t-9001",
      title: "Create dark theme tokens",
      status: "In Progress",
      priority: "High",
      assignee: "Vikram",
      dueDate: "2025-11-02",
    },
    {
      id: "t-9002",
      title: "Implement filter bar",
      status: "Todo",
      priority: "Medium",
      assignee: "Anita",
      dueDate: "2025-11-04",
    },
  ],
  "p-102": [
    {
      id: "t-9010",
      title: "Set up mock API",
      status: "Todo",
      priority: "Low",
      assignee: "Rahul",
    },
  ],
  "p-103": [],
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    const statusMap: any = {
      Active: "badge badge-active",
      Paused: "badge badge-paused",
      Completed: "badge badge-completed",
      Done: "badge badge-done",
      "In Progress": "badge badge-in-progress",
      Todo: "badge badge-todo",
      High: "badge badge-high",
      Medium: "badge badge-medium",
      Low: "badge badge-low",
    };
    return statusMap[status] || "badge";
  };

  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => statusFilter === "All" || p.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "lastUpdated") {
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      } else if (sortBy === "openTasks") {
        return b.openTasks - a.openTasks;
      }
      return 0;
    });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setTasks(mockTasks[project.id] || []);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          let newStatus: Task["status"];
          if (task.status === "Todo") newStatus = "In Progress";
          else if (task.status === "In Progress") newStatus = "Done";
          else newStatus = "Todo";
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim() || !selectedProject) return;
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      status: "Todo",
      priority: "Medium",
      assignee: selectedProject.owner,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Projects Dashboard</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </header>

      <main className="main">
        {!selectedProject ? (
          <div>
            <div className="filters">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="openTasks">Open Tasks</option>
              </select>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Open Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                    >
                      <td>{project.name}</td>
                      <td className="owner">{project.owner}</td>
                      <td>
                        <span className={getStatusBadgeClass(project.status)}>
                          {project.status}
                        </span>
                      </td>
                      <td className="date">
                        {formatDate(project.lastUpdated)}
                      </td>
                      <td>{project.openTasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedProject(null)}
              className="back-button"
            >
              ← Back to Projects
            </button>

            <div className="project-detail">
              <h2>{selectedProject.name}</h2>
              <div className="project-info">
                <div className="info-item">
                  <label>Owner</label>
                  <div className="value">{selectedProject.owner}</div>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <div className="value">
                    <span
                      className={getStatusBadgeClass(selectedProject.status)}
                    >
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <label>Last Updated</label>
                  <div className="value">
                    {formatDate(selectedProject.lastUpdated)}
                  </div>
                </div>
                <div className="info-item">
                  <label>Open Tasks</label>
                  <div className="value">{selectedProject.openTasks}</div>
                </div>
              </div>
            </div>

            <div className="tasks-container">
              <h3>Tasks</h3>

              <div className="task-form">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addNewTask()}
                  placeholder="Add a new task..."
                  className="task-input"
                />
                <button onClick={addNewTask} className="add-button">
                  Add
                </button>
              </div>

              <div className="task-list">
                {tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="task-button"
                    >
                      <h4 className="task-title">{task.title}</h4>
                    </button>
                    <div className="task-badges">
                      <span className={getStatusBadgeClass(task.status)}>
                        {task.status}
                      </span>
                      <span className={getStatusBadgeClass(task.priority)}>
                        {task.priority}
                      </span>
                      <span className="task-meta">{task.assignee}</span>
                      {task.dueDate && (
                        <span className="task-meta">
                          Due: {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <p className="empty-state">
                    No tasks yet. Add one to get started!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
