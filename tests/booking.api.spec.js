const {  test, expect } = require('@playwright/test');

const sendedMessage1 = {
  name : "John Snow",
  email : "john@wf.got",
  phone : "12345678910",
  subject : "Winterfell booking", 
  description : "I wanna hold a room..."
};

const sendedMessage2 = {
  name : "Bran Stark",
  email : "bran@wf.got",
  phone : "12345678910",
  subject : "King's Landing booking", 
  description : "I would like to book the royal suite!"
};

test.describe('Booking messages API', () => {

  test('should post a new message', async ({ request }) => {

    // Send message and recieve messageid
    const postResponse = await request.post('/message/', {
      data: sendedMessage1,
    });
    expect(postResponse.ok()).toBeTruthy();
    const { messageid: id } = await postResponse.json();

    // Ensure message with given id exists on the server
    const getResponse = await request.get(`/message/${id}`);
    expect(getResponse.ok()).toBeTruthy();

    // Cleanup
    const deleteResponse = await request.delete(`/message/${id}`);
    expect(deleteResponse.ok()).toBeTruthy();

  });

  test('should get all sended messages', async ({ request }) => {

    const sendedMessages = [sendedMessage1, sendedMessage2];
    const sendedIds = [];
    
    // Send messages
    for (const sendedMessage of sendedMessages) {
      const postResponse = await request.post('/message/', {
        data: sendedMessage,
      });
      expect(postResponse.ok()).toBeTruthy();
      const { messageid } = await postResponse.json();
      sendedIds.push(messageid);
    }

    // Get messages
    const response = await request.get('/message/');
    expect(response.ok()).toBeTruthy();
    const { messages } = await response.json();

    // 💩
    const clearedRecievedMessages = extractBySchema(messages);
    const clearedSendedMessages =  extractBySchema(sendedMessages);

    // Ensure sended messages is here
    expect(clearedRecievedMessages).toEqual(expect.arrayContaining(clearedSendedMessages));

    // Cleanup
    for (const id of sendedIds) {
      const deleteResponse = await request.delete(`/message/${id}`);
      expect(deleteResponse.ok()).toBeTruthy();
    }

  });

});

function extractBySchema(arr) {
  return arr.map(({
    name,
    subject,
  }) => ({
    name,
    subject,
  }))
}