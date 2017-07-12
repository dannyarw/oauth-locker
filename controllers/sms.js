// Load required packages
var Client = require('../models/client');
var OTP = require('../models/otp.js');

const Util = require('../lib/util.js');
const messaging = require('../lib/messaging.js');

exports.getOTP = function(req, res) {
    console.log("getOTP: client_id = " + req.query.client_id);
    if (typeof req.query.client_id != 'undefined') {
        Client.find(req.query.client_id, function(err, data, client) {
            if (err) throw err;
            else {
                if (data == 0) { // client_id not found
                    res.status(403).send("client_id not registered");
                } else {
                    if (typeof req.query.msisdn == 'undefined') {
                        res.status(400).send("Msisdn not supplied");
                    } else {
                        // TODO submit OTP (send sms)
                        var otp = new OTP({ client_id: req.query.client_id, msisdn: Util.formatMsisdn(req.query.msisdn) });
                        otp.generate(function(err, otpCode) {
                            if (err) {
                                res.status(500).send("Internal Error");
                            } else {
                                messaging.sendSms("+62" + Util.formatMsisdn(req.query.msisdn), "Kode untuk masuk aplikasi ini adalah " + otpCode, function(err) {
                                    if (!err) {
                                        res.send("OTP Sent!");
                                    } else {
                                        res.status(500).send("Internal errow while sending OTP");
                                    }
                                });
                                res.send("OTP sent! ");
                                console.log("OTP = " + otpCode + ", msisdn = +62" + otp.msisdn);
                            }
                        });

                    }
                }
            }
        });
    } else {
        // TODO submit OTP and update DB
        res.status(400).send("getOTP: client_id not supplied");
    }
}

exports.validateOTP = function(req, res) {
    console.log("validateOTP: client_id = " + req.body.client_id + ", OTP = " + req.body.otp);
    if (typeof req.body.client_id != 'undefined') {
        Client.find(req.body.client_id, function(err, data, client) {
            if (err) throw err;
            else {
                if (data == 0) { // client_id not found
                    res.status(403).send("client_id not found");
                } else {
                    if (typeof req.body.msisdn == 'undefined') {
                        res.status(400).send("Msisdn not supplied");
                    } else if (typeof req.body.otp == 'undefined') {
                        res.status(400).send("OTP not supplied");
                    } else {
                        var otp = new OTP({ client_id: req.body.client_id, msisdn: Util.formatMsisdn(req.body.msisdn), value: req.body.otp });
                        // console.log("sebelum cek=" + otp.msisdn +",format=" + Util.formatMsisdn(req.body.msisdn));
                        otp.validateOtp(function(err, ret) {
                            if (err) {
                                res.status(500).send("Internal Error");
                            } else {
                                if (ret == 0) {
                                    res.send("OTP not valid :(");
                                } else {
                                    console.log("OTP valid");

                                    var data = { transaction_id: req.body.transaction_id };
                                    res.render('redirect', data);
                                }
                            }
                        })

                    }
                }
            }
        });
    } else {
        // TODO submit OTP and update DB
        res.status(400).send("validateOTP: client_id not supplied");
    }
}

function uid(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
