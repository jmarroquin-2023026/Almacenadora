import {initServer} from './packages/config/app.js'
import {config} from 'dotenv'
import {connect} from './packages/config/mongo.js'

config()
connect()
initServer()