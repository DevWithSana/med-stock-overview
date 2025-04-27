import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { ChartContainer } from "@/components/ChartContainer";
import { TableContainer } from "@/components/TableContainer";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Package,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Calendar,
  User,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const salesData = [
  { name: "Lun", revenue: 4000, count: 24 },
  { name: "Mar", revenue: 3000, count: 18 },
  { name: "Mer", revenue: 2000, count: 12 },
  { name: "Jeu", revenue: 2780, count: 15 },
  { name: "Ven", revenue: 1890, count: 11 },
  { name: "Sam", revenue: 2390, count: 16 },
  { name: "Dim", revenue: 3490, count: 22 },
];

const stockAlertData = [
  { id: 1, name: "Paracétamol 500mg", stock: 15, threshold: 20, status: "low" },
  { id: 2, name: "Ibuprofène 400mg", stock: 8, threshold: 15, status: "critical" },
  { id: 3, name: "Amoxicilline 250mg", stock: 12, threshold: 25, status: "critical" },
  { id: 4, name: "Aspirine 500mg", stock: 18, threshold: 20, status: "low" },
  { id: 5, name: "Omeprazole 20mg", stock: 5, threshold: 10, status: "low" },
];

const expiringProducts = [
  { id: 1, name: "Antibiotique Solution", expiry: "2025-05-15", daysLeft: 20, status: "warning" },
  { id: 2, name: "Sirop pour la toux", expiry: "2025-05-10", daysLeft: 15, status: "warning" },
  { id: 3, name: "Spray nasal", expiry: "2025-05-05", daysLeft: 10, status: "danger" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Martin Dupont", date: "2025-04-25", total: "124.50 €", status: "delivered" },
  { id: "ORD-002", customer: "Sophie Laurent", date: "2025-04-25", total: "67.20 €", status: "processing" },
  { id: "ORD-003", customer: "Thomas Petit", date: "2025-04-24", total: "89.95 €", status: "shipped" },
  { id: "ORD-004", customer: "Julie Moreau", date: "2025-04-24", total: "45.75 €", status: "pending" },
];

const topProducts = [
  { name: "Paracétamol 1g", value: 35 },
  { name: "Spray nasal", value: 20 },
  { name: "Vitamines C", value: 18 },
  { name: "Bandages", value: 15 },
  { name: "Ibuprofène", value: 12 },
];

const COLORS = ["#2B92D5", "#58B0E3", "#A9D4F0", "#4FB06A", "#F3AE4E"];

const Dashboard = () => {
  const [salesPeriod, setSalesPeriod] = useState("week");
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total des produits en stock"
          value="1,284"
          description="1,054 références actives"
          icon={<Package className="text-pharma-primary" />}
        />
        <StatCard
          title="Chiffre d'affaires (jour)"
          value="1,845 €"
          trend={{ value: 12, positive: true }}
          description="Aujourd'hui"
          icon={<TrendingUp className="text-pharma-accent" />}
        />
        <StatCard
          title="Ventes du jour"
          value="124"
          trend={{ value: 8, positive: true }}
          description="48 clients"
          icon={<ShoppingCart className="text-pharma-secondary" />}
        />
        <StatCard
          title="Alertes de stock"
          value="14"
          description="5 critiques"
          icon={<AlertTriangle className="text-pharma-danger" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer 
          title="Ventes journalières"
          description="Évolution du chiffre d'affaires et du nombre de ventes"
          period={salesPeriod}
          onPeriodChange={setSalesPeriod}
          downloadable
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="CA (€)"
                  stroke="#2B92D5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="count"
                  name="Nombre"
                  stroke="#4FB06A"
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />

        <ChartContainer 
          title="Top des produits vendus"
          description="Répartition des 5 produits les plus vendus"
          downloadable
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} unités`} />
              </PieChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <Tabs defaultValue="stock-alerts">
            <TabsList>
              <TabsTrigger value="stock-alerts">Alertes de stock</TabsTrigger>
              <TabsTrigger value="expiring">Produits expirants</TabsTrigger>
            </TabsList>
            <TabsContent value="stock-alerts">
              <TableContainer
                title="Produits en stock critique"
                description="Produits nécessitant un réapprovisionnement"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Stock actuel</TableHead>
                      <TableHead>Seuil critique</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockAlertData.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.threshold}</TableCell>
                        <TableCell>
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Commander</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabsContent>
            <TabsContent value="expiring">
              <TableContainer
                title="Produits proche de la date d'expiration"
                description="Produits expirant dans les 30 prochains jours"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Date d'expiration</TableHead>
                      <TableHead>Jours restants</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expiringProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.expiry}</TableCell>
                        <TableCell>{product.daysLeft} jours</TableCell>
                        <TableCell>
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Marquer</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Commandes récentes</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between border-b pb-3">
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {order.date}
                      </div>
                      <div className="text-sm">{order.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{order.total}</div>
                      <StatusBadge status={order.status} className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 mt-auto border-t">
              <Button variant="outline" className="w-full">Voir toutes les commandes</Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Alertes d'expiration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Ce mois-ci</div>
                  <div className="text-sm text-pharma-danger font-medium">12 produits</div>
                </div>
                <Progress value={75} className="h-2 bg-pharma-gray" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Mois prochain</div>
                  <div className="text-sm text-pharma-warning font-medium">24 produits</div>
                </div>
                <Progress value={40} className="h-2 bg-pharma-gray" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Dans 3 mois</div>
                  <div className="text-sm text-pharma-secondary font-medium">38 produits</div>
                </div>
                <Progress value={15} className="h-2 bg-pharma-gray" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mouvements de stock récents</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Entrées" fill="#4FB06A" />
                <Bar dataKey="revenue" name="Sorties" fill="#2B92D5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
