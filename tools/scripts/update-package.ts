import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

// Configuration
const PACKAGES_DIR = join(__dirname, '../../packages');
const ARGS = process.argv.slice(2);
const IS_ALL = ARGS.includes('--all');
const PKG_NAME_ARG_INDEX = ARGS.indexOf('--name');
const PKG_NAME = PKG_NAME_ARG_INDEX !== -1 ? ARGS[PKG_NAME_ARG_INDEX + 1] : null;
const VERSION_ARG_INDEX = ARGS.indexOf('--version');
const VERSION_BUMP = VERSION_ARG_INDEX !== -1 ? ARGS[VERSION_ARG_INDEX + 1] : 'patch'; // patch, minor, major

if (!IS_ALL && !PKG_NAME) {
    console.error(`❌ You must specify either --all or --name <package-dir-name>`);
    process.exit(1);
}

if (!['patch', 'minor', 'major'].includes(VERSION_BUMP)) {
    console.error(`❌ Invalid version bump type: ${VERSION_BUMP}. Use patch, minor, or major.`);
    process.exit(1);
}

const allPackageDirs = readdirSync(PACKAGES_DIR).filter((pkg: string) =>
    existsSync(join(PACKAGES_DIR, pkg, 'package.json'))
);

const targetPackages = IS_ALL
    ? allPackageDirs
    : allPackageDirs.filter((p: string) => p === PKG_NAME);

if (targetPackages.length === 0) {
    console.error(`❌ No packages found matching criteria.`);
    process.exit(1);
}

console.log(`🚀 Starting Update Script for ${targetPackages.length} packages...`);
console.log(`Bumping ${VERSION_BUMP} version...`);

targetPackages.forEach((pkg: string) => {
    const pkgPath = join(PACKAGES_DIR, pkg);
    console.log(`\n----------------------------------------------------------------`);
    console.log(`Processing ${pkg}...`);

    try {
        // 1. Version Bump
        // We use 'npm version' to handle git tagging (logic varies) or just JSON update.
        // For simplicity in this script, we'll run npm version inside the package dir.
        // NOTE: npm version creates a git commit/tag by default if git is present.
        // usage: npm version patch --no-git-tag-version to avoid tagging if desired.
        const versionResult = spawnSync('npm', ['version', VERSION_BUMP], {
            stdio: 'inherit',
            cwd: pkgPath
        });

        if (versionResult.status !== 0) {
            throw new Error('Failed to bump version');
        }

        // 2. Build
        console.log(`Building ${pkg}...`);
        const buildResult = spawnSync('bun', ['nx', 'build', pkg], {
            stdio: 'inherit',
            cwd: join(__dirname, '../../')
        });

        if (buildResult.status !== 0) {
            throw new Error('Build failed');
        }

        // 3. Publish
        console.log(`Publishing ${pkg}...`);
        const distPath = join(__dirname, '../../dist/packages', pkg);
        const publishCwd = existsSync(distPath) ? distPath : pkgPath;

        const publishResult = spawnSync('npm', ['publish', '--access', 'public'], {
            stdio: 'inherit',
            cwd: publishCwd
        });

        if (publishResult.status !== 0) {
            throw new Error('Publish failed');
        }

        console.log(`✅ Successfully updated and published ${pkg}`);

    } catch (err: any) {
        console.error(`❌ Error updating ${pkg}:`, err.message);
    }
});
