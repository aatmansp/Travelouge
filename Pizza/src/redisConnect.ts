import * as redis from 'redis';
import {promisify} from 'util';

const client = redis.createClient()
console.log("👉Redis connected");

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);
const DEL_ASYNC = promisify(client.del).bind(client);

export {GET_ASYNC, SET_ASYNC, DEL_ASYNC}