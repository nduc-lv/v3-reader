const { MifareReader, LightColor, KeyMode } = require('./mifare-reader-serialport'); // Import the MifareReader class

// Create a new instance of MifareReader
const reader = new MifareReader();

// Define the serial port and baud rate
const portName = 'COM5'; // Change to the correct port (e.g., COM3 on Windows)
const baudRate = 19200;

// Open the serial port
async function initializeReader() {
  const success = reader.openPort(portName, baudRate);
  if (success) {
    console.log('Reader initialized successfully!');
    await interactWithReader();
  } else {
    console.log('Failed to open the serial port');
  }
}

// Interact with the reader
async function interactWithReader() {
  try {
    // Select the card
    const cardSerial = await reader.selectCard();
    if (cardSerial) {
      console.log(`Card selected! Serial: ${cardSerial}`);

      // Set the LED to Green to indicate success
      await reader.setLED(LightColor.GREEN_LED);

      // Beep the reader to indicate that a card is detected
      await reader.beep(200); // Beep for 200 ms

      // Example: Authenticate and read data from Block 4 using Key A
      const keyA = 'FFFFFFFFFFFF'; // Example Key A (12 hex characters)
      const blockNo = 4; // Block number to read

      const readData = await reader.readBlock(Buffer.from(keyA, 'hex'), blockNo);
      if (readData) {
        console.log(`Block ${blockNo} Data: ${readData.toString('hex')}`);
      } else {
        console.log('Failed to read the block');
      }

      // Example: Write data to Block 4
      const dataToWrite = Buffer.from('0102030405060708090A0B0C0D0E0F10', 'hex'); // Example data
      const writeSuccess = await reader.writeBlock(Buffer.from(keyA, 'hex'), blockNo, dataToWrite);
      if (writeSuccess) {
        console.log(`Data written to Block ${blockNo} successfully`);
      } else {
        console.log('Failed to write data to block');
      }
    } else {
      console.log('No card detected');
    }
  } catch (error) {
    console.error('Error interacting with the reader:', error);
  } finally {
    // Close the port after the interaction
    reader.closePort();
  }
}

// Initialize the reader and start the interaction
initializeReader();
