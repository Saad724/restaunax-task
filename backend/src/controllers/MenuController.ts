import { Request, Response, NextFunction } from "express";
import MenuService from "../services/MenuService";
import Utils from "../utils/utils";

const getMenu = async (_req: Request, _res: Response, _next: NextFunction) => {
  try {
    const menuItems = await MenuService.getMenu();
    return Utils.sendResponse(true, menuItems, 200, "Menu fetched successfully!");
  } catch (error: unknown) {
    console.error("Failed to fetch menu", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch menu";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const MenuController = {
  getMenu,
};

export default MenuController;

