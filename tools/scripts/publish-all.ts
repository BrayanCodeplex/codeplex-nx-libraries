import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

// Configuration
const PACKAGES_DIR = join(__dirname, '../../packages');
const DRY_RUN = process.argv.includes('--dry-run');

console.log(`🚀 Starting Publish All Script ${DRY_RUN ? '(DRY RUN)' : ''}...`);

if (!existsSync(PACKAGES_DIR)) {
    console.error(`❌ Packages directory not found at ${PACKAGES_DIR}`);
    process.exit(1);
}

const packages = readdirSync(PACKAGES_DIR).filter((pkg: string) =>
    existsSync(join(PACKAGES_DIR, pkg, 'package.json'))
);

console.log(`📦 Found ${packages.length} packages: ${packages.join(', ')}`);

let successCount = 0;
let failCount = 0;

packages.forEach((pkg: string) => {
    const pkgPath = join(PACKAGES_DIR, pkg);
    const pkgJsonPath = join(pkgPath, 'package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
    const pkgName = pkgJson.name;
    const version = pkgJson.version;

    console.log(`\n----------------------------------------------------------------`);
    console.log(`🔨 Processing ${pkgName} v${version}...`);

    try {
        // 1. Build
        console.log(`   Building...`);
        if (!DRY_RUN) {
            // Assuming 'nx build <project>' works, but we need the project name.
            // Usually project name matches directory or name in project.json.
            // Let's try running the build command defined in package.json if it exists, or fallback to nx.
            // For simplicity in this monorepo structure, we'll try 'nx build <pkg>' assuming pkg dir name matches nx project name.
            // If pkg starts with 'codeplex-', usually the nx name matches. 
            // Let's rely on `nx build <dirname>` or check project.json.

            const buildResult = spawnSync('bun', ['nx', 'build', pkg], { stdio: 'inherit', cwd: join(__dirname, '../../') });
            if (buildResult.status !== 0) {
                throw new Error(`Build failed for ${pkgName}`);
            }
        }

        // 2. Publish
        console.log(`   Publishing...`);
        const cmd = 'npm';
        const args = ['publish', '--access', 'public'];

        if (DRY_RUN) {
            args.push('--dry-run');
        }

        // We must run publish from the DIST directory usually, OR depend on how nx sets up the package. 
        // Is the output in dist/packages/<pkg>?
        // Standard nx behavior: output is in dist/packages/<pkg>.
        // Publishing from source root is bad practice unless a prepare script handles it.
        // Let's assume we publish from dist/packages/<pkg>.
        const distPath = join(__dirname, '../../dist/packages', pkg);

        if (!DRY_RUN && !existsSync(distPath)) {
            throw new Error(`Dist directory not found at ${distPath}. Build might have failed silently or output is elsewhere.`);
        }

        const publishCwd = existsSync(distPath) ? distPath : pkgPath;
        console.log(`   Executing npm publish in ${publishCwd}...`);

        const publishResult = spawnSync(cmd, args, { stdio: 'inherit', cwd: publishCwd });

        if (publishResult.status !== 0) {
            // Warning: npm publish errors if version exists. We might want to ignore that specific error.
            console.warn(`   ⚠️ Publish command returned non-zero. Check if version already exists.`);
            failCount++;
        } else {
            console.log(`   ✅ Published ${pkgName} v${version}`);
            successCount++;
        }

    } catch (err: any) {
        console.error(`   ❌ Error processing ${pkgName}:`, err.message);
        failCount++;
    }
});

console.log(`\n----------------------------------------------------------------`);
console.log(`🏁 Done! Success: ${successCount}, Failed/Skipped: ${failCount}`);
