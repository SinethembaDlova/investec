import {Server} from './server';
import {HomeRoute} from './routes/homeRoute';


var server = new Server();
var homeRoute = new HomeRoute

server.app.get('/', homeRoute.landHome);
