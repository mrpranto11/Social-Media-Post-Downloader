function download() {
  const url = document.getElementById('url').value.trim();
  const msg = document.getElementById('msg');

  if (!url) {
    msg.textContent = "Please paste a URL.";
    return;
  }

  fetch('https://your-render-url.onrender.com/api/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success && data.downloadUrl) {
      window.open(data.downloadUrl, '_blank');
    } else {
      msg.textContent = "Error: " + data.message;
    }
  })
  .catch(err => {
    msg.textContent = "Server Error. Try again.";
    console.error(err);
  });
}
