import mongoose from 'mongoose';
import validator from 'validator';

const reservationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters"],
        maxLength: [30, "First Name cannot exceed 30 Characters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters"],
        maxLength: [30, "Last Name cannot exceed 30 Characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email address"],
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isNumeric(value) && value.length === 10;
            },
            message: "Phone Number must contain exactly 10 digits",
        },
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export const Reservation = mongoose.model('Reservation', reservationSchema);
