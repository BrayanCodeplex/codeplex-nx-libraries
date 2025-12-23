const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../../packages');

if (!fs.existsSync(packagesDir)) {
    console.error('Packages directory not found at ' + packagesDir);
    process.exit(1);
}

const packages = fs.readdirSync(packagesDir);

packages.forEach(pkg => {
    const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = require(pkgJsonPath);

        // Ensure publish config
        pkgJson.publishConfig = { access: 'restricted' };

        // Ensure build output paths
        if (!pkgJson.main) pkgJson.main = './dist/index.js';
        if (!pkgJson.types) pkgJson.types = './dist/index.d.ts';
        if (!pkgJson.module) pkgJson.module = './dist/index.mjs';

        fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
        console.log(`✅ Updated ${pkg} package.json`);
    }
});
