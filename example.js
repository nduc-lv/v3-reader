/**
 * Example usage of MifareReader for Mifare 1K/4K RFID cards
 * This demonstrates all major operations from the C# application
 */

const { MifareReader, KeyMode, LightColor } = require('./mifare-reader');

// Initialize reader
const reader = new MifareReader();

// Default configuration
const COM_PORT = 3;        // COM3 - adjust to your port
const BAUD_RATE = 19200;   // Standard baud rate
const DEFAULT_KEY = 'FFFFFFFFFFFF';  // Factory default key for Mifare cards

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function exampleBasicOperations() {
  console.log('=== Basic Operations Example ===\n');

  try {
    // 1. Open COM port
    console.log(`Opening COM${COM_PORT} at ${BAUD_RATE} baud...`);
    if (reader.openPort(COM_PORT, BAUD_RATE)) {
      console.log('✓ Port opened successfully\n');
    } else {
      console.log('✗ Failed to open port');
      return;
    }

    // 2. Test LED and beep
    console.log('Testing LED and beep...');
    reader.setLED(LightColor.GREEN_LED);
    reader.beep(100);
    await delay(500);
    reader.setLED(LightColor.RED_LED);
    await delay(500);
    reader.setLED(LightColor.ALL_LED);
    await delay(500);
    reader.setLED(LightColor.CLOSE_LED);
    console.log('✓ LED test complete\n');

    // 3. Select card and read serial number
    console.log('Place card on reader...');
    const serial = reader.selectCard();
    if (serial) {
      console.log(`✓ Card detected! Serial: ${serial}\n`);
      reader.setLED(LightColor.GREEN_LED);
      reader.beep(50);
      await delay(200);
      reader.setLED(LightColor.CLOSE_LED);
    } else {
      console.log('✗ No card detected\n');
      return;
    }

    // 4. Read block using default key
    console.log('Reading block 1 with default key...');
    const blockNo = 1;
    const readResult = reader.readDataWithKey(KeyMode.KEY_A, blockNo, DEFAULT_KEY);

    if (readResult) {
      console.log(`✓ Block ${blockNo} read successfully`);
      console.log(`  Serial: ${readResult.serial}`);
      console.log(`  Data:   ${readResult.data}\n`);
    } else {
      console.log(`✗ Failed to read block ${blockNo}\n`);
    }

    // 5. Write data to block (be careful - this modifies the card!)
    // Uncomment to test write operation
    /*
    console.log('Writing to block 1...');
    const testData = '00112233445566778899AABBCCDDEEFF';
    if (reader.writeDataWithKey(KeyMode.KEY_A, blockNo, DEFAULT_KEY, testData)) {
      console.log(`✓ Block ${blockNo} written successfully\n`);
      reader.beep(50);
    } else {
      console.log(`✗ Failed to write block ${blockNo}\n`);
    }
    */

    // 6. Close port
    console.log('Closing port...');
    if (reader.closePort()) {
      console.log('✓ Port closed successfully');
    }

  } catch (error) {
    console.error('Error:', error.message);
    reader.closePort();
  }
}

async function exampleKeyGroupOperations() {
  console.log('\n=== Key Group Operations Example ===\n');

  try {
    // Open port
    if (!reader.openPort(COM_PORT, BAUD_RATE)) {
      console.log('✗ Failed to open port');
      return;
    }
    console.log('✓ Port opened\n');

    // Download key to reader's EEPROM (key group 0)
    console.log('Downloading key to reader memory (group 0)...');
    const customKey = 'A0A1A2A3A4A5';  // Example custom key
    if (reader.downloadKeyToReader(0, customKey)) {
      console.log('✓ Key downloaded to group 0\n');
    } else {
      console.log('✗ Failed to download key\n');
      reader.closePort();
      return;
    }

    // Select card
    console.log('Place card on reader...');
    const serial = reader.selectCard();
    if (!serial) {
      console.log('✗ No card detected');
      reader.closePort();
      return;
    }
    console.log(`✓ Card detected: ${serial}\n`);

    // Read using key group
    console.log('Reading block 1 using key group 0...');
    const blockNo = 1;
    const result = reader.readDataWithKeyGroup(KeyMode.KEY_A, blockNo, 0);

    if (result) {
      console.log(`✓ Block ${blockNo} read successfully`);
      console.log(`  Data: ${result.data}\n`);
    } else {
      console.log(`✗ Failed to read block ${blockNo}`);
      console.log('  (This might fail if the card uses a different key)\n');
    }

    // Close port
    reader.closePort();
    console.log('✓ Port closed');

  } catch (error) {
    console.error('Error:', error.message);
    reader.closePort();
  }
}

async function exampleReadMultipleBlocks() {
  console.log('\n=== Read Multiple Blocks Example ===\n');

  try {
    if (!reader.openPort(COM_PORT, BAUD_RATE)) {
      console.log('✗ Failed to open port');
      return;
    }

    console.log('Place card on reader...');
    const serial = reader.selectCard();
    if (!serial) {
      console.log('✗ No card detected');
      reader.closePort();
      return;
    }
    console.log(`✓ Card Serial: ${serial}\n`);

    // Read multiple blocks (Sector 0: blocks 0-3)
    console.log('Reading Sector 0 (blocks 0-2)...');
    for (let block = 0; block <= 2; block++) {
      const result = reader.readDataWithKey(KeyMode.KEY_A, block, DEFAULT_KEY);
      if (result) {
        console.log(`  Block ${block}: ${result.data}`);
      } else {
        console.log(`  Block ${block}: Read failed`);
      }
    }

    reader.closePort();
    console.log('\n✓ Done');

  } catch (error) {
    console.error('Error:', error.message);
    reader.closePort();
  }
}

// Run examples
async function main() {
  console.log('Mifare RFID Reader - Node.js Examples');
  console.log('=====================================\n');

  // Run basic operations example
  await exampleBasicOperations();

  // Uncomment to run other examples:
  // await exampleKeyGroupOperations();
  // await exampleReadMultipleBlocks();
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  exampleBasicOperations,
  exampleKeyGroupOperations,
  exampleReadMultipleBlocks
};
