
import { useState } from "react";
import { ChartContainer } from "@/components/ChartContainer";
import { TableContainer } from "@/components/TableContainer";
import { StatusBadge } from "@/components/StatusBadge";
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
import { Calendar, Package, Plus, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ordersStatusData = [
  { name: "En attente", value: 12 },
  { name: "En cours", value: 8 },
  { name: "Expédiée", value: 5 },
  { name: "Livrée", value: 25 },
];

const COLORS = ["#F3AE4E", "#2B92D5", "#A9D4F0", "#4FB06A"];

const ordersBySupplierData = [
  { name: "PharmaSup", orders: 15 },
  { name: "MediStock", orders: 12 },
  { name: "BioMedic", orders: 9 },
  { name: "PharmaPlus", orders: 7 },
  { name: "MedExpress", orders: 5 },
  { name: "SanteStock", orders: 2 },
];

const recentOrdersData = [
  { id: "CMD-001", supplier: "PharmaSup", date: "2025-04-25", total: "2,450 €", status: "pending" },
  { id: "CMD-002", supplier: "MediStock", date: "2025-04-24", total: "1,875 €", status: "processing" },
  { id: "CMD-003", supplier: "BioMedic", date: "2025-04-23", total: "3,120 €", status: "shipped" },
  { id: "CMD-004", supplier: "PharmaPlus", date: "2025-04-22", total: "960 €", status: "delivered" },
  { id: "CMD-005", supplier: "MedExpress", date: "2025-04-21", total: "1,540 €", status: "delivered" },
  { id: "CMD-006", supplier: "PharmaSup", date: "2025-04-20", total: "2,280 €", status: "delivered" },
  { id: "CMD-007", supplier: "SanteStock", date: "2025-04-19", total: "780 €", status: "delivered" },
  { id: "CMD-008", supplier: "MediStock", date: "2025-04-18", total: "1,950 €", status: "delivered" },
  { id: "CMD-009", supplier: "BioMedic", date: "2025-04-17", total: "2,340 €", status: "delivered" },
  { id: "CMD-010", supplier: "PharmaSup", date: "2025-04-16", total: "1,660 €", status: "delivered" },
];

const monthlyOrdersData = [
  { month: "Jan", value: 18 },
  { month: "Fév", value: 15 },
  { month: "Mar", value: 20 },
  { month: "Avr", value: 24 },
];

const orderDetailsItems = [
  { id: 1, product: "Paracétamol 500mg", quantity: 50, unitPrice: "12 €", total: "600 €" },
  { id: 2, product: "Ibuprofène 400mg", quantity: 30, unitPrice: "15 €", total: "450 €" },
  { id: 3, product: "Amoxicilline 250mg", quantity: 20, unitPrice: "18 €", total: "360 €" },
  { id: 4, product: "Spray nasal", quantity: 15, unitPrice: "22 €", total: "330 €" },
  { id: 5, product: "Test Covid-19", quantity: 25, unitPrice: "28 €", total: "700 €" },
];

const Orders = () => {
  const [ordersPeriod, setOrdersPeriod] = useState("month");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = recentOrdersData.filter(order => {
    return (
      (selectedStatus === "all" || order.status === selectedStatus) &&
      (selectedSupplier === "all" || order.supplier === selectedSupplier) &&
      (searchQuery === "" || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Gestion des Commandes</h1>
        <Button className="bg-pharma-primary hover:bg-pharma-primary/80">
          <Plus className="mr-2 h-4 w-4" /> Nouvelle commande
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des commandes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-pharma-primary mr-3" />
              <div>
                <div className="text-2xl font-bold">50</div>
                <p className="text-xs text-muted-foreground">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-pharma-warning mr-3" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">24% des commandes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-pharma-secondary mr-3" />
              <div>
                <div className="text-2xl font-bold">13</div>
                <p className="text-xs text-muted-foreground">26% des commandes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Montant total</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">17,945 €</div>
            <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer
          title="Commandes par statut"
          description="Répartition des commandes"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} commandes`} />
              </PieChart>
            </ResponsiveContainer>
          }
        />

        <ChartContainer
          title="Commandes mensuelles"
          description="Évolution du nombre de commandes"
          period={ordersPeriod}
          onPeriodChange={setOrdersPeriod}
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} commandes`} />
                <Bar dataKey="value" name="Commandes" fill="#2B92D5" />
              </BarChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <ChartContainer
        title="Commandes par fournisseur"
        description="Répartition par fournisseur sur la période"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersBySupplierData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => `${value} commandes`} />
              <Bar dataKey="orders" name="Commandes" fill="#4FB06A" />
            </BarChart>
          </ResponsiveContainer>
        }
      />

      <Tabs defaultValue="all-orders">
        <TabsList className="mb-4">
          <TabsTrigger value="all-orders">Toutes les commandes</TabsTrigger>
          <TabsTrigger value="order-details">Détails de commande</TabsTrigger>
        </TabsList>

        <TabsContent value="all-orders">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Liste des commandes</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="relative w-full sm:w-[200px]">
                    <Input 
                      placeholder="Rechercher..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="processing">En cours</SelectItem>
                      <SelectItem value="shipped">Expédiée</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="PharmaSup">PharmaSup</SelectItem>
                      <SelectItem value="MediStock">MediStock</SelectItem>
                      <SelectItem value="BioMedic">BioMedic</SelectItem>
                      <SelectItem value="PharmaPlus">PharmaPlus</SelectItem>
                      <SelectItem value="MedExpress">MedExpress</SelectItem>
                      <SelectItem value="SanteStock">SanteStock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID commande</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order-details">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Détails de la commande CMD-001</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fournisseur: PharmaSup | Date: 2025-04-25
                  </p>
                </div>
                <StatusBadge status="pending" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact fournisseur</p>
                    <p className="mt-1">Jean Martin</p>
                    <p className="text-sm">contact@pharmasup.fr</p>
                    <p className="text-sm">01 23 45 67 89</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date de commande</p>
                    <p className="mt-1">25 avril 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date de livraison prévue</p>
                    <p className="mt-1">2 mai 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                    <p className="mt-1 text-xl font-bold">2,450 €</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetailsItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unitPrice}</TableCell>
                        <TableCell className="text-right">{item.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">Sous-total</TableCell>
                      <TableCell className="text-right font-medium">2,440 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">Frais de livraison</TableCell>
                      <TableCell className="text-right">10 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">2,450 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Imprimer</Button>
                  <Button variant="outline">Contacter le fournisseur</Button>
                  <Button>Mettre à jour le statut</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
