#!/usr/bin/env node
/**
 * Put every track of the registry in one folder, so the validator can check them
 * together (duplicate slugs and uids across tracks, prerequisites into other tracks):
 *
 *   node tools/assemble-registry.mjs <learning-hub checkout> <out dir>
 *   node .hub/packages/content/dist/cli.js <out dir>
 *
 * - reads tracks.yaml with parseRegistry() from @hub/content (build it first);
 * - downloads each track repo at its pinned commit (public repos, no token needed);
 * - checks the repo holds only tracks/<slug>/, then copies that folder;
 * - also copies tracks/ still kept in this repo (until every track has moved).
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [hubDir, outArg] = process.argv.slice(2);
if (!hubDir || !outArg) {
  console.error('usage: node tools/assemble-registry.mjs <learning-hub checkout> <out dir>');
  process.exit(2);
}
const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

const { parseRegistry, REGISTRY_FILE } = await import(
  pathToFileURL(resolve(hubDir, 'packages/content/dist/index.js')).href
);
const { entries, issues } = parseRegistry(readFileSync(REGISTRY_FILE, 'utf8'));
if (issues.length) fail(issues.map((i) => `${i.path}: ${i.message}`).join('\n✗ '));

const out = resolve(outArg);
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'tracks'), { recursive: true });

if (existsSync('tracks')) {
  for (const slug of readdirSync('tracks')) {
    cpSync(join('tracks', slug), join(out, 'tracks', slug), { recursive: true });
    console.log(`  tracks/${slug}  (this repo)`);
  }
}

for (const { slug, repo, commit } of entries) {
  const target = join(out, 'tracks', slug);
  if (existsSync(target)) fail(`track "${slug}" is both in this repo and in ${repo}`);

  const res = await fetch(`https://codeload.github.com/${repo}/tar.gz/${commit}`);
  if (!res.ok) fail(`${repo}@${commit.slice(0, 7)}: download failed (HTTP ${res.status})`);
  const work = mkdtempSync(join(tmpdir(), 'track-'));
  const archive = join(work, 'track.tgz');
  writeFileSync(archive, Buffer.from(await res.arrayBuffer()));
  const tar = spawnSync('tar', ['-xzf', 'track.tgz'], { cwd: work });
  if (tar.status !== 0) fail(`${repo}: could not unpack (${tar.stderr})`);

  const root = join(work, readdirSync(work).find((n) => n !== 'track.tgz'));
  const folders = existsSync(join(root, 'tracks')) ? readdirSync(join(root, 'tracks')) : [];
  if (folders.length !== 1 || folders[0] !== slug) {
    fail(`${repo} must contain exactly tracks/${slug}/ (found: ${folders.join(', ') || 'nothing'})`);
  }
  cpSync(join(root, 'tracks', slug), target, { recursive: true });
  rmSync(work, { recursive: true, force: true });
  console.log(`  tracks/${slug}  ${repo}@${commit.slice(0, 7)}`);
}
console.log(`✓ ${entries.length} track(s) from the registry → ${out}`);
