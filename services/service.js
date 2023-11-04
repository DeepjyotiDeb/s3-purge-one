import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as fs from 'fs';

import { failure, success } from '../libs/response-lib';
// When no region or credentials are provided, the SDK will use the
// region and credentials from the local AWS config.
const client = new S3Client({});

export const helloS3 = async () => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: 'stream-bin',
      Key: 'WhatsApp Image 2022-10-01 at 11.29.56 AM.jpeg',
    });

    const response = await client.send(command);
    // const bucket = Buckets.map((bucket) => bucket.Name).join('\n');
    return success({
      status: true,
      response,
    });
  } catch (error) {
    return failure({
      status: 404,
      message: error,
    });
  }
};

const twentyFiveMB = 25 * 1024 * 1024;

export const createString = (size = twentyFiveMB) => {
  return 'x'.repeat(size);
};

export const putObj = async () => {
  try {
    const fileContent = fs.readFileSync('./sample.jpeg');
    console.log('fileContent', fileContent);
    const key = 'multipart.txt';
    const str = createString();
    const buffer = Buffer.from(str, 'utf8');
    let uploadId;

    const multipartUpload = await client.send(
      new CreateMultipartUploadCommand({
        Bucket: 'stream-bin',
        Key: key,
      })
    );

    uploadId = multipartUpload.UploadId;

    const uploadPromises = [];
    // Multipart uploads require a minimum size of 5 MB per part.
    const partSize = Math.ceil(buffer.length / 5);

    for (let i = 0; i < 5; i++) {
      const start = i * partSize;
      const end = start + partSize;
      uploadPromises.push(
        client
          .send(
            new UploadPartCommand({
              Bucket: 'stream-bin',
              Key: key,
              UploadId: uploadId,
              Body: buffer.subarray(start, end),
              PartNumber: i + 1,
            })
          )
          .then((d) => {
            console.log('Part', i + 1, 'uploaded');
            return d;
          })
      );
    }

    const uploadResults = await Promise.all(uploadPromises);

    const res = await client.send(
      new CompleteMultipartUploadCommand({
        Bucket: 'stream-bin',
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      })
    );

    // const command = new PutObjectCommand({
    //   Bucket: 'stream-bin',
    //   Key: 'hellos3.txt',
    //   Body: 'heello',
    // });
    // const response = await client.send(command);
    return success({
      status: 200,
      message: res,
    });
  } catch (error) {
    return { error: JSON.stringify(error), message: 'failed', status: 404 };
  }
};

export const createPresignedUrl = async () => {
  try {
    const command = new PutObjectCommand({ Bucket: 'stream-bin', Key: 'sample.jpeg' });
    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    console.log('uploadUrl', uploadUrl);
    const url = uploadUrl.split('?')[0];
    return success({ status: true, message: { url } });
  } catch (error) {
    return failure({ error: 404, message: 'failed' });
  }
};

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = fs.readFileSync(require.resolve('./sampleEvent.json'));
    resolve(reader);
  });
};

export const uploadFile = async () => {
  const url = 'https://stream-bin.s3.ap-south-1.amazonaws.com/sample.jpeg';
  const arrayBuffer = await readFile('./sample.jpeg');
  console.log('arrayBuffer: ', arrayBuffer);
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log('percent: ', percent);
    },
  };
  try {
    // const res = await fetch(url, {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: arrayBuffer,
    //   ...options,
    // });
    // const response = await res.json();
    // return success({ status: true, message: JSON.stringify(response) });
  } catch (error) {
    return failure({ status: false, message: `${error}` });
  }
};
