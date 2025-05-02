import {initServer} from './packages/config/app.js'
import {config} from 'dotenv'
import {connect} from './packages/config/mongo.js'
import { addAdmin } from './packages/src/admin/admin.controller.js'

config()
connect()
initServer()
addAdmin()