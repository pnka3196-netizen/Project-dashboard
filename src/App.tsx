import { useState, useEffect } from "react";

// CSS Modules styles
const styles = {
  global: `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
}

:root {
  --bg: #0b0f14;
  --text: #f1f5f9;
  --card: #121821;
  --muted: #cbd5e1;
  --primary: #60a5fa;
  --focus: #22d3ee;
}

.light {
  --bg: #ffffff;
  --text: #0f172a;
  --card: #f8fafc;
  --muted: #475569;
  --primary: #2563eb;
  --focus: #0ea5e9;
}

body {
  background: var(--bg);
  color: var(--text);
}
`,

  app: `
.app {
  min-height: 100vh;
  background-color: var(--bg);
  transition: background-color 0.3s;
}

.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
`,

  header: `
.header {
  background-color: var(--card);
  border-bottom: 1px solid rgba(203, 213, 225, 0.1);
  padding: 1rem 1.5rem;
}

.headerContent {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
}

.themeToggle {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.themeToggle:hover {
  background-color: var(--focus);
}
`,

  filters: `
.filters {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.searchWrapper {
  flex: 1;
  position: relative;
  min-width: 250px;
}

.searchInput {
  width: 100%;
  padding: 15px;
  border: 1px solid rgba(203, 213, 225, 0.2);
  border-radius: 0.5rem;
  background-color: var(--card);
  color: var(--text);
  font-size: 0.875rem;
}

.searchInput:focus {
  outline: none;
  border-color: var(--focus);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
}

.filterSelect {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(203, 213, 225, 0.2);
  border-radius: 0.5rem;
  background-color: var(--card);
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
}

.filterSelect:focus {
  outline: none;
  border-color: var(--focus);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
}
`,

  table: `
.tableContainer {
  background-color: var(--card);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: rgba(203, 213, 225, 0.05);
}

.table th {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table tbody tr {
  border-top: 1px solid rgba(203, 213, 225, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
}

.table tbody tr:hover {
  background-color: rgba(203, 213, 225, 0.05);
}

.table td {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: var(--text);
}

.table td.owner,
.table td.date {
  color: var(--muted);
}
`,

  badge: `
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

.badgeActive {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.light .badgeActive {
  background-color: #d1fae5;
  color: #065f46;
}

.badgePaused {
  background-color: rgba(251, 191, 36, 0.2);
  color: #fde68a;
}

.light .badgePaused {
  background-color: #fef3c7;
  color: #92400e;
}

.badgeCompleted {
  background-color: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.light .badgeCompleted {
  background-color: #dbeafe;
  color: #1e40af;
}

.badgeTodo {
  background-color: rgba(148, 163, 184, 0.2);
  color: #cbd5e1;
}

.light .badgeTodo {
  background-color: #f3f4f6;
  color: #374151;
}

.badgeInProgress {
  background-color: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.light .badgeInProgress {
  background-color: #dbeafe;
  color: #1e40af;
}

.badgeDone {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.light .badgeDone {
  background-color: #d1fae5;
  color: #065f46;
}

.badgeHigh {
  background-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.light .badgeHigh {
  background-color: #fee2e2;
  color: #991b1b;
}

.badgeMedium {
  background-color: rgba(251, 146, 60, 0.2);
  color: #fdba74;
}

.light .badgeMedium {
  background-color: #fed7aa;
  color: #9a3412;
}

.badgeLow {
  background-color: rgba(148, 163, 184, 0.2);
  color: #cbd5e1;
}

.light .badgeLow {
  background-color: #f3f4f6;
  color: #374151;
}
`,

  projectDetail: `
.backButton {
  margin-bottom: 1.5rem;
  color: var(--primary);
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
}

.backButton:hover {
  color: var(--focus);
}

.projectDetail {
  background-color: var(--card);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.projectDetail h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.projectInfo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.infoItem label {
  display: block;
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 0.25rem;
}

.infoItem .value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
}
`,

  tasks: `
.tasksContainer {
  background-color: var(--card);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
}

.tasksContainer h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.taskForm {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.taskInput {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(203, 213, 225, 0.2);
  border-radius: 0.5rem;
  background-color: var(--card);
  color: var(--text);
  font-size: 0.875rem;
}

.taskInput:focus {
  outline: none;
  border-color: var(--focus);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
}

.addButton {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.addButton:hover {
  background-color: var(--focus);
}

.taskList {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.taskItem {
  border: 1px solid rgba(203, 213, 225, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: border-color 0.2s;
}

.taskItem:hover {
  border-color: var(--muted);
}

.taskButton {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.taskTitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.taskButton:hover .taskTitle {
  color: var(--primary);
}

.taskBadges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.taskMeta {
  color: var(--muted);
  font-size: 0.75rem;
}

.emptyState {
  text-align: center;
  color: var(--muted);
  padding: 2rem;
}
`,
};

// Inject all styles
const styleElement = document.createElement("style");
styleElement.textContent = Object.values(styles).join("\n");
document.head.appendChild(styleElement);

function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

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
  const { dark, toggle } = useDarkMode();
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [newTaskTitle, setNewTaskTitle] = useState("");

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
      Active: "badge badgeActive",
      Paused: "badge badgePaused",
      Completed: "badge badgeCompleted",
      Done: "badge badgeDone",
      "In Progress": "badge badgeInProgress",
      Todo: "badge badgeTodo",
      High: "badge badgeHigh",
      Medium: "badge badgeMedium",
      Low: "badge badgeLow",
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
        <div className="headerContent">
          <h1>Projects Dashboard</h1>
          <button onClick={toggle} className="themeToggle">
            {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </header>

      <main className="main">
        {!selectedProject ? (
          <div>
            <div className="filters">
              <div className="searchWrapper">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="searchInput"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filterSelect"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filterSelect"
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="openTasks">Open Tasks</option>
              </select>
            </div>

            <div className="tableContainer">
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
              className="backButton"
            >
              Back to Projects
            </button>

            <div className="projectDetail">
              <h2>{selectedProject.name}</h2>
              <div className="projectInfo">
                <div className="infoItem">
                  <label>Owner</label>
                  <div className="value">{selectedProject.owner}</div>
                </div>
                <div className="infoItem">
                  <label>Status</label>
                  <div className="value">
                    <span
                      className={getStatusBadgeClass(selectedProject.status)}
                    >
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <div className="infoItem">
                  <label>Last Updated</label>
                  <div className="value">
                    {formatDate(selectedProject.lastUpdated)}
                  </div>
                </div>
                <div className="infoItem">
                  <label>Open Tasks</label>
                  <div className="value">{selectedProject.openTasks}</div>
                </div>
              </div>
            </div>

            <div className="tasksContainer">
              <h3>Tasks</h3>

              <div className="taskForm">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addNewTask()}
                  placeholder="Add a new task..."
                  className="taskInput"
                />
                <button onClick={addNewTask} className="addButton">
                  Add
                </button>
              </div>

              <div className="taskList">
                {tasks.map((task) => (
                  <div key={task.id} className="taskItem">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="taskButton"
                    >
                      <h4 className="taskTitle">{task.title}</h4>
                    </button>
                    <div className="taskBadges">
                      <span className={getStatusBadgeClass(task.status)}>
                        {task.status}
                      </span>
                      <span className={getStatusBadgeClass(task.priority)}>
                        {task.priority}
                      </span>
                      <span className="taskMeta">{task.assignee}</span>
                      {task.dueDate && (
                        <span className="taskMeta">
                          Due: {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <p className="emptyState">
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
