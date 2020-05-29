/**
 * Generate some information about changes to locales/ dictionaries between two
 * points in time,
 *
 * Usage:
 * node locale-diff.js --from <from> [--to <to>] [--output <zip-filename>]
 *
 * Where:
 * zip-filename = Path to output file that wil be generated (default locale-diff.zip)
 * from = commit ref to start diff from
 * to = commit ref to stop diff at (default to HEAD of current branch)
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const SRC_PATH = 'locales/en/';

/* -------------------------------------------------------------------------- */

function log(msg) {
  process.stderr.write(`${msg}\n`);
}

function getCommits(from, to) {
  const cmd = `git rev-parse ${from} ${to}`;
  const commits = execSync(cmd).toString().split('\n');
  return { from: commits[0], to: commits[1] };
}

function getFileList(from, to) {
  const cmd = `git log --name-status --pretty="format:" ${from}..${to} -- ${SRC_PATH}`;
  const files = new Set();
  execSync(cmd).toString().split('\n').filter((f) => (f))
    .forEach((f) => {
      const parts = f.split('\t');
      files.add(parts[1]);
      if (parts[0].match(/^(R|C)/)) {
        files.add(parts[2]);
      }
    });
  return Array.from(files).sort();
}

function getRenamedFiles(from, to) {
  const cmd = `git log --name-status --pretty="format:" ${from}..${to} -- ${SRC_PATH}`;
  const files = {};
  execSync(cmd).toString().split('\n').filter((f) => (f))
    .forEach((f) => {
      const parts = f.split('\t');
      if (parts[0].match(/^(R|C)/)) {
        files[parts[1]] = parts[2]; /* eslint-disable-line prefer-destructuring */
      }
    });
  return files;
}

function retrieveFiles(commit, files, dir) {
  fs.mkdirSync(dir, { recursive: true });
  files.forEach((f) => {
    const filename = path.basename(f);
    const cmd = `git show ${commit}:${f}`;
    try {
      const content = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] });
      fs.writeFileSync(`${dir}/${filename}`, content, { encoding: 'utf8' });
      log(`- added    ${filename}`);
    } catch (e) {
      log(`- skipped  ${filename} (not found)`);
    }
  });
}


/* -------------------------------------------------------------------------- */

// Gather args
let from;
let to = 'HEAD';
let output = 'locale-diff.zip';
process.argv.forEach((arg, i) => {
  switch (arg) {
  case '--from': from = process.argv[i + 1]; break;
  case '--to': to = process.argv[i + 1]; break;
  case '--output': output = process.argv[i + 1]; break;
  default: // no action
  }
});

if (from === undefined) {
  throw new Error('Required argument missing: from');
}

// Make tmp dir to store files during zip construction
const DIR = fs.mkdtempSync(`${os.tmpdir()}/locale-diff-`);
log(`Created tmp directory in ${DIR}`);

// Build meta file
const commitRefs = getCommits(from, to);
const meta = {
  from: {
    input: from,
    commit: commitRefs.from,
  },
  to: {
    input: to,
    commit: commitRefs.to,
  },
  files: getFileList(from, to),
  renamed: getRenamedFiles(from, to),
};

if (!meta.files.length) {
  process.stderr.write('No files changed!');
  process.exit(1);
}

fs.writeFileSync(`${DIR}/meta.json`, JSON.stringify(meta));
log(`Wrote meta file to ${DIR}/meta.json`);

// Copy files in `from` and `to` commits
log(`Retrieving cy files from ${from} ...`);
retrieveFiles(from, meta.files.map(f => f.replace(/en\//, 'cy/')), `${DIR}/old-cy/`);

log(`Retrieving en files from ${from} ...`);
retrieveFiles(from, meta.files, `${DIR}/old/`);

log(`Retrieving en files from ${to} ...`);
retrieveFiles(to, meta.files, `${DIR}/new/`);

// ZIP
execSync('zip -r diff.zip *', {
  cwd: DIR,
});
execSync(`cp diff.zip ${path.resolve(process.cwd(), output)}`, {
  cwd: DIR,
});
