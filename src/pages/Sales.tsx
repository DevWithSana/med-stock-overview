
import { useState } from "react";
import { ChartContainer } from "@/components/ChartContainer";
import { TableContainer } from "@/components/TableContainer";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const salesData = [
  { date: "01/04", amount: 1200 },
  { date: "02/04", amount: 1400 },
  { date: "03/04", amount: 1100 },
  { date: "04/04", amount: 1600 },
  { date: "05/04", amount: 1800 },
  { date: "06/04", amount: 1200 },
  { date: "07/04", amount: 900 },
  { date: "08/04", amount: 1100 },
  { date: "09/04", amount: 1300 },
  { date: "10/04", amount: 1500 },
  { date: "11/04", amount: 1600 },
  { date: "12/04", amount: 1700 },
  { date: "13/04", amount: 1200 },
  { date: "14/04", amount: 1100 },
];

const monthlySalesData = [
  { month: "Jan", amount: 32500 },
  { month: "Fév", amount: 28600 },
  { month: "Mar", amount: 34200 },
  { month: "Avr", amount: 39800 },
];

const categorySalesData = [
  { name: "Antalgiques", value: 35 },
  { name: "Anti-inflammatoires", value: 20 },
  { name: "Antibiotiques", value: 18 },
  { name: "ORL", value: 15 },
  { name: "Matériel", value: 12 },
];

const COLORS = ["#2B92D5", "#58B0E3", "#A9D4F0", "#4FB06A", "#F3AE4E"];

const topSellingProducts = [
  { id: 1, name: "Paracétamol 500mg", category: "Antalgiques", quantity: 345, revenue: "4,140 €" },
  { id: 2, name: "Ibuprofène 400mg", category: "Anti-inflammatoires", quantity: 278, revenue: "3,336 €" },
  { id: 3, name: "Spray nasal", category: "ORL", quantity: 210, revenue: "2,940 €" },
  { id: 4, name: "Vitamines C", category: "Compléments", quantity: 185, revenue: "2,590 €" },
  { id: 5, name: "Test Covid-19", category: "Diagnostics", quantity: 156, revenue: "3,900 €" },
  { id: 6, name: "Aspirine 500mg", category: "Antalgiques", quantity: 145, revenue: "1,740 €" },
  { id: 7, name: "Bandages élastiques", category: "Matériel", quantity: 138, revenue: "1,242 €" },
  { id: 8, name: "Amoxicilline 250mg", category: "Antibiotiques", quantity: 124, revenue: "1,984 €" },
];

const recentSalesData = [
  { id: 1, date: "2025-04-26 09:15", client: "Martin Dupont", items: 4, total: "78,50 €" },
  { id: 2, date: "2025-04-26 10:22", client: "Sophie Laurent", items: 2, total: "42,20 €" },
  { id: 3, date: "2025-04-26 11:05", client: "Thomas Petit", items: 3, total: "64,95 €" },
  { id: 4, date: "2025-04-26 11:47", client: "Julie Moreau", items: 1, total: "22,75 €" },
  { id: 5, date: "2025-04-26 12:10", client: "Laurent Dubois", items: 6, total: "95,60 €" },
];

const Sales = () => {
  const [salesPeriod, setSalesPeriod] = useState("month");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Analyse des Ventes</h1>
        <Button className="bg-pharma-primary hover:bg-pharma-primary/80">
          Exporter le rapport
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ventes du jour</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-primary">1,845 €</p>
            <p className="text-sm text-muted-foreground mt-1">124 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventes du mois</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-primary">39,750 €</p>
            <p className="text-sm text-muted-foreground mt-1">+12% vs mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Panier moyen</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-primary">28,35 €</p>
            <p className="text-sm text-muted-foreground mt-1">+3,2% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <ChartContainer
            title="Évolution des ventes"
            description="Chiffre d'affaires journalier"
            period={salesPeriod}
            onPeriodChange={setSalesPeriod}
            downloadable
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} €`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Ventes (€)"
                    stroke="#2B92D5"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <div className="md:col-span-4">
          <ChartContainer
            title="Répartition par catégorie"
            description="Top 5 des catégories"
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <ChartContainer
            title="Tendance mensuelle"
            description="Évolution du chiffre d'affaires par mois"
            downloadable
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} €`} />
                  <Legend />
                  <Bar dataKey="amount" name="CA (€)" fill="#4FB06A" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <div className="md:col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Ventes récentes</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto flex-grow">
              <div className="space-y-4">
                {recentSalesData.map((sale) => (
                  <div key={sale.id} className="flex justify-between border-b pb-3">
                    <div className="space-y-1">
                      <p className="font-medium">{sale.client}</p>
                      <div className="text-sm text-muted-foreground">
                        {sale.date}
                      </div>
                      <div className="text-xs">{sale.items} articles</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{sale.total}</div>
                      <Button size="sm" variant="ghost" className="h-7 mt-1 px-2">
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 mt-auto border-t">
              <Button variant="outline" className="w-full">Voir toutes les ventes</Button>
            </div>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="top-products">
        <TabsList>
          <TabsTrigger value="top-products">Produits les plus vendus</TabsTrigger>
          <TabsTrigger value="performance">Performance par catégorie</TabsTrigger>
        </TabsList>
        <TabsContent value="top-products">
          <TableContainer
            title="Top des produits les plus vendus"
            description="Basé sur les 30 derniers jours"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Quantité vendue</TableHead>
                  <TableHead>Chiffre d'affaires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.revenue}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Analyser
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabsContent>
        <TabsContent value="performance">
          <TableContainer
            title="Performance par catégorie"
            description="Comparaison avec la période précédente"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>CA actuel</TableHead>
                  <TableHead>CA précédent</TableHead>
                  <TableHead>Évolution</TableHead>
                  <TableHead>Part du CA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Antalgiques</TableCell>
                  <TableCell>12,450 €</TableCell>
                  <TableCell>11,230 €</TableCell>
                  <TableCell className="text-pharma-accent">+10.9%</TableCell>
                  <TableCell>31.3%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Anti-inflammatoires</TableCell>
                  <TableCell>7,850 €</TableCell>
                  <TableCell>8,120 €</TableCell>
                  <TableCell className="text-pharma-danger">-3.3%</TableCell>
                  <TableCell>19.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Antibiotiques</TableCell>
                  <TableCell>5,320 €</TableCell>
                  <TableCell>4,980 €</TableCell>
                  <TableCell className="text-pharma-accent">+6.8%</TableCell>
                  <TableCell>13.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ORL</TableCell>
                  <TableCell>4,950 €</TableCell>
                  <TableCell>4,730 €</TableCell>
                  <TableCell className="text-pharma-accent">+4.7%</TableCell>
                  <TableCell>12.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Matériel</TableCell>
                  <TableCell>4,120 €</TableCell>
                  <TableCell>3,950 €</TableCell>
                  <TableCell className="text-pharma-accent">+4.3%</TableCell>
                  <TableCell>10.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Autres</TableCell>
                  <TableCell>5,060 €</TableCell>
                  <TableCell>4,890 €</TableCell>
                  <TableCell className="text-pharma-accent">+3.5%</TableCell>
                  <TableCell>12.7%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;
