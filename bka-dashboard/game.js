// Initialize progress
let progress = {
  operational: 0,
  branding: 0,
  business: 0
};

// Update task and progress bar
function updateTask(category, points) {
  const progressBar = document.getElementById(`progress-${category}`);
  const tasksList = document.getElementById(`tasks-${category}`);
  
  // Update progress
  progress[category] = Math.min(100, progress[category] + points);
  progressBar.style.width = `${progress[category]}%`;

  // Remove the completed task
  const taskItem = event.target.parentNode;
  tasksList.removeChild(taskItem);

  alert(`${category.toUpperCase()} progress updated to ${progress[category]}%!`);
}
