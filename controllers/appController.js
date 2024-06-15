require('dotenv').config({path:'./env'});


const getSidebarItems = async (req, res) => {
    try {
        
     return res.status(401).send("Authentication failed");
    } catch (err) {
        console.log(err);
    }

}


export default {
    getSidebarItems,
};


