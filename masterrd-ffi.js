/**
 * FFI wrapper for MasterRD.dll - Mifare RFID Card Reader
 * This module provides low-level bindings to the native MasterRD.dll library
 */

const ffi = require('ffi-napi');
const ref = require('ref-napi');
const ArrayType = require('ref-array-di')(ref);

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
const MasterRD = ffi.Library('MasterRD.dll', {
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
   * Select card and read serial number (S70 card)
   * @param {byte} icdev - Device number (default: 0)
   * @param {Buffer} pData - Buffer to receive card serial data
   * @param {Buffer} retLen - Pointer to byte that receives data length
   * @returns {int} 0 on success
   */
  'rf_s70_select': [int, [byte, ByteArray, BytePointer]],

  /**
   * Read block using specified key (S70)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} ReadMode - Read mode (0: blocks 0-31, 1: blocks 32-38, 2: all)
   * @param {byte} address - Block address to read
   * @param {byte} KeyMode - Key mode (0x60: Key A, 0x61: Key B)
   * @param {Buffer} Key - 6-byte key
   * @param {Buffer} pData - Buffer to receive block data
   * @param {Buffer} retLen - Pointer to ulong that receives data length
   * @returns {int} 0 on success
   */
  'rf_s70_read': [int, [byte, byte, byte, byte, ByteArray, ByteArray, UlongPointer]],

  /**
   * Write block using specified key (S70)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} WriteMode - Write mode (0: blocks 0-31, 1: blocks 32-38, 2: all)
   * @param {byte} address - Block address to write
   * @param {byte} KeyMode - Key mode (0x60: Key A, 0x61: Key B)
   * @param {Buffer} Key - 6-byte key
   * @param {Buffer} pData - 16-byte data to write
   * @param {ulong} retLen - Length of data to write
   * @returns {int} 0 on success
   */
  'rf_s70_write': [int, [byte, byte, byte, byte, ByteArray, ByteArray, ulong]],

  /**
   * Write key to reader's EEPROM (key group storage)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} block - Key group index (0-31)
   * @param {Buffer} Key - 6-byte key data
   * @returns {int} 0 on success
   */
  'rf_M1_WriteKeyToEE2': [int, [byte, byte, ByteArray]],

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
  'rf_M1_read': [int, [byte, byte, ByteArray, UlongPointer]],

  /**
   * Write block using key group (must call rf_M1_authentication1 or rf_M1_authentication2 first)
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} block - Block number to write
   * @param {Buffer} pData - 16-byte data to write
   * @returns {int} 0 on success
   */
  'rf_M1_write': [int, [byte, byte, ByteArray]],

  /**
   * Select M1 card and read serial number
   * @param {byte} icdev - Device number (default: 0)
   * @param {Buffer} pData - Buffer to receive card serial data
   * @param {Buffer} pLen - Pointer to ulong that receives data length
   * @returns {int} 0 on success
   */
  'rf_select1': [int, [byte, ByteArray, UlongPointer]],

  /**
   * Authenticate M1 card block with direct key
   * @param {byte} icdev - Device number (default: 0)
   * @param {byte} KeyMode - Key mode (0x60: Key A, 0x61: Key B)
   * @param {byte} block - Block number to authenticate
   * @param {Buffer} key - 6-byte key
   * @returns {int} 0 on success
   */
  'rf_M1_authentication2': [int, [byte, byte, byte, ByteArray]],

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
