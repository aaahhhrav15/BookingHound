const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    nights: {
        type: Number
    },
    days: { 
        type: Number 
    },
    destinationItinerary: { 
        type: Object 
    },
    images: { 
        type: Object 
    },
    inclusions: { 
        type: Object 
    },
    themes: { 
        type: Object 
    },
    price: { 
        type: Number 
    },
    destinationDetails: { 
        type: Object 
    },
    detailedItinerary: { 
        type: Object 
    },
    description: { 
        type: String 
    },
    packageItinerary: { 
        type: Object 
    },
    scrapedOn: { 
        type: Date , 
        default:Date.now 
    } 
});

export const Trips = mongoose.models.trip || mongoose.model('trip', tripSchema);

