#!/usr/bin/env node

const jules = require('./index.js');
const getStdin = require('get-stdin');

if (process.argv.length != 3) {
	console.log("Usage: command | jules '{expression}'");
}

const command = process.argv[2];

getStdin().then(str => {
	const data = JSON.parse(str);
	console.log(jules(data, command));
}).catch(err => {
	console.error(err);
	return -1;
});

