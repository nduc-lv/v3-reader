const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require("path");
const os = require("os");

// Set DLL search path
const dllDir = __dirname;
if (os.platform() === 'win32') {
  process.env.PATH = dllDir + path.delimiter + process.env.PATH;
}

const int = ref.types.int;
const ushort = ref.types.ushort;
const byte = ref.types.byte;
const uint64 = ref.types.uint64;
const BytePointer = ref.refType(byte);
const UlongPointer = ref.refType(uint64);

// Test loading functions one by one
const functions = [
  { name: 'rf_init_com', sig: [int, [ushort, ushort]] },
  { name: 'rf_ClosePort', sig: [int, []] },
  { name: 'rf_s70_select', sig: [int, [byte, BytePointer, BytePointer]] },
  { name: 'rf_s70_read', sig: [int, [byte, byte, byte, byte, BytePointer, BytePointer, UlongPointer]] },
  { name: 'rf_s70_write', sig: [int, [byte, byte, byte, byte, BytePointer, BytePointer, uint64]] },
  { name: 'rf_M1_WriteKeyToEE2', sig: [int, [byte, byte, BytePointer]] },
  { name: 'rf_M1_authentication1', sig: [int, [byte, byte, byte, byte]] },
  { name: 'rf_M1_read', sig: [int, [byte, byte, BytePointer, UlongPointer]] },
  { name: 'rf_M1_write', sig: [int, [byte, byte, BytePointer]] },
  { name: 'rf_select1', sig: [int, [byte, BytePointer, UlongPointer]] },
  { name: 'rf_M1_authentication2', sig: [int, [byte, byte, byte, BytePointer]] },
  { name: 'rf_light', sig: [int, [byte, byte]] },
  { name: 'rf_beep', sig: [int, [byte, int]] }
];

console.log('Testing function loads...\n');

for (const func of functions) {
  try {
    const lib = ffi.Library(path.join(__dirname, 'MasterRD_x64.dll'), {
      [func.name]: func.sig
    });
    console.log(`✓ ${func.name}`);
  } catch (e) {
    console.log(`✗ ${func.name} - ${e.message}`);
  }
}
