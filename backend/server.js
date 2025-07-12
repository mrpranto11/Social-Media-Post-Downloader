const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/download', (req, res) => {
  const { url } = req.body;

  if (!url) return res.json({ success: false, message: "No URL provided" });

  // Example for YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const command = `yt-dlp -f best -g ${url}`;
    exec(command, (err, stdout, stderr) => {
      if (err) return res.json({ success: false, message: "Download failed" });

      return res.json({ success: true, downloadUrl: stdout.trim() });
    });
  } else {
    return res.json({ success: false, message: "Unsupported platform yet" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
