const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Booking = require('../models/booking')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Nt6DvFFr1q0QPEdVKjl4sZG3bwOlhpG57tbvYKGrb4UzeOCRDwcLKMZzs5OlUsxXvL0q1sBHoMNtp8jWVfDi3uA00ST1Ab0uG')


// Route to get all rooms
router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token

    } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create(

            {

                amount: Math.round(totalamount*100),
                customer: customer.id,
                currency: 'USD',
                
                receipt_email: token.email
            }, {
            idempotencyKey: uuidv4()
        }
        )
        if (payment) {

        
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate,
                    todate,
                    totalamount,
                    totaldays,
                    transactionid: payment.id
                })

                // console.log("Booking Details being sent:", bookingDetails);
                const booking = await newbooking.save()
                // Find the room by its ID
                const roomtemp = await Room.findOne({ _id: room._id });
                if (!roomtemp) {
                    throw new Error('Room not found');
                }
                // const roomtemp = await Room.findOne({_id: room._id});

                roomtemp.currentbookings.push({
                    bookingid: booking._id.toString(),
                    fromdate: fromdate, todate: todate,
                    userid: userid, status: booking.status
                })
                await roomtemp.save()

        }
        res.send("Payment succesful, your room is booked")

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }


});
router.post('/getbookingsbyuserid', async (req, res) => {
    const userid= req.body.userid

    try {
        const bookings = await Booking.find({userid: userid});
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

});
router.get('/getallbookings', async (req, res) => {
    

    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

});


module.exports = router;