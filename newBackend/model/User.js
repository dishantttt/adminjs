import mongoose from "mongoose";


const nameSchema = new mongoose.Schema({
    first: {
        type: String,
        trim: true
    },
    middle: {
        type: String,
        trim: true,
        default: ''
    },
    last: {
        type: String,
        trim: true
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: nameSchema,
    title: {
        type: String,
        required: true,
        enum: ['Prof.', 'Dr.', 'Mr.', 'Mrs.', 'Ms.']
    },
    designation: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    foodPreference: {
        type: String,
        required: true,
        enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain']
    },
    // Tip for frontend dev ---> use these correct strings in same case and indentations and take the input from user using select and option tag or Radio Button only 

    paperId: {
        type: String,
        default: '' //optional
    },
    registrationCategory: {
        type: String,
        required: true,
        enum: [
            'ISET member (SAARC)',
            'Non-ISET member (SAARC)',
            'Bonafide Student (SAARC)',
            'Accompany Person (SAARC)',
            'Foreign Delegate',
            'Student (Foreign)',
            'Accompanying Person (Foreign)'
        ]
    },
    // Tip for frontend dev ---> use these correct strings in same case and indentations and take the input from user using select and option tag only 

    isetMembershipNumber: {
        type: String,
        trim: true,
        default: '' // for ISET members only
    },

    studentIdCopy: {
        type: String,
        trim: true,
        default: '' // Only for students
    },

    accompanyingPersonDetails: {
        type: String,
        trim: true,
        default: '' // Optional field
    },

    // Tip for frontend dev ---> in react hook registration fee with valid enum registrationCategory

    registrationFee: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});



export const User = mongoose.model('User', userSchema);

