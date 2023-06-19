const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
const basex = [0, 1400, 0, 250, 500, 750, 1000, 1250, 1500, 0, 1300],
  basey = [200, 500, 40, 700, 40, 700, 40, 700, 40, 40, 40],
  dirx = [1, -1, 0, 0, 0, 0, 0, 0, 0, 1, -1],
  diry = [0, 0, 1, -1, 1, -1, 1, -1, 1, 1, 1],
  tim = [2500, 2500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500],
  tim2 = [150, 150, 150, 150, 150, 150, 150, 150, 300, 200, 200],
  k = [15, 15, 10, 10, 10, 10, 10, 10, 10],
  r = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
const createWindow = (i, j) => {
  // Create the browser window.
  const Window1 = new BrowserWindow({
    width: 300,
    height: 200,
    x: basex[i] + j * r[i] * dirx[i],
    y: basey[i] + j * r[i] * diry[i],
    autoHideMenuBar: true,
    thickFrame: true,
    resizable: false,
  });

  // and load the index.html of the app.
  const val = Math.floor(Math.random() * 3);
  if (val == 0) Window1.loadFile(path.join(__dirname, "index.html"));
  else if (val == 1) Window1.loadFile(path.join(__dirname, "index2.html"));
  else Window1.loadFile(path.join(__dirname, "index3.html"));
  return Window1;
};
const circle = (i, j) => {
  // Create the browser window.
  let X = Math.floor(270 * Math.cos((i * Math.PI) / 180) + 650),
    Y = Math.floor(270 * Math.sin((i * Math.PI) / 180) + 320);
  //console.log(`x=${X},y=${Y}`);

  const Window1 = new BrowserWindow({
    width: 300,
    height: 200,
    x: X,
    y: Y,
    autoHideMenuBar: true,
    thickFrame: true,
    resizable: false,
  });

  // and load the index.html of the app.
  const val = Math.floor(Math.random() * 3);
  if (val == 0) Window1.loadFile(path.join(__dirname, "index.html"));
  else if (val == 1) Window1.loadFile(path.join(__dirname, "index2.html"));
  else Window1.loadFile(path.join(__dirname, "index3.html"));
  return Window1;
};
const SIN = (i, j) => {
  // Create the browser window.
  let X = i,
    Y = Math.floor(70 * Math.sin((i * Math.PI) / 180) + 650);
  if (Y > 650) Y = 1300 - Y;
  //console.log(`x=${X},y=${Y}`);

  const Window1 = new BrowserWindow({
    width: 300,
    height: 200,
    x: X,
    y: Y,
    autoHideMenuBar: true,
    thickFrame: true,
    resizable: false,
  });

  // and load the index.html of the app.
  Window1.loadFile(path.join(__dirname, "index.html"));
  return Window1;
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 10000; j++);
  }
  for (let j = 0; j < 8; j++)
    for (let i = 0; i < k[j]; i++) {
      const w = createWindow(j, i);

      setTimeout(() => {
        w.close();
      }, tim[j]);

      await new Promise((r) => setTimeout(r, tim2[j]));
    }
  for (let j = 0; j < 10; j++) {
    const w = createWindow(9, j);
    const w2 = createWindow(10, j);
    setTimeout(() => {
      w.close();
      w2.close();
    }, tim[9]);

    await new Promise((r) => setTimeout(r, tim2[9]));
  }
  for (let i = 0; i <= 360; i += 6) {
    const w = circle(i, 0);

    setTimeout(() => {
      w.close();
    }, 7300);

    await new Promise((r) => setTimeout(r, 50));
  }
  let ans = 0;
  for (let i = 0; i < 300000; i++) {
    for (let j = 0; j < 10000; j++) ans++;
  }
  for (let i = 0; i <= 1530; i += 18) {
    const w = SIN(i, 0);
    setTimeout(() => {
      w.close();
    }, 2000);
    await new Promise((r) => setTimeout(r, 50));
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
