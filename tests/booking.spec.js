const { test } = require('@playwright/test');
const { BookingPage } = require('./BookingPage');

const user = {
  name: {
    firstName: 'John',
    lastName: 'Snow', 
  },
  email: 'john@wf.got', 
  phone: '12345678910',
};

const message = {
  subject: 'Hey there!',
  description: 'I just wanna left some feedback...',
};

test.describe('Hotel room booking', () => {

  test('should successfully sent a feedback', async ({ page }) => {
    const {
      subject,
      description,
    } = message;
    const {
      name: { firstName, lastName},
      email,
      phone,
    } = user;
    const bookingPage = new BookingPage(page);
    await bookingPage.load(); 
    await bookingPage.fillFeedbackDetails(
      `${firstName} ${lastName}`,
      email,
      phone,
      subject,
      description,
    );
    await bookingPage.sendFeedback();
    await bookingPage.verifyMessageSentSuccessfully();
  });

  test.fixme('should successfully book a room', async ({ page }) => {
    const { 
      name: { firstName, lastName},
      email,
      phone,
    } = user;
    const bookingPage = new BookingPage(page);
    await bookingPage.load(); 
    await bookingPage.expandBookingByRoomNumber(1);
    await bookingPage.selectDateRange(10, 12);
    await bookingPage.fillBookingDetails(
      firstName,
      lastName,
      email, 
      phone,
    );
    await bookingPage.bookRoom();
    await bookingPage.verifyBookingSuccessfully();
  });

});