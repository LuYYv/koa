import { query } from '../ultis/mysql';
import userServer from './user';

const _props = { Query: query }


export const userService = new userServer(_props);