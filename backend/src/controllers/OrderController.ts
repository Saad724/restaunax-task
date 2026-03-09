import Utils from "../utils/utils"
import { Request, Response, NextFunction } from 'express';

const getAllOrders = (req: Request, res: Response, next: NextFunction) => {

}

const OrderController = {
    getAllOrders: Utils.wrapAsync(getAllOrders)
}

export default OrderController