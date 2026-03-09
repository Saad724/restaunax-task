import OrderService from "../services/OrderServices";
import Utils from "../utils/utils"
import { Request, Response, NextFunction } from 'express';

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.query as {status: string};
        const orders = await OrderService.getAllOrders(status);
        return Utils.sendResponse(true, orders, 200, "Orders fetched successfully!");
    }
    catch(error: any){
        throw new Error(error);
    }
}

const OrderController = {
    getAllOrders
}

export default OrderController