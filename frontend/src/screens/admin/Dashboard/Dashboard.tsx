import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import AppCard from "../../../components/AppCard/AppCard";
import Loader from "../../../components/Loader/Loader";
import { adminApi, AdminDashboardStats } from "../../../services/api";
import { toast } from "react-toastify";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

type StatCardProps = {
  label: string;
  value: number;
};

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <AppCard sx={{ flex: 1, minWidth: 220 }}>
      <Stack gap={0.5}>
        <Typography color="text.disabled" variant="subtitle2">
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
          {value}
        </Typography>
      </Stack>
    </AppCard>
  );
};

type PieChartCardProps = {
  title: string;
  labels: string[];
  values: number[];
};

const PieChartCard = ({ title, labels, values }: PieChartCardProps) => {
  const data = useMemo(() => {
    const colors = [
      "#4e79a7",
      "#59a14f",
      "#f28e2b",
      "#e15759",
      "#b07aa1",
      "#76b7b2",
      "#9c9c9c",
    ];

    return {
      labels,
      datasets: [
        {
          label: "Orders by status",
          data: values.map((v) => Number(v ?? 0)),
          backgroundColor: labels.map((_, idx) => colors[idx % colors.length]),
          borderWidth: 0,
        },
      ],
    };
  }, [labels, values]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right" as const,
          labels: {
            boxWidth: 10,
            boxHeight: 10,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  }, []);

  return (
    <AppCard sx={{ flex: 1, minWidth: 320 }}>
      <Stack gap={2}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ height: 260 }}>
          {labels.length === 0 ? (
            <Typography color="text.disabled" variant="body2">
              No data available.
            </Typography>
          ) : (
            <Pie data={data} options={options} />
          )}
        </Box>
      </Stack>
    </AppCard>
  );
};

type BarChartCardProps = {
  title: string;
  labels: string[];
  values: number[];
};

const BarChartCard = ({ title, labels, values }: BarChartCardProps) => {
  const theme = useTheme();
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Orders per day",
          data: values.map((v) => Number(v ?? 0)),
          backgroundColor: theme.palette.primary.main,
          borderRadius: 8,
          maxBarThickness: 28,
        },
      ],
    };
  }, [labels, values]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: true },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(148, 163, 184, 0.25)" },
          ticks: { precision: 0 },
        },
      },
    };
  }, []);

  return (
    <AppCard sx={{ flex: 1, minWidth: 320 }}>
      <Stack gap={2}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ height: 260 }}>
          {labels.length === 0 ? (
            <Typography color="text.disabled" variant="body2">
              No data available.
            </Typography>
          ) : (
            <Bar data={data} options={options} />
          )}
        </Box>
      </Stack>
    </AppCard>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const data = await adminApi.getDashboard();
      setStats(data);
    } catch (error: unknown) {
      console.error("Failed to fetch dashboard", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch dashboard";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const countStats = stats?.countStats;
  const pie = stats?.dataStats?.pieChartData;
  const bar = stats?.dataStats?.barChartData;

  const pieLabels = pie?.labels ?? [];
  const pieValues = pie?.datasets?.[0]?.data ?? [];
  const barLabels = bar?.labels ?? [];
  const barValues = bar?.datasets?.[0]?.data ?? [];

  if (isLoading) {
    return (
      <AppCard>
        <Stack justifyContent="center" alignItems="center" sx={{ py: 6 }}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography>Fetching Stats</Typography>
            <Loader />
          </Stack>
        </Stack>
      </AppCard>
    );
  }

  return (
    <AppCard>
      <Stack gap={3}>
        <Box>
          <Typography variant="h5" component="h1">
            Dashboard
          </Typography>
          <Typography color="text.disabled" variant="subtitle2">
            Overview of platform activity
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} gap={2}>
          <StatCard label="Users" value={countStats?.users ?? 0} />
          <StatCard label="Orders" value={countStats?.orders ?? 0} />
          <StatCard label="Menu items" value={countStats?.menu ?? 0} />
        </Stack>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          gap={2}
          alignItems="stretch"
        >
          <PieChartCard
            title="Orders by status"
            labels={pieLabels}
            values={pieValues}
          />
          <BarChartCard
            title="Orders per day"
            labels={barLabels}
            values={barValues}
          />
        </Stack>
      </Stack>
    </AppCard>
  );
};

export default Dashboard;
