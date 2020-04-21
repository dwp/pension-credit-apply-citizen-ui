const graphlib = require('graphlib');
const dot = require('graphlib-dot');
const plan = require('../definitions/journey.js');

const graph = plan().getGraphStructure();
const json = JSON.stringify(graphlib.json.write(graph));
const newgraph = graphlib.json.read(JSON.parse(json));

process.stdout.write(dot.write(newgraph));
