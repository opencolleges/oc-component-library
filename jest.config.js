module.exports = {
  roots: ['<rootDir>/lib'],
  //  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/lib/setupEnzyme.ts']
};
