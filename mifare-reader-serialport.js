const { SerialPort } = require('serialport');
const Readline = require('@serialport/parser-readline');

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
    this.port = null;
    this.parser = null;
  }

  /**
   * Open Serial Port
   * @param {string} portName - Name of the serial port (e.g., COM3 or /dev/ttyUSB0)
   * @param {number} baudRate - Baud rate (default: 19200)
   * @returns {boolean} True on success
   */
  openPort(portName, baudRate = 19200) {
    this.port = new SerialPort(portName, {
      baudRate: baudRate,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false
    });

    this.parser = this.port.pipe(new Readline({ delimiter: '\n' }));

    this.port.on('open', () => {
      this.isOpen = true;
      console.log(`Port ${portName} opened successfully`);
    });

    this.port.on('error', (err) => {
      console.error(`Error: ${err.message}`);
      this.isOpen = false;
    });

    this.port.on('close', () => {
      this.isOpen = false;
      console.log(`Port ${portName} closed`);
    });

    return this.isOpen;
  }

  /**
   * Close Serial Port
   * @returns {boolean} True on success
   */
  closePort() {
    if (this.port) {
      this.port.close((err) => {
        if (err) {
          console.error(`Error closing port: ${err.message}`);
          return false;
        }
        this.isOpen = false;
        console.log('Port closed successfully');
        return true;
      });
    }
    return false;
  }

  /**
   * Send command to the reader and get response
   * @param {Buffer} command - The command to send to the RFID reader
   * @returns {Promise<Buffer>} Response data from the reader
   */
  sendCommand(command) {
    return new Promise((resolve, reject) => {
      if (!this.isOpen) {
        return reject(new Error('Port is not open'));
      }

      this.port.write(command, (err) => {
        if (err) {
          return reject(new Error(`Error writing to port: ${err.message}`));
        }

        this.parser.once('data', (data) => {
          resolve(Buffer.from(data, 'hex'));
        });
      });
    });
  }

  /**
   * Select the card and read the serial number
   * @returns {Promise<string>} Card serial number as hex string
   */
  async selectCard() {
    const command = Buffer.from([0xAA, 0xBB, 0xCC]); // Placeholder command
    try {
      const response = await this.sendCommand(command);
      return response.toString('hex');
    } catch (error) {
      console.error('Error selecting card:', error);
      return null;
    }
  }

  /**
   * Authenticate using a key and read data
   * @param {Buffer} key - 6-byte key for authentication
   * @param {number} blockNo - Block number to read
   * @returns {Promise<Buffer|null>} Block data or null on failure
   */
  async readBlock(key, blockNo) {
    const authCommand = Buffer.from([0x60, 0x61, ...key, blockNo]); // Example authentication command
    const readCommand = Buffer.from([0x10, blockNo]); // Example read command

    try {
      await this.sendCommand(authCommand); // Send authentication command
      const blockData = await this.sendCommand(readCommand); // Send read command
      return blockData;
    } catch (error) {
      console.error('Error reading block:', error);
      return null;
    }
  }

  /**
   * Write data to the card
   * @param {Buffer} key - 6-byte key for authentication
   * @param {number} blockNo - Block number to write
   * @param {Buffer} data - Data to write
   * @returns {Promise<boolean>} True on success, false on failure
   */
  async writeBlock(key, blockNo, data) {
    const authCommand = Buffer.from([0x60, 0x61, ...key, blockNo]); // Example authentication command
    const writeCommand = Buffer.concat([Buffer.from([0x20, blockNo]), data]); // Example write command

    try {
      await this.sendCommand(authCommand); // Send authentication command
      await this.sendCommand(writeCommand); // Send write command
      return true;
    } catch (error) {
      console.error('Error writing block:', error);
      return false;
    }
  }

  /**
   * Set the LED color
   * @param {number} color - LED color code (e.g., LightColor.RED_LED)
   * @returns {boolean} True on success
   */
  async setLED(color) {
    const command = Buffer.from([0x30, color]);
    try {
      await this.sendCommand(command);
      return true;
    } catch (error) {
      console.error('Error setting LED:', error);
      return false;
    }
  }

  /**
   * Make the reader beep
   * @param {number} duration - Duration in milliseconds
   * @returns {boolean} True on success
   */
  async beep(duration = 100) {
    const command = Buffer.from([0x40, duration]);
    try {
      await this.sendCommand(command);
      return true;
    } catch (error) {
      console.error('Error making beep:', error);
      return false;
    }
  }
}

module.exports = {
  MifareReader,
  ReadWriteMode,
  KeyMode,
  LightColor
};
