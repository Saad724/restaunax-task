import { Stack, Typography, Box, IconButton } from "@mui/material";
import AppCard from "../../../components/AppCard/AppCard";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { useEffect, useState } from "react";
import { Order } from "../../../../../shared/types";
import { userApi } from "../../../services/api";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "../../../utils/utils";
import Loader from "../../../components/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getOrders();
      setOrders(data);
    } catch (error: unknown) {
      console.error("Failed to fetch user orders", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch orders";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const columns = [
    { field: "orderType", headerName: "Type" },
    { field: "status", headerName: "Status" },
    {
      field: "total",
      headerName: "Total",
      valueFormatter: (params: { value: number }) =>
        formatCurrency(params.value),
    },
    {
      headerName: "Items",
      valueGetter: (params: { data?: { items?: unknown[] } }) =>
        params.data?.items?.length ?? 0,
    },
    {
      field: "createdAt",
      headerName: "Created",
      valueFormatter: (params: { value: string }) => formatDate(params.value),
    },
    {
      headerName: "Actions",
      cellRenderer: (props: { data?: { id?: string } }) => {
        const id = props.data?.id;
        if (!id) return null;
        return (
          <IconButton
            size="small"
            aria-label="View order"
            onClick={() => navigate(`/order/${id}`)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        );
      },
      flex: 0,
      width: 80,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <Stack gap={3}>
      <Typography
        component={Link}
        to="/"
        sx={{
          color: "primary.main",
          textDecoration: "none",
          width: "fit-content",
        }}
      >
        Back to menu
      </Typography>
      <AppCard>
        <Typography variant="h5" component="h1">
          My Orders
        </Typography>
        <Typography color={"text.disabled"} variant="subtitle2">
          Orders I have created so far!
        </Typography>
      </AppCard>
      <AppCard>
        {isLoading ? (
          <Box
            sx={{
              py: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </Box>
        ) : (
          <Table data={orders} columns={columns} />
        )}
      </AppCard>
    </Stack>
  );
};

export default MyOrders;
