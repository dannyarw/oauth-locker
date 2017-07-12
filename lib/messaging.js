var crypto = require('crypto');

module.exports = {
    // TODO ditambahin fungsi validasi MSISDN juga harusnya
    sendSms: function(msisdn, message, fcallback) {

        // Twilio Credentials 
        var accountSid = 'ACa09623e87c5b1998e5a43f3d8bf3260e';
        var authToken = '49c989a9e0e334d0501d8f263c941ac4';

        //require the Twilio module and create a REST client 
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
            from: "+17085014251 ",
            to: msisdn,
            body: message
        }, function(err, message) {
            if (err) {
                console.error(err.message);
                fcallback(err);
            } else {
                fcallback(null);
            }
        });
    }
}
