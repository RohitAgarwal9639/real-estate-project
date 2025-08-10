import Listing from "../models/listing.model.js";

export const createListing=async (req, res, next) => {
    try{
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);
    }catch(error){
        next(error);
    }
}

export const deleteListing=async (req, res, next) => {
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(new Error('Listing not found'));
    }
    if(req.user.id !== listing.userRef){
        return next(new Error('You can only delete your own listings!'));
    }
    try{
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing deleted successfully!");
    }catch(error){
        next(error);
    }
}