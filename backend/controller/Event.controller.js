import Event from '../models/Event.model.js'

export const getEvent=async(req,res)=>{
    try{
        const events =await Event.find({});
        res.status(200).json({sucess:true, data:events});
    }catch(error){
        console.error("error in fetching the users",error.message);
        res.status(500).json({sucess:false,message:"Server Error"});    
    }
};

























// export const createEvent=async(req, res) => {
//     const event = req.body; 
//     if (!event.name || !event.data || !event.location || !event.description) {
//         return res.status(400).json({ success: false, message: "Please provide all fields" });
//     }
    
//     const newEvent = new Event(event);
    
//     try {
//         await newEvent.save();
//         res.status(201).json({ success: true, data: newPatient });
//     } catch (error) {
//         console.error("Error in creating user:", error.message); 
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// export const updateEvent= async(req,res)=>{
//     const { _id } = req.params;
//     const updatedData = req.body;

//     try {
//         const event = await Event.findById(_id);
//         if (!event) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         const updatedEvent = await Event.findByIdAndUpdate(_id, updatedData, { new: true });
//         res.status(200).json({ success: true, message: "User updated", event: updatedEvent });
//     } catch (error) {
//         console.error("Error in updating user:", error.message);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// export const deleteEvent= async (req, res) => {
//     const { _id } = req.params;
//     try {
//         const event = await Event.findById(_id);
//         if (!event) {
//             return res.status(404).json({ success: false, message: "User not found"});
//         }

//         await Event.findByIdAndDelete(_id);
//         res.status(200).json({ success: true, message: "User deleted" });
//     } catch (error) {
//         console.error("Error in deleting user:", error.message);    
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// }