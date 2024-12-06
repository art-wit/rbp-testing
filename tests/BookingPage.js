const { expect } = require('@playwright/test');

class BookingPage {
  constructor(page) {
    this.page = page;

    // Feedback form
    this.contactName = page.getByTestId('ContactName');
    this.contactEmail =  page.getByTestId('ContactEmail');
    this.contactPhone = page.getByTestId('ContactPhone');
    this.contactSubject = page.getByTestId('ContactSubject');
    this.contactDescription = page.getByTestId('ContactDescription');
    this.feedBackButton = page.getByRole('button', { name: 'Submit' });

    // Booking form
    this.detailBookingButton = page.getByRole('button', { name: 'Book this room' });
    this.firstNameInput = page.locator('.room-firstname');
    this.lastNameInput = page.locator('.room-lastname');
    this.emailInput = page.locator('.room-email');
    this.phoneInput = page.locator('.room-phone');
    this.bookButton = page.locator('.btn.book-room:has-text("Book")');
  }

  async load() {
    await this.page.goto('https://automationintesting.online/');
  }

  async fillFeedbackDetails(name, email, phone, subject, description) {
    await this.contactName.fill(name);
    await this.contactEmail.fill(email);
    await this.contactPhone.fill(phone);
    await this.contactSubject.fill(subject);
    await this.contactDescription.fill(description);
  }

  async sendFeedback() {
    await this.feedBackButton.click();
  }

  async verifyMessageSentSuccessfully () {
    const successMessage = this.page.getByRole('heading', { name: 'Thanks for getting in touch' });
    await expect(successMessage).toBeVisible()
  }

  async expandBookingByRoomNumber(number){
    await this.detailBookingButton.nth(number - 1).click()
  }

  async selectDateRange(fromDay, tillDay) {
    const regFrom = new RegExp(String.raw`^${fromDay}$`);
    const regTill = new RegExp(String.raw`^${tillDay}$`);
    const from = this.page.locator('.rbc-date-cell').filter({ hasText: regFrom });
    const till = this.page.locator('.rbc-date-cell').filter({ hasText: regTill });
    await from.hover();
    await this.page.mouse.down();
    await till.hover();
    await this.page.mouse.up();
  }

  async fillBookingDetails(firstName, lastName, email, phone) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async bookRoom() {
    await this.bookButton.click();
  }

  async verifyBookingSuccessfully() {
    const successMessage = this.page.getByRole('heading', { name: 'Booking Successful!' });
    await expect(successMessage).toBeVisible();
  }

}

module.exports = { BookingPage };