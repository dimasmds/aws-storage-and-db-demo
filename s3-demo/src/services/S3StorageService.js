const AWS = require('aws-sdk');

class S3StorageService {
  constructor() {
    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: 'ap-southeast-1',
    });
  }

  uploadObject(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: meta.filename,
      Body: file,
      ContentType: meta.headers['content-type'],
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }

  getSignedUrl(filename) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Expires: 300,
    };

    return this.s3.getSignedUrlPromise('getObject', parameter);
  }

  putSignedUrl(fileName) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Expires: 300,
    };

    return this.s3.getSignedUrlPromise('putObject', parameter);
  }
}

module.exports = S3StorageService;
