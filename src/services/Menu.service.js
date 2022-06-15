import RestService from "@/services/Rest.service";

const MenuService = {
  /**
   * Get all people with planet name included
   * @returns {Array}
   */
  async getCoffeeMenu() {
    // Range starts from A2 to avoid including table headers
    const menu = await RestService.get("menu_coffee!A2:Z1000");
    return menu;
  },

  async getFoodMenu() {
    // Range starts from A2 to avoid including table headers
    const menu = await RestService.get("menu_food!A2:Z1000");
    return menu;
  },
};

export default MenuService;
