import { prisma } from "../lib/prisma";

type DashboardCountStats = {
  users: number;
  orders: number;
  menu: number;
};

type ChartJsDataset = {
  label: string;
  data: number[];
};

type PieChartData = {
  labels: string[];
  datasets: ChartJsDataset[];
};

type BarChartData = {
  labels: string[];
  datasets: ChartJsDataset[];
};

type DashboardDataStats = {
  pieChartData: PieChartData;
  barChartData: BarChartData;
};

export type DashboardStats = {
  countStats: DashboardCountStats;
  dataStats: DashboardDataStats;
};

const getDashboardStats = async (): Promise<DashboardStats> => {
  const [usersCount, ordersCount, menuCount] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.menu.count(),
  ]);

  const ordersByStatus = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const pieLabels = ordersByStatus.map((s) => String(s.status));
  const pieData = ordersByStatus.map((s) => s._count._all);

  const ordersForBar = await prisma.order.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const ordersPerDayMap = new Map<string, number>();
  for (const order of ordersForBar) {
    const dateKey = order.createdAt.toISOString().slice(0, 10);
    const current = ordersPerDayMap.get(dateKey) ?? 0;
    ordersPerDayMap.set(dateKey, current + 1);
  }

  const barLabels = Array.from(ordersPerDayMap.keys());
  const barData = barLabels.map((d) => ordersPerDayMap.get(d) ?? 0);

  return {
    countStats: {
      users: usersCount,
      orders: ordersCount,
      menu: menuCount,
    },
    dataStats: {
      pieChartData: {
        labels: pieLabels,
        datasets: [
          {
            label: "Orders by status",
            data: pieData,
          },
        ],
      },
      barChartData: {
        labels: barLabels,
        datasets: [
          {
            label: "Orders per day",
            data: barData,
          },
        ],
      },
    },
  };
};

const AdminService = {
  getDashboardStats,
};

export default AdminService;

