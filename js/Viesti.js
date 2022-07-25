function sendEmail(teksti) {
  Email.send({
    Host:'smtp.sendmail.com',
    Username: 'Sender@email-address.com',
    Password: 'Enter your password',
    To: 'receiver@email_address.com',
    From: 'sender@email_address.com',
    Subject: teksti,
    Body: teksti,
  })
  .then(function(teksti)
    {
      alert('Sähköposti lähetetty!')
    })
}
