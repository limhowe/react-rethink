import app from './express';
import rethinkdb from './rethinkdb';
import initPassport from './passport';

process.env.NODE_ENV = process.env.NODE_ENV || 'local'; // env is local by default

initPassport();
