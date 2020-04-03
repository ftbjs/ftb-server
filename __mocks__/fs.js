const path = require('path');
const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
let fileContents = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null)
  fileContents = newMockFiles

  for (const file in newMockFiles) {
    const dir = path.dirname(file)

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file))
  }
}

function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || []
}

fs.__setMockFiles = __setMockFiles
fs.readdirSync = readdirSync
fs.existsSync = filePath => Object.keys(fileContents).filter(x => x.startsWith(filePath)).length > 0

module.exports = fs