import GlobalResponse from "../models/global_response.js";

const getSidebarItems = async (req, res) => {
  try {
    const items = getSidebar();
    return res
      .status(200)
      .send(new GlobalResponse(true, "Items ferched successfully", items));
  } catch (err) {
    console.log(err);
  }
};

export default {
  getSidebarItems,
};
