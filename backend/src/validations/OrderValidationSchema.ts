import Joi from "joi";
import { Segments } from "celebrate";

const orderStatus = Joi.string().valid("pending", "preparing", "ready", "delivered", "cancelled");
const orderType = Joi.string().valid("delivery", "pickup");
const uuid = Joi.string().uuid({ version: "uuidv4" });

const orderItemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
});

export const listOrdersQuerySchema = {
  [Segments.QUERY]: Joi.object({
    status: orderStatus.optional(),
  }),
};

export const getOrderByIdParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    id: uuid.required(),
  }),
};

export const createOrderBodySchema = {
  [Segments.BODY]: Joi.object({
    orderType: orderType.required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
  }),
};

export const updateOrderStatusSchema = {
  [Segments.PARAMS]: Joi.object({
    id: uuid.required(),
  }),
  [Segments.BODY]: Joi.object({
    status: orderStatus.required(),
  }),
};
