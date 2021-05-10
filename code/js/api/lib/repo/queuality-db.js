'use strict'

let db

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const getAll = (col) => db.collection(col).find().toArray()

const get = (col, id, projection) => db.collection(col).findOne({_id : ObjectId(id)}, projection)

const insert = (col, document) => {
    return db.collection(col).findOneAndUpdate(document, { $set : document }, { upsert : true, returnNewDocument : true })
        .then(result => 
            result.lastErrorObject.upserted)
        }

const update = (col, id, object) => db.collection(col).findOneAndUpdate({_id : ObjectId(id)}, { $set : object })

const del = (col, id) => db.collection(col).deleteOne({_id : ObjectId(id)})

module.exports = {
    connection: async (url, dbName, callback) => {
        if(!url) return callback(Error('You should pass an url.'))
        const client = new MongoClient(url, { useUnifiedTopology: true })
        try {
            await client.connect()   
            db = client.db(dbName)
            console.log('Connected successfully to database.')
        }
        catch(e) {
            callback(e)
        }
        finally {
            //await client.close()
        }
    }, 
    methods: {getAll, get, insert, update, del}
}