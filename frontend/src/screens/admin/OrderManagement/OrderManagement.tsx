import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Table from "../../../components/Table/Table";
import Input from "../../../components/Input/Input";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { formatCurrency, formatDate } from "../../../utils/utils";
import { OrderItem, OrderStatus, OrderType } from "../../../../../shared/types";
import { Order } from "../../../../../shared/types";
import { ordersApi } from "../../../services/api";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { getSocket } from "../../../socket/socket";

/** Order with optional user (included by API) */
type OrderWithUser = Order & {
  user?: { id: string; name?: string; email?: string };
};

const orderItemsTableCols = [
  { field: "name", headerName: "Name" },
  { field: "quantity", headerName: "Qty" },
  {
    field: "price",
    headerName: "Price",
    valueFormatter: (params: { value: number }) => formatCurrency(params.value),
  },
  {
    headerName: "Total",
    valueGetter: (params: { data?: { quantity?: number; price?: number } }) =>
      formatCurrency((params.data?.quantity ?? 0) * (params.data?.price ?? 0)),
  },
];

const ORDER_STATUS_OPTIONS: { value: OrderStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "delivered", label: "Delivered" },
];

const ORDER_TYPE_OPTIONS: { value: OrderType | ""; label: string }[] = [
  { value: "", label: "All types" },
  { value: "delivery", label: "Delivery" },
  { value: "pickup", label: "Pickup" },
];

const ActionsCell = (props: {
  data?: { id?: string; status?: OrderStatus; items?: OrderItem[] };
  context?: {
    onViewItems?: (data: { items?: OrderItem[] }) => void;
    onUpdateStatus?: (data: { id?: string; status?: OrderStatus }) => void;
  };
}) => {
  const { onViewItems, onUpdateStatus } = props.context ?? {};
  const rowData = props.data ?? {};
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <IconButton
        size="small"
        onClick={() => onViewItems?.(rowData)}
        aria-label="View order items"
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onUpdateStatus?.(rowData)}
        aria-label="Update order status"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrderWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    status: OrderStatus;
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [typeFilter, setTypeFilter] = useState<OrderType | "">("");

  useEffect(() => {
    let cancelled = false;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await ordersApi.getOrders();
        if (!cancelled) setOrders(data as OrderWithUser[]);
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load orders",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const socket = getSocket();
      const handleOrderCreated = (order: OrderWithUser) => {
        setOrders((prev) => [order, ...prev]);
        toast.success('New Order Recieved!')
      };
      socket.on("order-created", handleOrderCreated);
      return () => {
        socket.off("order-created", handleOrderCreated);
      };
    } catch {
      return undefined;
    }
  }, []);

  const handleViewItems = (rowData: { items?: OrderItem[] }) => {
    setSelectedItems(rowData.items ?? []);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenStatusDialog = (rowData: {
    id?: string;
    status?: OrderStatus;
  }) => {
    if (!rowData.id || !rowData.status) return;
    setSelectedOrder({ id: rowData.id, status: rowData.status });
    setSelectedStatus(rowData.status);
    setStatusDialogOpen(true);
  };

  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
      setIsUpdating(true);
      await ordersApi.updateOrderStatus(selectedOrder.id, selectedStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: selectedStatus } : o,
        ),
      );
      toast.success("Order status updated");
      handleCloseStatusDialog();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const tableCols = [
    { field: "user.name", headerName: "Customer", flex: 0, width: 280 },
    { field: "orderType", headerName: "Type" },
    { field: "status", headerName: "Status" },
    {
      field: "total",
      headerName: "Total",
      valueFormatter: (params: { value: number }) =>
        formatCurrency(params.value),
    },
    {
      field: "createdAt",
      headerName: "Created",
      valueFormatter: (params: { value: string }) => formatDate(params.value),
    },
    {
      headerName: "Items",
      valueGetter: (params: { data?: { items?: unknown[] } }) =>
        params.data?.items?.length ?? 0,
    },
    {
      headerName: "Actions",
      cellRenderer: ActionsCell,
      flex: 0,
      width: 120,
      sortable: false,
      filter: false,
    },
  ];

  if (loading) {
    return (
      <Stack gap={5}>
        <Box>
          <Typography variant="h5" component="h1">
            Order Management
          </Typography>
          <Typography color={"text.disabled"} variant="subtitle2">
            Dashboard to easily manage all the orders
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ py: 4 }}
        >
          Fetching Records <Loader />
        </Stack>
      </Stack>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchStatus = !statusFilter || order.status === statusFilter;
    const matchType = !typeFilter || order.orderType === typeFilter;
    return matchStatus && matchType;
  });

  return (
    <Stack gap={5}>
      <Box>
        <Typography variant="h5" component="h1">
          Order Management
        </Typography>
        <Typography color={"text.disabled"} variant="subtitle2">
          Dashboard to easily manage all the orders
        </Typography>
      </Box>
      <Table
        columns={tableCols}
        data={filteredOrders}
        tableFilters={
          <Stack direction="row" alignItems="center" gap={2}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="order-status-filter-label">Status</InputLabel>
              <Select
                labelId="order-status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) =>
                  setStatusFilter((e.target.value as OrderStatus | "") ?? "")
                }
              >
                {ORDER_STATUS_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="order-type-filter-label">Type</InputLabel>
              <Select
                labelId="order-type-filter-label"
                value={typeFilter}
                label="Type"
                onChange={(e) =>
                  setTypeFilter((e.target.value as OrderType | "") ?? "")
                }
              >
                {ORDER_TYPE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        }
        context={{
          onViewItems: handleViewItems,
          onUpdateStatus: handleOpenStatusDialog,
        }}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order items</DialogTitle>
        <DialogContent>
          {selectedItems.length === 0 ? (
            <Typography color="text.secondary">
              No items in this order.
            </Typography>
          ) : (
            <Table
              columns={orderItemsTableCols}
              data={selectedItems}
              pagination={false}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

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
                setSelectedStatus((e.target.value as OrderStatus) ?? "pending")
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>Cancel</Button>
          <PrimaryButton
            onClick={handleUpdateStatus}
            disabled={isUpdating}
            smallBtn
          >
            {isUpdating ? "Updating..." : "Update"}
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default OrderManagement;
