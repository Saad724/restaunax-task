import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Table from "../../../components/Table/Table";
import AppCard from "../../../components/AppCard/AppCard";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import Loader from "../../../components/Loader/Loader";
import { formatCurrency } from "../../../utils/utils";
import { RootState } from "../../../store/store";
import { clearCart, removeFromCart } from "../../../store/slice/CartSlice";
import { ordersApi } from "../../../services/api";
import { OrderItem } from "../../../../../shared/types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";

const RemoveCartItemButton = (props: {
  data?: { id?: string };
  context?: { onRemove?: (id: string) => void };
}) => {
  const onRemove = props.context?.onRemove;
  const id = props.data?.id;
  if (!id) return null;
  return (
    <IconButton
      size="small"
      onClick={() => onRemove?.(id)}
      aria-label="Remove from cart"
      color="error"
    >
      <DeleteOutlineIcon fontSize="small" />
    </IconButton>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const cartTableCols = [
    { field: "name", headerName: "Item" },
    { field: "quantity", headerName: "Quantity" },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: (params: { value: number }) =>
        formatCurrency(params.value),
    },
    {
      headerName: "Total",
      valueGetter: (params: { data?: { quantity?: number; price?: number } }) =>
        formatCurrency(
          (params.data?.quantity ?? 0) * (params.data?.price ?? 0),
        ),
    },
    {
      headerName: "Actions",
      cellRenderer: RemoveCartItemButton,
      flex: 0,
      width: 100,
      sortable: false,
      filter: false,
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const handleProceedToOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    try {
      setIsOrdering(true);
      await ordersApi.createOrder("delivery", cartItems as OrderItem[]);
      dispatch(clearCart());
      toast.success("Order created successfully!");
      navigate("/");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Order failed");
    } finally {
      setIsOrdering(false);
    }
  };

  if (cartItems.length === 0 && !isOrdering) {
    return (
      <AppCard>
        <Stack gap={1} justifyContent={"center"} alignItems={"center"}>
          <FontAwesomeIcon icon={faCartFlatbed} size="2x" color="#d1d1d1" />
          <Typography color="text.disabled">Your cart is empty.</Typography>
          <PrimaryButton
            onClick={() => navigate("/")}
            sx={{ width: "fit-content" }}
            smallBtn
          >
            Browse menu
          </PrimaryButton>
        </Stack>
      </AppCard>
    );
  }

  return (
    <Stack gap={3}>
      <Typography variant="h5" component="h1">
        Cart
      </Typography>
      <Typography color="text.disabled" variant="subtitle2">
        Review your items and proceed to order
      </Typography>
      <AppCard sx={{ overflow: "hidden" }}>
        <Table
          columns={cartTableCols}
          data={cartItems}
          pagination={false}
          context={{ onRemove: handleRemoveFromCart }}
        />
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Order total</Typography>
            <Typography variant="h6">{formatCurrency(total)}</Typography>
          </Stack>
        </Box>
      </AppCard>
      <Stack alignItems={"flex-end"}>
        <PrimaryButton
          onClick={handleProceedToOrder}
          disabled={isOrdering}
          sx={{ width: "100%", maxWidth: 200 }}
        >
          {isOrdering ? <Loader /> : "Order Now"}
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default Cart;
