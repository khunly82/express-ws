// modude es5/es2015
// const express = require('express');
// const app = express();

import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routing/routes.js';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log('le serveur ecoute le port ' + process.env.APP_PORT);
});
