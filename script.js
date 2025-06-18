let allBatches = []; // Store all batches for search functionality

async function loadBatches() {
  const response = await fetch('./batch.json');
  const data = await response.json();
  allBatches = data;  // Store the fetched batches for later search
  displayBatches(data); // Initially display all batches
}

// Function to display batch cards
function displayBatches(batches) {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Clear previous cards

  if (batches.length === 0) {
    container.innerHTML = '<p>No batches found</p>'; // Show message if no batches are found
  }

  batches.forEach(batch => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url(${batch.batch_banner})`;

    card.innerHTML = `
      <div class="card-overlay">
        <div>
          <div class="card-title">${batch.batch_name}</div>
          <div class="card-info">Class: ${batch.batch_class}</div>
          <div class="card-info">Exam: ${batch.batch_exam}</div>
        </div>
        <button class="copy-btn" onclick="copyToClipboard('${batch.batch_id}')">Copy Batch ID</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Function to search batches based on batch name
function searchBatches() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  
  // Filter the batches based on batch name (case-insensitive)
  const filteredBatches = allBatches.filter(batch => 
    batch.batch_name.toLowerCase().includes(searchTerm)
  );
  
  // Display the filtered batches
  displayBatches(filteredBatches);
}

// Function to copy batch ID to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Batch ID copied: " + text);
  });
}

loadBatches();
