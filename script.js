// script.js

// Select DOM elements
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const pendingList = document.getElementById('pendingList');
const publishedList = document.getElementById('publishedList');

// Arrays to store files
let pendingFiles = [];
let publishedFiles = [];

// Handle file upload
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the selected file
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Add the file to the pending files array
  pendingFiles.push(file);

  // Update the pending list UI
  updatePendingList();

  // Clear the file input
  fileInput.value = '';
});

// Update the Pending List UI
function updatePendingList() {
  // Clear the current list
  pendingList.innerHTML = '';

  // Loop through pending files and create list items
  pendingFiles.forEach((file, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${file.name}</span>
      <button class="approve" onclick="approveFile(${index})">Approve</button>
      <button class="reject" onclick="rejectFile(${index})">Reject</button>
    `;
    pendingList.appendChild(listItem);
  });
}

// Approve a file
function approveFile(index) {
  // Move the file from pending to published
  const file = pendingFiles.splice(index, 1)[0];
  publishedFiles.push(file);

  // Update both lists
  updatePendingList();
  updatePublishedList();
}

// Reject a file
function rejectFile(index) {
  // Remove the file from pending files
  pendingFiles.splice(index, 1);

  // Update the pending list
  updatePendingList();
}

// Update the Published List UI
function updatePublishedList() {
  // Clear the current list
  publishedList.innerHTML = '';

  // Loop through published files and create list items
  publishedFiles.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${file.name}</span>
      <a href="#" onclick="downloadFile('${file.name}')">Download</a>
    `;
    publishedList.appendChild(listItem);
  });
}

// Download a file
function downloadFile(fileName) {
  const file = publishedFiles.find((f) => f.name === fileName);
  const url = URL.createObjectURL(file);

  // Create a temporary anchor element to trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke the URL to free up memory
  URL.revokeObjectURL(url);
}