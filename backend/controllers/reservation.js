import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js"; // Import the Reservation model

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please Complete the form", 400));
  }
  try {
    // Create a reservation object with the properties
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });
    res.status(200).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation, // Optionally, you can send the created reservation data back
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(' , '), 400));
    }
    return next(error);
  }
};
