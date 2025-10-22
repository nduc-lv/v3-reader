/**
 * FFI wrapper for MasterRD.dll - Mifare RFID Card Reader
 * This module provides low-level bindings to the native MasterRD.dll library
 */

const ffi = require('ffi-napi');
const ref = require('ref-napi');
const ArrayType = require('ref-array-di')(ref);
const path = require("path");
const os = require("os");

// Set DLL search path before loading the library
const dllDir = __dirname;

// On Windows, add the current directory to the DLL search path
if (os.platform() === 'win32') {
  // This tells Windows to search the current directory for dependent DLLs
  process.env.PATH = dllDir + path.delimiter + process.env.PATH;
}

// Define types
const ushort = ref.types.ushort;
const byte = ref.types.byte;
const int = ref.types.int;
const ulong = ref.types.uint64;
const ByteArray = ArrayType(byte);
const UlongPointer = ref.refType(ulong);
const BytePointer = ref.refType(byte);

/**
 * MasterRD.dll function bindings
 * All functions return 0 on success
 */
console.log('Loading MasterRD from:', path.join(__dirname, 'MasterRD_x64.dll'));
console.log('Current PATH:', process.env.PATH);

const MasterRD = ffi.Library(path.join(__dirname, 'MasterRD_x64.dll'), {
  /**
   * Open serial port
   * @param {ushort} port - COM port number
   * @param {ushort} baud - Baud rate (typically 19200)
   * @returns {int} 0 on success
   */
  'rf_init_com': [int, [ushort, ushort]],

  /**
   * Close opened serial port
   * @returns {int} 0 on success
   */
  'rf_ClosePort': [int, []],

  /**
   * Authenticate block with key stored in reader (M1 card)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} KeyMode - Key mode (0x60: Key A, 0x61: Key B)
   * @param {byte} block - Block number to authenticate
   * @param {byte} secnr - Key group index (0-31)
   * @returns {int} 0 on success
   */
  'rf_M1_authentication1': [int, [byte, byte, byte, byte]],

  /**
   * Read block using key group (must call rf_M1_authentication1 first)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} block - Block number to read
   * @param {Buffer} pData - Buffer to receive block data
   * @param {Buffer} pLen - Pointer to ulong that receives data length
   * @returns {int} 0 on success
   */
  'rf_M1_read': [int, [byte, byte, BytePointer, UlongPointer]],

  /**
   * Write block using key group (must call rf_M1_authentication1 or rf_M1_authentication2 first)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} block - Block number to write
   * @param {Buffer} pData - 16-byte data to write
   * @returns {int} 0 on success
   */
  'rf_M1_write': [int, [byte, byte, BytePointer]],

  /**
   * Authenticate M1 card block with direct key
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} KeyMode - Key mode (0x60: Key A, 0x61: Key B)
   * @param {byte} block - Block number to authenticate
   * @param {Buffer} key - 6-byte key
   * @returns {int} 0 on success
   */
  'rf_M1_authentication2': [int, [byte, byte, byte, BytePointer]],

  /**
   * Control LED lights on reader
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} color - LED color (0: off, 1: red, 2: green, 3: all)
   * @returns {int} 0 on success
   */
  'rf_light': [int, [byte, byte]],

  /**
   * Make reader beep
   * @param {byte} icdev - Device number (default: 0)
   * @param {int} msec - Duration in milliseconds
   * @returns {int} 0 on success
   */
  'rf_beep': [int, [byte, int]]
});

module.exports = {
  MasterRD,
  ref,
  ByteArray,
  UlongPointer,
  BytePointer
};
