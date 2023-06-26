
//const SerialPort = require('serialport')
//var serialport = require("serialport");
//var SerialPort = serialport.SerialPort;

//const SerialPort = require('serialport');

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

//const Readline = SerialPort.parsers.Readline;
//const { dialog } = require('electron')

/**
 * List of valid B0XX ports.
 */
const validDevices = [
  { vendorId: "2341", productId: "8036" },
  { vendorId: "2E8A", productId: "102F" },
  { vendorId: "045E", productId: "02A1" },
  { vendorId: "0738", productId: "4726" }
];

/**
 * Finds a valid port amongst the list of given ports.
 */
function findValidPort(ports) {
  for (const port of ports) {
    const vendorId = port.vendorId.toLowerCase();
    const productId = port.productId.toLowerCase();
    for (const validDevice of validDevices) {
      // Case-insensitive check
      if (validDevice.vendorId.toLowerCase() === vendorId && validDevice.productId.toLowerCase() === productId) {
        return port;
      }
    }
  }
}

function serialCon(){
  SerialPort.list().then(ports => {
    const port = findValidPort(ports);

    if (!port) {
      console.log("B0XX Not Found")
      //console.log(dialog.showMessageBox(mainWindow, {message: "B0XX Not Found"}))
      //const response = dialog.showMessageBox(null);
      //console.log(response);
      document.getElementById('recon').style.visibility='visible';
    }
    else {
      console.log("B0XX Found")
      console.log(port)
      console.log(port.vendorId)
      const comport = port.path;
      console.log(comport)

      try{
        const myPort = new SerialPort({
          path: comport,
          baudRate: 115200
          //delimiter: '\n'
          //parser: SerialPort.parsers.readline('\n')
        });

        const parser = myPort.pipe(new ReadlineParser({delimiter: '\n'}))
        parser.on('data', onData);
        myPort.on('close', onClose);
        document.getElementById('recon').style.visibility='hidden';
      }

      catch (err){
        console.log("issue opening comport");
      }

    }
  })
}

document.getElementById("recon").addEventListener("click", reconButton);
serialCon();

function reconButton(){
  serialCon();
}

function onData(data){
  //console.log(data);
  //if(data.charAt(0) === '1')document.getElementById('abtn').style.visibility='visible';
  //else document.getElementById('abtn').style.visibility='hidden';
  showhide('stbtn', data.charAt(0));
  showhide('ybtn', data.charAt(1));
  showhide('xbtn', data.charAt(2));
  showhide('bbtn', data.charAt(3));
  showhide('abtn', data.charAt(4));
  showhide('lbtn', data.charAt(5));
  showhide('rbtn', data.charAt(6));
  showhide('zbtn', data.charAt(7));
  showhide('upbtn', data.charAt(8));
  showhide('dnbtn', data.charAt(9));
  showhide('rtbtn', data.charAt(10));
  showhide('ltbtn', data.charAt(11));
  showhide('m1btn', data.charAt(12));
  showhide('m2btn', data.charAt(13));
  showhide('clbtn', data.charAt(14));
  showhide('crbtn', data.charAt(15));
  showhide('cubtn', data.charAt(16));
  showhide('cdbtn', data.charAt(17));
  showhide('lsbtn', data.charAt(18));
  showhide('msbtn', data.charAt(19));
  showhide('r2', data.charAt(23));
}

function showhide(imgname, vis){
  if(vis === '1')document.getElementById(imgname).style.visibility='visible';
  else document.getElementById(imgname).style.visibility='hidden';
}

function onClose(){
  //console.log('Closed')
  document.getElementById('recon').style.visibility='visible';
}
