const {PutObjectCommand, DeleteObjectCommand, HeadObjectCommand} = require('@aws-sdk/client-s3');
const r2Client = require('../config/r2');
const { purgeCache } = require('./cloudflare.service');

async function uploadFile(fileBuffer, originalName, mimetype, folder = 'misc') {
    const ext = originalName.split('.').pop();
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    const sanitizedBaseName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_');
    const key = `${folder}/${sanitizedBaseName}.${ext}`;

    await r2Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: mimetype,
    }));

    return `${process.env.R2_PUBLIC_URL}/${key}`;
}

async function deleteFile(fileUrl){
    const publicUrl = new URL(process.env.R2_PUBLIC_URL);
    const targetUrl = new URL(fileUrl);
    const basePath = `${publicUrl.pathname.replace(/\/$/, '')}/`;

    if (targetUrl.origin !== publicUrl.origin || !targetUrl.pathname.startsWith(basePath)) {
        throw new Error('Invalid R2 file URL');
    }

    const key = decodeURIComponent(targetUrl.pathname.slice(basePath.length));

    await r2Client.send(new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
    }));

    await r2Client.send(new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
    }));
    
    await purgeCache(fileUrl);
}

module.exports = { uploadFile, deleteFile };