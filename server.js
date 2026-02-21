const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.static('public'));

// Download route
app.get('/download', async (req, res) => {
    const fileUrl = req.query.url;

    if (!fileUrl || !fileUrl.endsWith('.mp4')) {
        return res.status(400).send("Invalid MP4 URL");
    }

    try {
        const response = await axios({
            method: 'GET',
            url: fileUrl,
            responseType: 'stream'
        });

        res.setHeader('Content-Disposition', 'attachment; filename="music.mp4"');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Download failed");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
