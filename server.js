const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("./db");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();
app.use(cors())

const { Schema, model } = require("mongoose");
const { response } = require("express");
const patientSchema = new Schema({

    patientname: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    dateofbirth: {
        type: Schema.Types.String,
        required: true
    },

    gender: {
        type: Schema.Types.String,
    },

    placeofbirth: {
        type: Schema.Types.String,
    },

    bloodgroup: {
        type: Schema.Types.String,
    },

    height: {
        type: Schema.Types.String,
    },

    weight: {
        type: Schema.Types.String,
    }

})

const PatientModel = model("Patient", patientSchema);

const administerPatientSchema = new Schema({

    nameofthepatient: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    dateofbirth: {
        type: Schema.Types.String,
        required: true
    },

    vaccination: {
        type: Schema.Types.String,
    },

    dateadministered: {
        type: Schema.Types.String,
    },

    brandname: {
        type: Schema.Types.String,
    },

    givenat: {
        type: Schema.Types.String,
    }

})

const AdministerPatientModel = model("AdministerPatient", administerPatientSchema);


const patients = [{}]

const administerPatients = [{}]


const schema = buildSchema(`
type Query{
    patients : [Patient!]!
    administerPatients : [AdministerPatient!]!
}
type Mutation {
    createPatient(data : CreatePatientInput) : Patient!
    createAdministerPatient(data : createAdministerPatientInput) : AdministerPatient!
}
input CreatePatientInput {
    patientname : String!
    dateofbirth : String!
    gender : String!
    placeofbirth : String!
    bloodgroup : String!
    height : String!
    weight : String!
}
input createAdministerPatientInput {
    nameofthepatient : String!
    dateofbirth : String!
    vaccination : String!
    dateadministered : String!
    brandname : String!
    givenat : String!
}
type Patient {
    id : ID!
    patientname : String!
    dateofbirth : String!
    gender : String!
    placeofbirth : String!
    bloodgroup : String!
    height : String!
    weight : String!
    }
type AdministerPatient {
    id : ID!
    nameofthepatient : String!
    dateofbirth : String!
    vaccination : String!
    dateadministered : String!
    brandname : String!
    givenat : String!
    }
`)

const rootValue = {

    patients: async () => {
        try {
            const patients = PatientModel.find();
            return patients;
        } catch (error) {
            throw new Error(error)
        }
    },

    createPatient: async (args) => {
        try {
            const newPatient = new PatientModel(args.data)
            const createdPatient = await newPatient.save()
            return { ...createdPatient._doc, id: createdPatient._id }
        } catch (error) {
            throw new Error(error)
        }
    },

    administerPatients: async () => {
        try {
            const administerPatients = AdministerPatientModel.find();
            return administerPatients;
        } catch (error) {
            throw new Error(error)
        }
    },

    createAdministerPatient: async (args) => {
        try {
            const administerPatient = new AdministerPatientModel(args.data)
            const createdAdministerPatient = await administerPatient.save()
            return { ...createdAdministerPatient._doc, id: createdAdministerPatient._id }
        } catch (error) {
            throw new Error(error)
        }
    },

}

app.get("/", (request,response) => {
    response.send("success");
})

app.use("/gq", graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

// app.listen(9090, () => console.log("Server started at PORT : 9090"))

const PORT = process.env.PORT || 9090

app.listen(PORT, () => console.log("Server started at PORT : " + PORT))