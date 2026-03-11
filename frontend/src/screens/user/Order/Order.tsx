import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AppCard from "../../../components/AppCard/AppCard";
import Loader from "../../../components/Loader/Loader";
import Table from "../../../components/Table/Table";
import { toast } from "react-toastify";
import { ordersApi } from "../../../services/api";
import {
  Order as OrderType,
  OrderItem,
  OrderStatus,
} from "../../../../../shared/types";
import { formatCurrency, formatDate } from "../../../utils/utils";
import { getSocket } from "../../../socket/socket";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Input from "../../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cancelLoader, setCancelLoader] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const orderId = id?.trim();
  if (!orderId) {
    setOrder(null);
    setErrorMessage("Missing order id.");
    return;
  }

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await ordersApi.getOrderById(orderId);

      setOrder(data);
      setSelectedStatus(data.status as OrderStatus);
    } catch (err: unknown) {
      console.error("Failed to fetch order by id", err);
      const message =
        err instanceof Error ? err.message : "Failed to load order.";

      setOrder(null);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusChange = (order: OrderType) => {
    setOrder(order);
  };

  useEffect(() => {
    try {
      const socket = getSocket();
      console.log("socket", socket);
      if (!socket) {
        return;
      }
      socket.on("order-status-change", handleStatusChange);
      return () => {
        socket.off("order-status-change", handleStatusChange);
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  const cancelOrder = async () => {
    try {
      const socket = getSocket();
      setCancelLoader(true);
      if (!order) {
        return;
      }
      const updatedOrder = await ordersApi.updateOrderStatus(
        order?.id,
        "cancelled",
      );
      setOrder((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          status: "cancelled",
        };
      });
      if (socket) {
        socket.emit("order-cancelled", updatedOrder);
      }
      toast.success("Order Cancelled Successfully!");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setCancelLoader(false);
    }
  };

  const handleAdminUpdateStatus = async () => {
    if (!order) return;
    try {
      setIsUpdatingStatus(true);
      await ordersApi.updateOrderStatus(order.id, selectedStatus);
      setOrder((prev) =>
        prev ? { ...prev, status: selectedStatus } : prev,
      );
      toast.success("Order status updated");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status",
      );
    } finally {
      setIsUpdatingStatus(false);
      handleCloseStatusDialog()
    }
  };

  const handleOpenStatusDialog = () => {
    if (!order) return;
    setSelectedStatus(order.status as OrderStatus);
    setStatusDialogOpen(true);
  };

  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
  };

  const itemsTableCols = useMemo(
    () => [
      { field: "name", headerName: "Item" },
      { field: "quantity", headerName: "Quantity" },
      {
        field: "price",
        headerName: "Price",
        valueFormatter: (params: { value: number }) =>
          formatCurrency(params.value),
      },
      {
        headerName: "Line total",
        valueGetter: (params: { data?: Partial<OrderItem> }) => {
          const quantity = Number(params.data?.quantity ?? 0);
          const price = Number(params.data?.price ?? 0);
          return formatCurrency(quantity * price);
        },
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <AppCard>
        <Stack justifyContent="center" alignItems="center" sx={{ py: 6 }}>
          <Loader />
        </Stack>
      </AppCard>
    );
  }

  if (errorMessage || !order) {
    return (
      <Stack gap={2}>
        <Box>
          <Typography variant="h5" component="h1">
            Order
          </Typography>
          <Typography color="text.disabled" variant="subtitle2">
            View order details
          </Typography>
        </Box>

        <AppCard>
          <Stack gap={1}>
            <Typography color="error">
              {errorMessage ?? "Order not found."}
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{ color: "primary.main", textDecoration: "none" }}
            >
              Back to menu
            </Typography>
          </Stack>
        </AppCard>
      </Stack>
    );
  }

  return (
    <Stack gap={3}>
      <Typography
        onClick={() => navigate(-1)}
        sx={{
          color: "primary.main",
          textDecoration: "none",
          width: "fit-content",
          cursor: 'pointer'
        }}
      >
        Go Back
      </Typography>
      <AppCard>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1}
        >
          <Box>
            <Typography variant="h5" component="h1">
              Order details
            </Typography>
            <Typography color="text.disabled" variant="subtitle2">
              Order ID: {order.id}
            </Typography>
          </Box>
          <Stack direction="row" gap={1} alignItems="center">
            <Chip label={`Status: ${order.status}`} variant="outlined" />
            <Chip label={`Type: ${order.orderType}`} variant="outlined" />
            {userInfo?.role === "admin" && order.status !== "cancelled" && (
              <IconButton
                size="small"
                aria-label="Update status"
                onClick={handleOpenStatusDialog}
              >
                <FontAwesomeIcon icon={faPen} size="sm" />
              </IconButton>
            )}
          </Stack>
        </Stack>

      </AppCard>

      <AppCard>
        <Stack gap={2}>
          <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography color="text.disabled">User</Typography>
              <Typography>{order?.user?.name}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography color="text.disabled">Created</Typography>
              <Typography>{formatDate(String(order.createdAt))}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography color="text.disabled">Items</Typography>
              <Typography>{order.items?.length ?? 0}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography color="text.disabled">Total</Typography>
              <Typography variant="h6">
                {formatCurrency(order.total)}
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ borderTop: 1, borderColor: "divider" }} />

          <Box sx={{ overflow: "hidden" }}>
            <Table
              columns={itemsTableCols}
              data={order.items ?? []}
              pagination={false}
            />
          </Box>
        </Stack>
        {order?.status === "pending" && userInfo?.role === "user" && (
          <Stack alignItems={"flex-end"} sx={{ marginBlock: "20px" }}>
            <PrimaryButton
              smallBtn
              onClick={cancelOrder}
              disabled={cancelLoader}
            >
              {cancelLoader ? <Loader /> : "Cancel Order"}
            </PrimaryButton>
          </Stack>
        )}
      </AppCard>

      {userInfo?.role === "admin" && (
        <Dialog
          open={statusDialogOpen}
          onClose={handleCloseStatusDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Update order status</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <Input
                name="status"
                type="text"
                label="Status"
                select
                options={ORDER_STATUS_OPTIONS}
                value={selectedStatus}
                onChange={(e: { target: { value: unknown } }) =>
                  setSelectedStatus(
                    (e.target.value as OrderStatus) ?? "pending",
                  )
                }
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatusDialog}>Cancel</Button>
            <PrimaryButton
              onClick={handleAdminUpdateStatus}
              disabled={isUpdatingStatus}
              smallBtn
            >
              {isUpdatingStatus ? "Updating..." : "Update"}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
};

export default Order;
