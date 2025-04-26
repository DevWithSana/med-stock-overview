
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
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter, Plus, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const stockData = [
  { id: 1, name: "Paracétamol 500mg", category: "Antalgiques", stock: 150, minStock: 20, status: "high" },
  { id: 2, name: "Ibuprofène 400mg", category: "Anti-inflammatoires", stock: 85, minStock: 15, status: "high" },
  { id: 3, name: "Amoxicilline 250mg", category: "Antibiotiques", stock: 12, minStock: 25, status: "critical" },
  { id: 4, name: "Aspirine 500mg", category: "Antalgiques", stock: 18, minStock: 20, status: "low" },
  { id: 5, name: "Omeprazole 20mg", category: "Antiacides", stock: 45, minStock: 10, status: "high" },
  { id: 6, name: "Vitamines C 1000mg", category: "Compléments", stock: 75, minStock: 15, status: "high" },
  { id: 7, name: "Spray nasal", category: "ORL", stock: 32, minStock: 10, status: "high" },
  { id: 8, name: "Bandages élastiques", category: "Matériel", stock: 25, minStock: 10, status: "high" },
  { id: 9, name: "Sirop pour la toux", category: "ORL", stock: 14, minStock: 20, status: "low" },
  { id: 10, name: "Test Covid-19", category: "Diagnostics", stock: 5, minStock: 15, status: "critical" },
];

const stockHistoryData = [
  { month: "Jan", entrees: 120, sorties: 85 },
  { month: "Fév", entrees: 100, sorties: 90 },
  { month: "Mar", entrees: 140, sorties: 120 },
  { month: "Avr", entrees: 130, sorties: 115 },
  { month: "Mai", entrees: 110, sorties: 95 },
  { month: "Juin", entrees: 90, sorties: 80 },
];

const stockEvolutionData = [
  { date: "01/01", paracetamol: 120, ibuprofene: 80, antibiotiques: 50 },
  { date: "15/01", paracetamol: 100, ibuprofene: 85, antibiotiques: 45 },
  { date: "01/02", paracetamol: 140, ibuprofene: 90, antibiotiques: 60 },
  { date: "15/02", paracetamol: 130, ibuprofene: 95, antibiotiques: 55 },
  { date: "01/03", paracetamol: 150, ibuprofene: 100, antibiotiques: 65 },
  { date: "15/03", paracetamol: 160, ibuprofene: 105, antibiotiques: 70 },
];

const stockMovementsData = [
  { id: 1, date: "2025-04-25", product: "Paracétamol 500mg", type: "Entrée", quantity: 50, source: "Fournisseur A" },
  { id: 2, date: "2025-04-25", product: "Test Covid-19", type: "Sortie", quantity: 5, source: "Vente" },
  { id: 3, date: "2025-04-24", product: "Ibuprofène 400mg", type: "Entrée", quantity: 30, source: "Fournisseur B" },
  { id: 4, date: "2025-04-24", product: "Amoxicilline 250mg", type: "Sortie", quantity: 12, source: "Vente" },
  { id: 5, date: "2025-04-23", product: "Spray nasal", type: "Entrée", quantity: 20, source: "Fournisseur C" },
];

const StockManagement = () => {
  const [stockPeriod, setStockPeriod] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStockData = stockData.filter(item => {
    return (
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (statusFilter === "all" || item.status === statusFilter) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
        <Button className="bg-pharma-primary hover:bg-pharma-primary/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total des produits</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-primary">1,284</p>
            <p className="text-sm text-muted-foreground mt-1">246 catégories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valeur du stock</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-primary">153,750 €</p>
            <p className="text-sm text-muted-foreground mt-1">+5,230 € ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertes de stock</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-pharma-danger">14</p>
            <div className="flex justify-center gap-2 mt-1">
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">5 critiques</Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">9 faibles</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer
          title="Évolution du stock"
          description="Niveaux de stock par produit clé"
          period={stockPeriod}
          onPeriodChange={setStockPeriod}
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="paracetamol"
                  name="Paracétamol"
                  stroke="#2B92D5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="ibuprofene"
                  name="Ibuprofène"
                  stroke="#4FB06A"
                />
                <Line
                  type="monotone"
                  dataKey="antibiotiques"
                  name="Antibiotiques"
                  stroke="#F3AE4E"
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />

        <ChartContainer
          title="Mouvements de stock"
          description="Entrées et sorties sur la période"
          period={stockPeriod}
          onPeriodChange={setStockPeriod}
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entrees" name="Entrées" fill="#4FB06A" />
                <Bar dataKey="sorties" name="Sorties" fill="#E35F5F" />
              </BarChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Liste des produits</TabsTrigger>
          <TabsTrigger value="movements">Mouvements de stock</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Inventaire des produits</CardTitle>
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
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="Antalgiques">Antalgiques</SelectItem>
                      <SelectItem value="Anti-inflammatoires">Anti-inflammatoires</SelectItem>
                      <SelectItem value="Antibiotiques">Antibiotiques</SelectItem>
                      <SelectItem value="Antiacides">Antiacides</SelectItem>
                      <SelectItem value="Compléments">Compléments</SelectItem>
                      <SelectItem value="ORL">ORL</SelectItem>
                      <SelectItem value="Matériel">Matériel</SelectItem>
                      <SelectItem value="Diagnostics">Diagnostics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="high">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Stock minimum</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStockData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="font-medium">{product.stock}</div>
                        <Progress
                          value={(product.stock / product.minStock) * 25}
                          max={100}
                          className="h-2 mt-1 bg-pharma-gray"
                          indicatorClassName={
                            product.status === "critical"
                              ? "bg-pharma-danger"
                              : product.status === "low"
                              ? "bg-pharma-warning"
                              : "bg-pharma-accent"
                          }
                        />
                      </TableCell>
                      <TableCell>{product.minStock}</TableCell>
                      <TableCell>
                        <StatusBadge status={product.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <TableContainer
            title="Mouvements de stock récents"
            description="Historique des entrées et sorties de stock"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Source / Destination</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockMovementsData.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell className="font-medium">{movement.product}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          movement.type === "Entrée"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {movement.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.source}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockManagement;
