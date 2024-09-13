#!/usr/bin/env node

/**
 * LittleJS Build System
 */

"use strict";
const fs = require("node:fs");
const child_process = require("node:child_process");

console.log("Running Debug Build");

////////////////////////////////////////
//Define build-time constants
const BUILD_FOLDER = "build";

////////////////////////////////////////
// Collect source files
const sourceFiles = [];
const sources = ["state", "stages", "game-objects", "util", "powerups"];

const vendorFiles = [
  "./vendor/src/engineUtilities.js",
"./vendor/src/engineSettings.js",
"./vendor/src/engineObject.js",
"./vendor/src/engineDraw.js",
"./vendor/src/engineInput.js",
"./vendor/src/engineAudio.js",
"./vendor/src/engineTileLayer.js",
"./vendor/src/engineParticles.js",
"./vendor/src/engine.js"
];

//vendorFiles.forEach(v => sourceFiles.push(v));

//sourceFiles.push("./vendor/littlejs/littlejs.min.js");

for (let source of sources) {
  findGameFiles("./src", source, sourceFiles);
}

//sourceFiles.push("./src/game.js");

console.log("Found Source Files:");
console.log(sourceFiles);

////////////////////////////////////////
// Collect Assets
const assets = [];
findGameAssets(assets);

////////////////////////////////////////
// Cleanup from previous build
fs.rmSync(BUILD_FOLDER, { recursive: true, force: true });
fs.mkdirSync(BUILD_FOLDER);

////////////////////////////////////////
// Move assets to build directory
for (const src of assets) {
  let file = src.split('/')[2]
  fs.copyFileSync(src, `${BUILD_FOLDER}/${file}`);
}

////////////////////////////////////////
// Compile

Build(`${BUILD_FOLDER}`, sourceFiles, [
 // closureCompilerStep,
  uglifyBuildStep,
//  roadrollerBuildStep,
//  htmlBuildStep,
]);

////////////////////////////////////////
// Compilation steps
// A single build with its own source files, build steps, and output file
// - each build step is a callback that accepts a single filename
function Build(outputDir, files = [], buildSteps = []) {
  // copy files into a buffer
  let buffer = "";
  for (const file of files) 
  {
    const parts = file.split("/");
    const name = parts[parts.length -1];
    buffer = fs.readFileSync( file) ;
    fs.writeFileSync(outputDir+ "/ugly." + name, buffer, { flag: "w+" });
    for (const buildStep of buildSteps) buildStep(outputDir+ "/ugly." + name);
  }

  // output file
  

  // execute build steps in order
  
}

function closureCompilerStep(filename) {
  console.log(`Running closure compiler...`);

  const filenameTemp = filename + ".tmp";
  fs.copyFileSync(filename, filenameTemp);
  child_process.execSync(
    `npx google-closure-compiler --js=${filenameTemp} --js_output_file=${filename} --compilation_level=ADVANCED --language_in=ECMASCRIPT_2021 --language_out=ECMASCRIPT_2021 --warning_level=VERBOSE --jscomp_off=* --assume_function_wrapper`,
    { stdio: "inherit" }
  );
  fs.rmSync(filenameTemp);
}

function uglifyBuildStep(filename) {
  console.log(`Running uglify...`);
  child_process.execSync(`npx uglifyjs ${filename} -c -m --mangle-props -o ${filename}`, {
    stdio: "inherit",
  });
}

function roadrollerBuildStep(filename) {
  console.log(`Running roadroller...`);
  child_process.execSync(`npx roadroller ${filename} -o ${filename}`, {
    stdio: "inherit",
  });
}

function htmlBuildStep(filename) {
  console.log(`Building html...`);

  // create html file
  let buffer = "";
  buffer += "<html><head></head><body><script>";
  buffer += fs.readFileSync(filename);
  buffer += "</script></body></html>";

  // output html file
  fs.writeFileSync(`${BUILD_FOLDER}/index.html`, buffer, { flag: "w+" });
}

////////////////////////////////////////
// Utility Methods

// recursive search for files within a given directory
function findGameFiles(path, entry, gameFiles) {
  let target = `${path}/${entry}`;

  if (fs.lstatSync(target).isFile() && target.endsWith(".js")) {
    gameFiles.push(target);
    return;
  }

  let contents = fs.readdirSync(target);

  for (let content of contents) {
    let childDir = `${path}/${entry}`;

    findGameFiles(childDir, content, gameFiles);
  }
}

function findGameAssets(gameFiles, path='./assets') {
  let target = `${path}`;

  if (fs.lstatSync(target).isFile()) {
    gameFiles.push(target);
    return;
  }

  let contents = fs.readdirSync(target);

  for (let content of contents) {
    let childDir = `${path}/${content}`;

    findGameAssets(gameFiles, childDir);
  }
}
