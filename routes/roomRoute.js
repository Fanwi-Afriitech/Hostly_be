

const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// Route to get all rooms
router.get('/getallrooms', async (req, res) => {
   try {
       const rooms = await Room.find({});
       res.send(rooms);
   } catch (error) {
       return res.status(400).json({ message: error.message });
   }
});
// Route to get a room
router.post('/getroombyid', async (req, res) => {
    const roomid= req.body.roomid;
    try {
        const room = await Room.findOne({_id: roomid});
        res.send(room);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
 });
 //add new room
 router.post('/addroom', async (req, res) => {
    
   try {
      const newroom = new Room(req.body )
       await newroom.save();
       res.send('New Room Added successfully');
   } catch (error) {
       return res.status(400).json({ message: error.message });
   }
});

module.exports = router;
