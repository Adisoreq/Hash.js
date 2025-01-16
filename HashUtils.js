// Byte rotation
function rotateLeft(x, c, bits) {
    return (x << c) | (x >> (bits - c));
}
function rotateRight(x, c, bits) {
    return (x >> c) | (x << (bits - c));
}

// Byte conversion
function stringToBytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode <= 0x7F) {
            bytes.push(charCode);
        } else if (charCode <= 0x7FF) {
            bytes.push(0xC0 | (charCode >> 6));
            bytes.push(0x80 | (charCode & 0x3F));
        } else if (charCode <= 0xFFFF) {
            bytes.push(0xE0 | (charCode >> 12));
            bytes.push(0x80 | ((charCode >> 6) & 0x3F));
            bytes.push(0x80 | (charCode & 0x3F));
        } else {
            bytes.push(0xF0 | (charCode >> 18));
            bytes.push(0x80 | ((charCode >> 12) & 0x3F));
            bytes.push(0x80 | ((charCode >> 6) & 0x3F));
            bytes.push(0x80 | (charCode & 0x3F));
        }
    }
    return bytes;
}
