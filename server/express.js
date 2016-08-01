import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import consolidate from 'consolidate';

import config from './config';

const app = express();
const port = process.env.PORT || config.port;

app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));
app.use(bodyParser.json({
	limit : '100kb'
}));

// start listening
app.server.listen(port);

// public
// app.use(express.static('public'));

// setting template engine
app.engine('html', consolidate.swig);
app.set('views', path.resolve('./server/views'));
app.set('view engine', 'html');

// including all routes
glob('./routes/*.js', { cwd: path.resolve('./server') }, (err, routes) => {
	if (err) {
		console.log(chalk.red(`Error occured including routes`));
		return;
	}
	routes.forEach((routePath) => {
		require(routePath).default(app);
	});
	console.log(chalk.green(`included ${routes.length} route files`));
});

console.log(chalk.green(`Started on port ${app.server.address().port}`));

export default app;
