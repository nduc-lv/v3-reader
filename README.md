# Mifare RFID Card Reader - Node.js Implementation

Node.js port of the C# Mifare 1K/4K card reader application using the MasterRD.dll library.

## Requirements

- **Windows only** (requires MasterRD.dll)
- **Node.js** 14.0.0 or higher
- **MasterRD.dll** must be in the same directory or system PATH
- Mifare card reader device connected via COM port

## Installation

```bash
npm install
```

This will install the required dependencies:
- `ffi-napi` - Foreign Function Interface for calling native DLL
- `ref-napi` - C pointer and type handling
- `ref-array-di` - Array type support for FFI

## File Structure

```
├── masterrd-ffi.js      # Low-level FFI bindings to MasterRD.dll
├── mifare-reader.js     # High-level reader API (equivalent to Reader_S70.cs)
├── example.js           # Usage examples (equivalent to FrmMain.cs logic)
├── package.json         # NPM package configuration
└── README.md           # This file
```

## Quick Start

```javascript
const { MifareReader, KeyMode, LightColor } = require('./mifare-reader');

const reader = new MifareReader();

// Open COM port (adjust port number to match your device)
if (reader.openPort(3, 19200)) {
  console.log('Port opened');

  // Select card and read serial
  const serial = reader.selectCard();
  console.log('Card Serial:', serial);

  // Read block 1 with default key
  const result = reader.readDataWithKey(
    KeyMode.KEY_A,
    1,
    'FFFFFFFFFFFF'  // Default Mifare key
  );

  if (result) {
    console.log('Data:', result.data);
    console.log('Serial:', result.serial);
  }

  // Close port
  reader.closePort();
}
```

## API Reference

### MifareReader Class

#### Port Management
- `openPort(comPort, baudRate)` - Open COM port (returns boolean)
- `closePort()` - Close COM port (returns boolean)

#### Card Operations
- `selectCard()` - Select card and read serial number (returns hex string or null)

#### Reading Data
- `readDataWithKey(keyMode, blockNo, keyString)` - Read using direct key
- `readDataWithKeyGroup(keyMode, blockNo, keyGroupIndex)` - Read using stored key

#### Writing Data
- `writeDataWithKey(keyMode, blockNo, keyString, dataString)` - Write using direct key
- `writeDataWithKeyGroup(keyMode, blockNo, keyGroupIndex, dataString)` - Write using stored key

#### Key Management
- `downloadKeyToReader(keyGroupIndex, keyString)` - Store key in reader memory (0-31)
- `checkReaderKey(keyMode, blockNo, keyGroupIndex)` - Authenticate with stored key

#### Device Control
- `setLED(color)` - Control LED (use LightColor enum)
- `beep(duration)` - Make beep sound (milliseconds)

#### Utility Methods
- `hexStringToBuffer(hexString)` - Convert hex string to Buffer
- `bufferToHexString(buffer, length)` - Convert Buffer to hex string
- `getKeyData(keyString)` - Validate and convert 12-char hex key
- `getBlockData(blockString)` - Validate and convert 32-char hex block data

### Enumerations

#### KeyMode
- `KeyMode.KEY_A` (0x60) - Use Key A
- `KeyMode.KEY_B` (0x61) - Use Key B

#### LightColor
- `LightColor.CLOSE_LED` (0x00) - Turn off LEDs
- `LightColor.RED_LED` (0x01) - Red LED
- `LightColor.GREEN_LED` (0x02) - Green LED
- `LightColor.ALL_LED` (0x03) - All LEDs

#### ReadWriteMode
- `ReadWriteMode.READ_0_TO_31` (0) - Blocks 0-31
- `ReadWriteMode.READ_32_TO_38` (1) - Blocks 32-38
- `ReadWriteMode.READ_ALL` (2) - All blocks

## Examples

Run the included examples:

```bash
npm run example
```

### Example 1: Basic Read Operation

```javascript
const reader = new MifareReader();

reader.openPort(3, 19200);

const serial = reader.selectCard();
if (serial) {
  const result = reader.readDataWithKey(KeyMode.KEY_A, 1, 'FFFFFFFFFFFF');
  console.log('Block 1 data:', result.data);
}

reader.closePort();
```

### Example 2: Using Key Groups

```javascript
const reader = new MifareReader();

reader.openPort(3, 19200);

// Download key to reader memory (group 0)
reader.downloadKeyToReader(0, 'A0A1A2A3A4A5');

// Read using key group
const serial = reader.selectCard();
if (serial) {
  const result = reader.readDataWithKeyGroup(KeyMode.KEY_A, 1, 0);
  console.log('Data:', result.data);
}

reader.closePort();
```

### Example 3: Write Data

```javascript
const reader = new MifareReader();

reader.openPort(3, 19200);

// Write 16 bytes (32 hex characters) to block 1
const writeSuccess = reader.writeDataWithKey(
  KeyMode.KEY_A,
  1,
  'FFFFFFFFFFFF',  // Key
  '00112233445566778899AABBCCDDEEFF'  // 16 bytes of data
);

console.log('Write success:', writeSuccess);

reader.closePort();
```

## Mifare Card Structure

### Mifare 1K (1024 bytes)
- 16 sectors
- 4 blocks per sector (64 blocks total: 0-63)
- 16 bytes per block
- Block 0 = Manufacturer data (read-only)
- Last block of each sector = Sector trailer (keys + access bits)

### Mifare 4K (4096 bytes)
- 40 sectors
- Sectors 0-31: 4 blocks each
- Sectors 32-39: 16 blocks each
- 256 blocks total
- Same access control structure as 1K

### Block Numbering
- Sector 0: Blocks 0-3
- Sector 1: Blocks 4-7
- Sector 2: Blocks 8-11
- And so on...

**Warning:** Do NOT write to block 0 or sector trailer blocks unless you know what you're doing! This can permanently lock the card.

## Common Keys

```javascript
// Factory default key (works on new cards)
const DEFAULT_KEY = 'FFFFFFFFFFFF';

// Common alternative keys
const COMMON_KEYS = [
  'A0A1A2A3A4A5',
  'B0B1B2B3B4B5',
  '000000000000'
];
```

## Troubleshooting

### Port won't open
- Check COM port number (use Device Manager on Windows)
- Ensure no other application is using the port
- Verify MasterRD.dll is accessible
- Try different baud rates (19200 is standard)

### Can't read card
- Ensure card is placed on reader
- Try default key 'FFFFFFFFFFFF' first
- Check if card is Mifare 1K or 4K compatible
- Verify block number is valid for card type

### Authentication fails
- Wrong key for the sector
- Card may be using custom keys
- Ensure you're using correct key type (A or B)

### FFI/DLL errors
- Ensure you're running on Windows
- Install Visual C++ Redistributable if missing
- Check MasterRD.dll architecture matches Node.js (32-bit vs 64-bit)

## Differences from C# Version

1. **Async/Promise support** - Examples show async patterns with delays
2. **No GUI** - Pure API, build your own interface
3. **Buffer handling** - Uses Node.js Buffer instead of byte[]
4. **Error handling** - Returns null/false instead of exceptions in most cases
5. **Simplified** - Removed GUI-specific code, focus on core functionality

## Security Notes

- Never hardcode keys in production code
- Store keys securely (environment variables, encrypted config)
- Be careful when writing to cards - errors can brick them
- Validate all input data before writing
- Use key groups for better security management

## License

MIT

## Original C# Source

This is a port of the C# Mifare card reader application that uses MasterRD.dll for Chinese RFID card readers.
