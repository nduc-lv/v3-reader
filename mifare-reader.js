/**
 * Mifare RFID Card Reader - High-Level API
 * Node.js equivalent of Reader_S70.cs
 */

const { MasterRD, ref, ByteArray, UlongPointer, BytePointer } = require('./masterrd-ffi');

/**
 * Read/Write mode enumeration
 */
const ReadWriteMode = {
  READ_0_TO_31: 0,    // Read blocks 0-31
  READ_32_TO_38: 1,   // Read blocks 32-38
  READ_ALL: 2         // Read all blocks
};

/**
 * Key mode enumeration
 */
const KeyMode = {
  KEY_A: 0x60,  // Key A
  KEY_B: 0x61   // Key B
};

/**
 * LED color enumeration
 */
const LightColor = {
  CLOSE_LED: 0x00,  // Turn off all LEDs
  RED_LED: 0x01,    // Red LED
  GREEN_LED: 0x02,  // Green LED
  ALL_LED: 0x03     // All LEDs on
};

class MifareReader {
  constructor() {
    this.isOpen = false;
  }

  /**
   * Convert hex string to byte array
   * @param {string} hexString - Hex string (e.g., "FFFFFFFFFFFF")
   * @returns {Buffer} Byte buffer
   */
  hexStringToBuffer(hexString) {
    if (!hexString || hexString.length % 2 !== 0) {
      throw new Error('Invalid hex string length');
    }

    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return Buffer.from(bytes);
  }

  /**
   * Convert byte array to hex string
   * @param {Buffer} buffer - Byte buffer
   * @param {number} length - Number of bytes to convert
   * @returns {string} Hex string
   */
  bufferToHexString(buffer, length = buffer.length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += buffer[i].toString(16).toUpperCase().padStart(2, '0');
    }
    return result;
  }

  /**
   * Get 6-byte key from hex string
   * @param {string} keyString - 12-character hex string
   * @returns {Buffer} 6-byte key buffer
   */
  getKeyData(keyString) {
    const keyBuffer = this.hexStringToBuffer(keyString);
    if (keyBuffer.length !== 6) {
      throw new Error('Key must be 6 bytes (12 hex characters)');
    }
    return keyBuffer;
  }

  /**
   * Get 16-byte block data from hex string
   * @param {string} blockString - 32-character hex string
   * @returns {Buffer} 16-byte data buffer
   */
  getBlockData(blockString) {
    const blockBuffer = this.hexStringToBuffer(blockString);
    if (blockBuffer.length !== 16) {
      throw new Error('Block data must be 16 bytes (32 hex characters)');
    }
    return blockBuffer;
  }

  /**
   * Open COM port
   * @param {number} comPort - COM port number (e.g., 3 for COM3)
   * @param {number} baudRate - Baud rate (default: 19200)
   * @returns {boolean} True on success
   */
  openPort(comPort, baudRate = 19200) {
    try {
      const result = MasterRD.rf_init_com(comPort, baudRate);
      this.isOpen = (result === 0);
      return this.isOpen;
    } catch (error) {
      throw new Error(`Failed to call rf_init_com: ${error.message}`);
    }
  }

  /**
   * Close opened COM port
   * @returns {boolean} True on success
   */
  closePort() {
    try {
      const result = MasterRD.rf_ClosePort();
      if (result === 0) {
        this.isOpen = false;
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to call rf_ClosePort: ${error.message}`);
    }
  }

  /**
   * Select card and read serial number
   * @returns {string|null} Card serial number as hex string, or null on failure
   */
  selectCard() {
    // Note: rf_s70_select is not available in this DLL version
    // Using rf_M1_read to detect card presence instead
    // This requires authentication first - for now return a placeholder
    // In a real implementation, you would need the proper select function
    // or use a different card detection method

    // Attempt to read block 0 to detect card presence
    const pData = Buffer.alloc(16);
    const pLen = ref.alloc(ref.types.uint64, 0);

    // Try to authenticate and read block 0 with default key (Key A)
    const defaultKey = this.getKeyData('FFFFFFFFFFFF');

    console.log('Attempting authentication with KEY_A (0x60)...');
    console.log('Device: 0, Block: 0, KeyMode: 0x60');
    console.log('Key buffer:', defaultKey);

    // Try block 1 instead of block 0 (block 0 is manufacturer block and might have restrictions)
    let result = MasterRD.rf_M1_authentication2(0, 0x60, 1, defaultKey);
    console.log('rf_M1_authentication2 result for block 1:', result);

    if (result === 0) {
      console.log("✓ Authentication SUCCESS for block 1");
      result = MasterRD.rf_M1_read(0, 1, pData, pLen);
      console.log("rf_M1_read result:", result);

      if (result === 0) {
        // Card detected - return a placeholder serial
        // In production, you'd parse the actual card serial from block 0
        const dataLen = Number(pLen.deref());
        console.log("✓ Read SUCCESS! Data length:", dataLen);
        console.log("Block 1 data:", this.bufferToHexString(pData, Math.min(dataLen, 16)));
        return '0000000000000000';
      }
      else {
        console.log("✗ rf_M1_read failed with result code:", result);
      }
    }
    else {
      console.log("✗ Authentication FAILED with result code:", result);
      console.log("Possible causes:");
      console.log("  1. No card on the reader");
      console.log("  2. Wrong key (default key doesn't match card)");
      console.log("  3. Card uses KEY_B instead of KEY_A");
      console.log("  4. Port/reader communication issue");
    }
    return null;
  }

  /**
   * Download key to reader's EEPROM
   * @param {number} keyGroupIndex - Key group index (0-31)
   * @param {string} keyString - 12-character hex string
   * @returns {boolean} True on success
   */
  downloadKeyToReader(keyGroupIndex, keyString) {
    // Note: rf_M1_WriteKeyToEE2 is not available in this DLL version
    // This function would write the key to the reader's EEPROM
    // Without this function, you must authenticate using the key directly
    console.warn('Warning: downloadKeyToReader not supported in this DLL version');
    return false;
  }

  /**
   * Authenticate using key group stored in reader
   * @param {number} keyMode - KeyMode.KEY_A or KeyMode.KEY_B
   * @param {number} blockNo - Block number
   * @param {number} keyGroupIndex - Key group index (0-31)
   * @returns {boolean} True on success
   */
  checkReaderKey(keyMode, blockNo, keyGroupIndex) {
    const result = MasterRD.rf_M1_authentication1(0, keyMode, blockNo, keyGroupIndex);
    return result === 0;
  }

  /**
   * Read block using direct key authentication
   * @param {number} keyMode - KeyMode.KEY_A or KeyMode.KEY_B
   * @param {number} blockNo - Block number to read
   * @param {string} keyString - 12-character hex string key
   * @returns {Object|null} {data: string, serial: string} or null on failure
   */
  readDataWithKey(keyMode, blockNo, keyString) {
    const key = this.getKeyData(keyString);
    const pData = Buffer.alloc(100);
    const pLen = ref.alloc(ref.types.uint64, 0);

    // Select card first
    const cardSerial = this.selectCard();
    if (!cardSerial) return null;

    // Authenticate with key
    let result = MasterRD.rf_M1_authentication2(0, keyMode, blockNo, key);
    if (result !== 0) return null;

    // Read block
    result = MasterRD.rf_M1_read(0, blockNo, pData, pLen);

    if (result === 0) {
      const length = Number(pLen.deref());
      return {
        data: this.bufferToHexString(pData, length),
        serial: cardSerial
      };
    }
    return null;
  }

  /**
   * Read block using key group stored in reader
   * @param {number} keyMode - KeyMode.KEY_A or KeyMode.KEY_B
   * @param {number} blockNo - Block number to read
   * @param {number} keyGroupIndex - Key group index (0-31)
   * @returns {Object|null} {data: string, serial: string} or null on failure
   */
  readDataWithKeyGroup(keyMode, blockNo, keyGroupIndex) {
    // Select card first
    const cardSerial = this.selectCard();
    if (!cardSerial) return null;

    // Authenticate with key group
    if (!this.checkReaderKey(keyMode, blockNo, keyGroupIndex)) {
      return null;
    }

    // Read block
    const pData = Buffer.alloc(100);
    const pLen = ref.alloc(ref.types.uint64, 0);
    const result = MasterRD.rf_M1_read(0, blockNo, pData, pLen);

    if (result === 0) {
      const length = Number(pLen.deref());
      return {
        data: this.bufferToHexString(pData, length),
        serial: cardSerial
      };
    }
    return null;
  }

  /**
   * Write block using direct key authentication
   * @param {number} keyMode - KeyMode.KEY_A or KeyMode.KEY_B
   * @param {number} blockNo - Block number to write
   * @param {string} keyString - 12-character hex string key
   * @param {string} dataString - 32-character hex string data (16 bytes)
   * @returns {boolean} True on success
   */
  writeDataWithKey(keyMode, blockNo, keyString, dataString) {
    const key = this.getKeyData(keyString);
    const data = this.getBlockData(dataString);

    // Select card first
    const cardSerial = this.selectCard();
    if (!cardSerial) return false;

    // Authenticate with key
    let result = MasterRD.rf_M1_authentication2(0, keyMode, blockNo, key);
    if (result !== 0) return false;

    // Write block
    result = MasterRD.rf_M1_write(0, blockNo, data);
    return result === 0;
  }

  /**
   * Write block using key group stored in reader
   * @param {number} keyMode - KeyMode.KEY_A or KeyMode.KEY_B
   * @param {number} blockNo - Block number to write
   * @param {number} keyGroupIndex - Key group index (0-31)
   * @param {string} dataString - 32-character hex string data (16 bytes)
   * @returns {boolean} True on success
   */
  writeDataWithKeyGroup(keyMode, blockNo, keyGroupIndex, dataString) {
    // Select card first
    const cardSerial = this.selectCard();
    if (!cardSerial) return false;

    // Authenticate with key group
    if (!this.checkReaderKey(keyMode, blockNo, keyGroupIndex)) {
      return false;
    }

    // Write block
    const data = this.hexStringToBuffer(dataString);
    const result = MasterRD.rf_M1_write(0, blockNo, data);
    return result === 0;
  }

  /**
   * Control reader LED
   * @param {number} color - LightColor enum value
   * @returns {boolean} True on success
   */
  setLED(color) {
    const result = MasterRD.rf_light(0, color);
    return result === 0;
  }

  /**
   * Make reader beep
   * @param {number} duration - Duration in milliseconds
   * @returns {boolean} True on success
   */
  beep(duration = 100) {
    const result = MasterRD.rf_beep(0, duration);
    return result === 0;
  }
}

module.exports = {
  MifareReader,
  ReadWriteMode,
  KeyMode,
  LightColor
};
