const testMeeting = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/contact/meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: 'Test Meeting',
        email: 'tgs.admin001@gmail.com',
        company: 'Test Company',
        date: '2027-02-10',
        time: '14:00'
      })
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
testMeeting();
