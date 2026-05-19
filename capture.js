const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static(__dirname));

const server = app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  
  const projects = [
    { url: `http://localhost:${port}/CIPT/index.html`, name: 'cipt-screen.png' },
    { url: `http://localhost:${port}/carbon-footprint-platform-main/dist/index.html`, name: 'carbon-screen.png' },
    { url: `http://localhost:${port}/Carbon-Footprint-Results-main/Carbon-Footprint-Results-main/index.html`, name: 'results-screen.png' },
    { url: `http://localhost:${port}/flashcards-game-main/index.html`, name: 'flashcards-screen.png' },
    { url: `http://localhost:${port}/Altahera-Management-System/index.html`, name: 'altahera-screen.png' },
    { url: `http://localhost:${port}/radiance-ris-main/dist/index.html`, name: 'radiance-screen.png' },
  ];

  if (!fs.existsSync(path.join(__dirname, 'assets', 'screenshots'))) {
    fs.mkdirSync(path.join(__dirname, 'assets', 'screenshots'), { recursive: true });
  }

  for (const project of projects) {
    try {
      console.log(`Capturing ${project.name}...`);
      await page.goto(project.url, { waitUntil: 'networkidle0', timeout: 30000 });
      // wait a bit for animations
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(__dirname, 'assets', 'screenshots', project.name) });
      console.log(`Saved ${project.name}`);
    } catch (e) {
      console.error(`Failed to capture ${project.name}: ${e.message}`);
    }
  }

  await browser.close();
  server.close();
});
