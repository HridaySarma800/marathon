import GlobalResponse from "../models/global_response.js";
import getSidebar from "../utils/sidebar_mapper.js";
const getSidebarItems = async (req, res) => {
  try {
    const items = getSidebar(req.user.role);
    return res
      .status(200)
      .send(new GlobalResponse(true, "Items fetched successfully", items));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(new GlobalResponse(false, "Failed to fetch items", {}));
  }
};

export default {
  getSidebarItems,
};
