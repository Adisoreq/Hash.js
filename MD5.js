const MD5 = {
    hash(message) {
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
    
        const K = [
            0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0x5133e2fd, 0x1ba9f3b6,
            0x1e376c08, 0x5149e191, 0x8c8b1646, 0x0e6f9fb8, 0x6f91c6f2, 0x5b9cca4f, 0x4a8d702d, 0xd9e9cb87
        ];
    
        const s = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
            5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
            4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23
        ];
    
        let a = 0x67452301;
        let b = 0xefcdab89;
        let c = 0x98badcfe;
        let d = 0x10325476;
    
        let bytes = stringToBytes(message);
        const originalLength = bytes.length * 8;
    
        bytes.push(0x80); // '\1'= 0x80
        while (bytes.length % 64 !== 56) {
            bytes.push(0x00); // '\0' = 0x00
        }
    
        for (let i = 0; i < 8; i++) {
            bytes.push((originalLength >>> (i * 8)) & 0xff);
        }
    
        for (let i = 0; i < bytes.length; i += 64) {
            let chunk = bytes.slice(i, i + 64);
    
            let M = [];
            for (let j = 0; j < 16; j++) {
                M[j] = (chunk[j * 4] << 24) | (chunk[j * 4 + 1] << 16) | (chunk[j * 4 + 2] << 8) | chunk[j * 4 + 3];
            }
    
            let [A, B, C, D] = [a, b, c, d];
    
            for (let j = 0; j < 64; j++) {
                let F, g;
                if (j < 16) {
                    F = (B & C) | (~B & D);
                    g = j;
                } else if (j < 32) {
                    F = (D & B) | (~D & C);
                    g = (5 * j + 1) % 16;
                } else if (j < 48) {
                    F = B ^ C ^ D;
                    g = (3 * j + 5) % 16;
                } else {
                    F = C ^ (B | ~D);
                    g = (7 * j) % 16;
                }
    
                let temp = D;
                D = C;
                C = B;
                B = (B + rotateLeft(A + F + K[j] + M[g], s[j]), 32) & 0xffffffff;
                A = temp;
            }
    
            a = (a + A) & 0xffffffff;
            b = (b + B) & 0xffffffff;
            c = (c + C) & 0xffffffff;
            d = (d + D) & 0xffffffff;
        }
    
        const hash = [a, b, c, d].map(function(num) {
            return ('00000000' + num.toString(16)).slice(-8);
        }).join('');
    
        return hash;
    }
}
