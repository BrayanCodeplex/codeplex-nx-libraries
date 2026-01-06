import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const PACKAGES_DIR = join(__dirname, '../../packages');
const CWD = process.cwd(); // Run where the user executes the command

console.log(`🚀 Starting Install Codeplex Libraries Script...`);

// 1. Discover Packages
if (!existsSync(PACKAGES_DIR)) {
    console.error(`❌ Packages directory not found at ${PACKAGES_DIR}. Are you running this from the monorepo?`);
    // In a real scenario, if this script is distributed, it might need a different way to know the list.
    // For now, consistent with requirements, we read from local packages dir.
    process.exit(1);
}

const packages = readdirSync(PACKAGES_DIR).filter((pkg: string) =>
    existsSync(join(PACKAGES_DIR, pkg, 'package.json'))
).map((pkg: string) => {
    const pkgJson = JSON.parse(readFileSync(join(PACKAGES_DIR, pkg, 'package.json'), 'utf-8'));
    return pkgJson.name;
});

if (packages.length === 0) {
    console.error('❌ No packages found to install.');
    process.exit(1);
}

console.log(`📦 Found ${packages.length} Codeplex packages:`);
packages.forEach((p: string) => console.log(`   - ${p}`));

// 2. Install Packages
// We use 'bun add' or 'npm install' or 'pnpm add'. 
// We'll detect the lockfile or default to the user's preference if passed, but typically we want to use the current project's manager.
// Simple heuristic: check for bun.lockb, pnpm-lock.yaml, yacht.lock, package-lock.json.
let installCmd = 'npm';
let installArgs = ['install'];

if (existsSync(join(CWD, 'bun.lock')) || existsSync(join(CWD, 'bun.lockb'))) {
    installCmd = 'bun';
    installArgs = ['add'];
} else if (existsSync(join(CWD, 'pnpm-lock.yaml'))) {
    installCmd = 'pnpm';
    installArgs = ['add'];
} else if (existsSync(join(CWD, 'yarn.lock'))) {
    installCmd = 'yarn';
    installArgs = ['add'];
}

console.log(`\n🔧 Detecting package manager: ${installCmd}`);
console.log(`   Installing packages...`);

// Install libraries
const libInstallResult = spawnSync(installCmd, [...installArgs, ...packages], { stdio: 'inherit', cwd: CWD });
if (libInstallResult.status !== 0) {
    console.error('❌ Failed to install Codeplex libraries.');
    process.exit(1);
}

// 3. Check & Install Peer Dependencies (Tailwind, Vite)
const requiredDeps = ['tailwindcss', 'vite'];
const missingDeps = [];

// Check package.json of the target project
const targetPkgJsonPath = join(CWD, 'package.json');
let targetPkgJson: any = {};
if (existsSync(targetPkgJsonPath)) {
    targetPkgJson = JSON.parse(readFileSync(targetPkgJsonPath, 'utf-8'));
}

requiredDeps.forEach((dep: string) => {
    const hasDep = (targetPkgJson.dependencies && targetPkgJson.dependencies[dep]) ||
        (targetPkgJson.devDependencies && targetPkgJson.devDependencies[dep]);

    if (!hasDep) {
        missingDeps.push(dep);
    }
});

if (missingDeps.length > 0) {
    console.log(`\n⚠️ Missing required dependencies: ${missingDeps.join(', ')}`);
    console.log(`   Installing missing dependencies...`);

    const depInstallResult = spawnSync(installCmd, [...installArgs, '-D', ...missingDeps], { stdio: 'inherit', cwd: CWD });

    if (depInstallResult.status !== 0) {
        console.error('❌ Failed to install dependencies.');
    } else {
        console.log('✅ Dependencies installed.');
    }
} else {
    console.log(`\n✅ Tailwind and Vite are already present.`);
}

console.log(`\n🎉 All done! Codeplex libraries are ready to use.`);
