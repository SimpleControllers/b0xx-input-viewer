# b0xx-input-viewer

The B0XX Input Viewer uses electron-serialport and is derived from one if its examples.  

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone "https://github.com/SimpleControllers/b0xx-input-viewer/"
# Go into the repository
cd b0xx-input-viewer
# Install dependencies
npm install
# Run the app
npm start
```

This app may be used by third parties with disclosure.  It is easy to change the background by simply changing bg.png.  Layout changes are done by changing the images (assigned to each button) as they are just layered and shown and masked accordingly.  By default it works with B0XX Controller device and vendor ids (the code will have to be changed accordingly to accomodate for different ones).
