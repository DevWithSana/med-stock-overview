
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Factory, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const suppliersData = [
  { 
    id: 1, 
    name: "PharmaSup", 
    contact: "Jean Martin", 
    email: "contact@pharmasup.fr", 
    phone: "01 23 45 67 89", 
    orders: 25, 
    products: 120, 
    total: "28,450 €",
    reliability: 95,
    quality: 90,
    delivery: 85,
    pricing: 80,
    communication: 95
  },
  { 
    id: 2, 
    name: "MediStock", 
    contact: "Marie Bernard", 
    email: "info@medistock.com", 
    phone: "01 23 45 67 90", 
    orders: 18, 
    products: 85, 
    total: "19,850 €",
    reliability: 90,
    quality: 95,
    delivery: 80,
    pricing: 85,
    communication: 90
  },
  { 
    id: 3, 
    name: "BioMedic", 
    contact: "Pierre Dubois", 
    email: "contact@biomedic.fr", 
    phone: "01 23 45 67 91", 
    orders: 15, 
    products: 65, 
    total: "12,750 €",
    reliability: 85,
    quality: 90,
    delivery: 90,
    pricing: 95,
    communication: 85
  },
  { 
    id: 4, 
    name: "PharmaPlus", 
    contact: "Sophie Moreau", 
    email: "info@pharmaplus.com", 
    phone: "01 23 45 67 92", 
    orders: 12, 
    products: 45, 
    total: "9,450 €",
    reliability: 80,
    quality: 85,
    delivery: 75,
    pricing: 90,
    communication: 80
  },
  { 
    id: 5, 
    name: "MedExpress", 
    contact: "Thomas Laurent", 
    email: "contact@medexpress.fr", 
    phone: "01 23 45 67 93", 
    orders: 10, 
    products: 40, 
    total: "8,250 €",
    reliability: 85,
    quality: 80,
    delivery: 95,
    pricing: 75,
    communication: 90
  },
  { 
    id: 6, 
    name: "SanteStock", 
    contact: "Claire Petit", 
    email: "info@santestock.com", 
    phone: "01 23 45 67 94", 
    orders: 8, 
    products: 35, 
    total: "6,780 €",
    reliability: 75,
    quality: 80,
    delivery: 85,
    pricing: 95,
    communication: 80
  },
];

const ordersBySupplierData = [
  { name: "PharmaSup", value: 25 },
  { name: "MediStock", value: 18 },
  { name: "BioMedic", value: 15 },
  { name: "PharmaPlus", value: 12 },
  { name: "Autres", value: 18 },
];

const COLORS = ["#2B92D5", "#58B0E3", "#A9D4F0", "#4FB06A", "#F3AE4E"];

const supplierOrdersData = [
  { month: "Jan", orders: 15, amount: 18500 },
  { month: "Fév", orders: 12, amount: 14200 },
  { month: "Mar", orders: 18, amount: 21300 },
  { month: "Avr", orders: 20, amount: 24100 },
];

const supplierTransactionsData = [
  { 
    id: 1, 
    order: "CMD-001", 
    date: "2025-04-25", 
    products: "Paracétamol 500mg, Ibuprofène 400mg", 
    amount: "2,450 €", 
    status: "pending" 
  },
  { 
    id: 2, 
    order: "CMD-008", 
    date: "2025-04-18", 
    products: "Test Covid-19, Spray nasal", 
    amount: "1,950 €", 
    status: "delivered" 
  },
  { 
    id: 3, 
    order: "CMD-015", 
    date: "2025-04-10", 
    products: "Amoxicilline 250mg, Bandages élastiques", 
    amount: "1,780 €", 
    status: "delivered" 
  },
  { 
    id: 4, 
    order: "CMD-023", 
    date: "2025-04-02", 
    products: "Vitamines C, Aspirine 500mg", 
    amount: "1,450 €", 
    status: "delivered" 
  },
  { 
    id: 5, 
    order: "CMD-031", 
    date: "2025-03-25", 
    products: "Sirop pour la toux, Omeprazole 20mg", 
    amount: "1,620 €", 
    status: "delivered" 
  },
];

const selectedSupplierPerformance = [
  { subject: 'Fiabilité', A: 95, fullMark: 100 },
  { subject: 'Qualité', A: 90, fullMark: 100 },
  { subject: 'Délais', A: 85, fullMark: 100 },
  { subject: 'Prix', A: 80, fullMark: 100 },
  { subject: 'Communication', A: 95, fullMark: 100 },
];

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(1);
  const [suppliersPeriod, setSuppliersPeriod] = useState("month");

  const filteredSuppliers = suppliersData.filter(supplier => {
    return (
      searchQuery === "" || 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getSupplierInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const selectedSupplierData = suppliersData.find(s => s.id === selectedSupplier);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Gestion des Fournisseurs</h1>
        <Button className="bg-pharma-primary hover:bg-pharma-primary/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un fournisseur
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fournisseurs actifs</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Factory className="h-8 w-8 text-pharma-primary mr-3" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">390 produits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commandes en cours</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">15,640 € en attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des achats</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">85,530 €</div>
            <p className="text-xs text-muted-foreground mt-1">88 commandes au total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer
          title="Répartition des commandes"
          description="Par fournisseur"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersBySupplierData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersBySupplierData.map((entry, index) => (
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
          description="Volume et montant"
          period={suppliersPeriod}
          onPeriodChange={setSuppliersPeriod}
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={supplierOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  name="Commandes"
                  stroke="#2B92D5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="amount"
                  name="Montant (€)"
                  stroke="#4FB06A"
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <Tabs defaultValue="suppliers-list">
        <TabsList className="mb-4">
          <TabsTrigger value="suppliers-list">Liste des fournisseurs</TabsTrigger>
          <TabsTrigger value="supplier-details">Détails fournisseur</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers-list">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Fournisseurs</CardTitle>
                <div className="relative w-full sm:w-[300px]">
                  <Input 
                    placeholder="Rechercher un fournisseur..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Total d'achats</TableHead>
                    <TableHead>Fiabilité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-pharma-primary text-white">
                              {getSupplierInitials(supplier.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{supplier.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{supplier.contact}</div>
                        <div className="text-xs text-muted-foreground">{supplier.email}</div>
                      </TableCell>
                      <TableCell>{supplier.orders}</TableCell>
                      <TableCell>{supplier.products}</TableCell>
                      <TableCell>{supplier.total}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={supplier.reliability}
                            className="h-2 w-24"
                            indicatorClassName={
                              supplier.reliability >= 90
                                ? "bg-pharma-accent"
                                : supplier.reliability >= 80
                                ? "bg-pharma-primary"
                                : "bg-pharma-warning"
                            }
                          />
                          <span className="text-sm font-medium">{supplier.reliability}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedSupplier(supplier.id)}
                        >
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

        <TabsContent value="supplier-details">
          {selectedSupplierData && (
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profil du fournisseur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="text-xl bg-pharma-primary text-white">
                        {getSupplierInitials(selectedSupplierData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{selectedSupplierData.name}</h3>
                    <p className="text-sm text-muted-foreground">Fournisseur depuis 2023</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact principal</p>
                      <p className="mt-1">{selectedSupplierData.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="mt-1">{selectedSupplierData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                      <p className="mt-1">{selectedSupplierData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Commandes totales</p>
                      <p className="mt-1">{selectedSupplierData.orders} commandes</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Produits fournis</p>
                      <p className="mt-1">{selectedSupplierData.products} produits</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                      <p className="mt-1">{selectedSupplierData.total}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button className="w-full">Créer une commande</Button>
                    <Button variant="outline" className="w-full">Contacter</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance du fournisseur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={selectedSupplierPerformance}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Performance"
                            dataKey="A"
                            stroke="#2B92D5"
                            fill="#2B92D5"
                            fillOpacity={0.6}
                          />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 mt-4 gap-4">
                      <div>
                        <p className="text-sm font-medium">Fiabilité</p>
                        <div className="flex items-center mt-1">
                          <Progress 
                            value={selectedSupplierData.reliability} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm font-medium">{selectedSupplierData.reliability}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Qualité</p>
                        <div className="flex items-center mt-1">
                          <Progress 
                            value={selectedSupplierData.quality} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm font-medium">{selectedSupplierData.quality}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Délai de livraison</p>
                        <div className="flex items-center mt-1">
                          <Progress 
                            value={selectedSupplierData.delivery} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm font-medium">{selectedSupplierData.delivery}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Prix</p>
                        <div className="flex items-center mt-1">
                          <Progress 
                            value={selectedSupplierData.pricing} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm font-medium">{selectedSupplierData.pricing}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Communication</p>
                        <div className="flex items-center mt-1">
                          <Progress 
                            value={selectedSupplierData.communication} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm font-medium">{selectedSupplierData.communication}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historique des transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supplierTransactionsData.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.order}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3.5 w-3.5" />
                                {transaction.date}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.products}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>
                              <StatusBadge status={transaction.status} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Suppliers;
