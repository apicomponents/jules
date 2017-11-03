const validIdentifier = require('valid-identifier');

module.exports = function jules(data, command) {
	const fun = makeFun(Object.keys(data), command)
	return fun(data);
}

function makeFun(keys, command) {
	const identKeys = keys.filter(key => validIdentifier(key));
	const splat = `{${[...identKeys, '..._'].join(', ')}}`;
	const src = `(${splat}) => { return ${command} }`;
	return eval(src);
}
