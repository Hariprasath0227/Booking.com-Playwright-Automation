import * as dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  url: process.env.APP_URL || 'https://www.booking.com',
  language: process.env.LANGUAGE || 'English (UK)',
  currency: process.env.CURRENCY || 'AUD',
  user: {
    firstName: process.env.USER_FIRST_NAME || 'Test',
    lastName: process.env.USER_LAST_NAME || 'User',
    email: process.env.USER_EMAIL || 'TestUser@gmail.com',
    phone: process.env.USER_PHONE || '123456789',
  },
  booking: {
    location: process.env.LOCATION || 'Kandy',
    checkInOffset: Number(process.env.CHECKIN_OFFSET) || 1,
    nights: Number(process.env.NIGHTS) || 2,
    adults: Number(process.env.ADULTS) || 2,
    children: Number(process.env.CHILDREN) || 1,
    rooms: Number(process.env.ROOMS) || 1,
    starRating: Number(process.env.STAR_RATING) || 5,
  }
};
