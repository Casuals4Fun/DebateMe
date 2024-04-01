// utils/mimeUtils.js

function getMimeType(base64String) {
    const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    return mimeType ? mimeType[1] : null;
}

module.exports = {
    getMimeType
};