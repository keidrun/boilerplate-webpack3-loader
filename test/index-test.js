const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const webpack = require('webpack');

const entryFilePath = path.join(__dirname, 'source/entry.js');
const outputDirPath = path.join(__dirname, 'output');
const outputFileName = 'output.js';
const outputFilePath = path.join(outputDirPath, outputFileName);

const getTestWebPackConfig = loader => {
  return {
    entry: entryFilePath,
    output: {
      path: outputDirPath,
      filename: outputFileName
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [loader]
        }
      ]
    }
  };
};

describe('sample-loader test', () => {
  it('should greet', done => {
    webpack(
      getTestWebPackConfig({
        loader: '__this-loader',
        query: {
          name: 'Keid'
        }
      }),
      (error, stats) => {
        expect(error).to.equal(null);
        fs.readFile(outputFilePath, 'utf8', (err, contents) => {
          expect(err).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('Hello, Keid');
          done();
        });
      }
    );
  });
});
