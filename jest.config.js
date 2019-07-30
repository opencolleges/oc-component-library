module.exports = {
  roots: ['<rootDir>/lib'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/lib/setupEnzyme.ts']
};
