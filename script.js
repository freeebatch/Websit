async function loadBatches() {
  const response = await fetch('./batch.json');
  const data = await response.json();
  const container = document.getElementById('cards-container');

  data.forEach(batch => {
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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Batch ID copied: " + text);
  });
}

loadBatches();
