import {Server} from './api/server';
import {HomeRoute} from './api/routes/homeRoute';


var server = new Server();
var homeRoute = new HomeRoute

server.app.get('/', homeRoute.landHome);
