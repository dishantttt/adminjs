import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express, { json } from 'express'
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { User } from './newBackend/model/User.js'
import { features } from 'process'
import importExportFeature from '@adminjs/import-export'
import { Components,componentLoader } from './component.js'


const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}


AdminJS.registerAdapter({ 
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
 })

const mongooseDb = await mongoose.connect('mongodb+srv://aisharyanarya:aryan123@cluster0.ea5gsh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const UserResource = {
  resource: User,
  options: {
    actions: {
      myCustomAction: {
        actionType: 'record',
        component: Components.MyInput, // see "Writing your own Components"
        handler: async (request, response, context) => {
          const { record, currentAdmin } = context
          console.log(record);
          console.log(currentAdmin);
          return {
            record: record.toJSON(currentAdmin),
            msg: 'Hello world',
          }
        },
      },
    },
  },
  // features: [
  //   importExportFeature({componentLoader})
  // ]
}

const PORT = 3000

const start = async () => {
    const app = express()

    const admin = new AdminJS({
      resources: [UserResource],
      componentLoader,
    })

    // const MongoStore = connectMongo(session)
    // const sessionStore = new MongoStore({
    //   mongooseConnection: mongooseDb.connection,
    //   collection: 'sessions',
    // })

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
      {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
      }
    )

    // const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()