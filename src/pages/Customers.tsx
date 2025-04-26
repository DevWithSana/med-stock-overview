
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
import { Calendar, Plus, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const customerGrowthData = [
  { month: "Jan", value: 24 },
  { month: "Fév", value: 18 },
  { month: "Mar", value: 30 },
  { month: "Avr", value: 35 },
];

const customerAgeData = [
  { name: "18-25", value: 15 },
  { name: "26-35", value: 25 },
  { name: "36-45", value: 30 },
  { name: "46-60", value: 20 },
  { name: "60+", value: 10 },
];

const COLORS = ["#2B92D5", "#58B0E3", "#A9D4F0", "#4FB06A", "#F3AE4E"];

const customersData = [
  { 
    id: 1, 
    name: "Martin Dupont", 
    email: "martin.dupont@email.com", 
    phone: "01 23 45 67 89", 
    lastVisit: "2025-04-25", 
    purchases: 12, 
    total: "345 €",
    loyal: true 
  },
  { 
    id: 2, 
    name: "Sophie Laurent", 
    email: "sophie.laurent@email.com", 
    phone: "01 23 45 67 90", 
    lastVisit: "2025-04-24", 
    purchases: 8, 
    total: "210 €",
    loyal: true 
  },
  { 
    id: 3, 
    name: "Thomas Petit", 
    email: "thomas.petit@email.com", 
    phone: "01 23 45 67 91", 
    lastVisit: "2025-04-22", 
    purchases: 5, 
    total: "145 €",
    loyal: false 
  },
  { 
    id: 4, 
    name: "Julie Moreau", 
    email: "julie.moreau@email.com", 
    phone: "01 23 45 67 92", 
    lastVisit: "2025-04-20", 
    purchases: 3, 
    total: "85 €",
    loyal: false 
  },
  { 
    id: 5, 
    name: "Laurent Dubois", 
    email: "laurent.dubois@email.com", 
    phone: "01 23 45 67 93", 
    lastVisit: "2025-04-19", 
    purchases: 10, 
    total: "275 €",
    loyal: true 
  },
  { 
    id: 6, 
    name: "Claire Martin", 
    email: "claire.martin@email.com", 
    phone: "01 23 45 67 94", 
    lastVisit: "2025-04-18", 
    purchases: 7, 
    total: "190 €",
    loyal: false 
  },
  { 
    id: 7, 
    name: "Philippe Bernard", 
    email: "philippe.bernard@email.com", 
    phone: "01 23 45 67 95", 
    lastVisit: "2025-04-15", 
    purchases: 15, 
    total: "420 €",
    loyal: true 
  },
  { 
    id: 8, 
    name: "Marie Leroy", 
    email: "marie.leroy@email.com", 
    phone: "01 23 45 67 96", 
    lastVisit: "2025-04-12", 
    purchases: 6, 
    total: "165 €",
    loyal: false 
  },
];

const customerPurchaseHistory = [
  { id: 1, date: "2025-04-25", products: "Paracétamol, Spray nasal", total: "42 €" },
  { id: 2, date: "2025-04-18", products: "Vitamines C, Bandages", total: "36 €" },
  { id: 3, date: "2025-04-10", products: "Ibuprofène, Test Covid-19", total: "53 €" },
  { id: 4, date: "2025-04-02", products: "Amoxicilline", total: "24 €" },
  { id: 5, date: "2025-03-25", products: "Paracétamol, Aspirine", total: "35 €" },
];

const Customers = () => {
  const [customersPeriod, setCustomersPeriod] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [loyaltyFilter, setLoyaltyFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(1);

  const filteredCustomers = customersData.filter(customer => {
    return (
      (loyaltyFilter === "all" || 
       (loyaltyFilter === "loyal" && customer.loyal) || 
       (loyaltyFilter === "new" && !customer.loyal)) &&
      (searchQuery === "" || 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getCustomerInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const selectedCustomerData = customersData.find(c => c.id === selectedCustomer);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button className="bg-pharma-primary hover:bg-pharma-primary/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des clients</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <User className="h-8 w-8 text-pharma-primary mr-3" />
              <div>
                <div className="text-2xl font-bold">584</div>
                <p className="text-xs text-muted-foreground">+35 ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients fidèles</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">215</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-pharma-accent mr-1">
                36.8%
              </span>
              <Progress 
                value={36.8} 
                className="h-2 flex-1" 
                indicatorClassName="bg-pharma-accent"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">28,50 €</div>
            <p className="text-xs text-muted-foreground mt-1">3.8 produits en moyenne</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer
          title="Nouveaux clients"
          description="Évolution mensuelle des inscriptions"
          period={customersPeriod}
          onPeriodChange={setCustomersPeriod}
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} clients`} />
                <Bar dataKey="value" name="Nouveaux clients" fill="#2B92D5" />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <ChartContainer
          title="Répartition par âge"
          description="Profil démographique"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerAgeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerAgeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <Tabs defaultValue="customers-list">
        <TabsList className="mb-4">
          <TabsTrigger value="customers-list">Liste des clients</TabsTrigger>
          <TabsTrigger value="customer-details">Détails client</TabsTrigger>
        </TabsList>

        <TabsContent value="customers-list">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Clients</CardTitle>
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
                  <div className="flex gap-2">
                    <Button 
                      variant={loyaltyFilter === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLoyaltyFilter("all")}
                    >
                      Tous
                    </Button>
                    <Button 
                      variant={loyaltyFilter === "loyal" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLoyaltyFilter("loyal")}
                    >
                      Fidèles
                    </Button>
                    <Button 
                      variant={loyaltyFilter === "new" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLoyaltyFilter("new")}
                    >
                      Nouveaux
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Dernière visite</TableHead>
                    <TableHead>Achats</TableHead>
                    <TableHead>Total dépensé</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-pharma-primary text-white">
                              {getCustomerInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            {customer.loyal && (
                              <Badge variant="outline" className="bg-pharma-accent bg-opacity-20 text-pharma-accent border-pharma-accent mt-1">
                                Fidèle
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-muted-foreground">{customer.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          {customer.lastVisit}
                        </div>
                      </TableCell>
                      <TableCell>{customer.purchases}</TableCell>
                      <TableCell>{customer.total}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedCustomer(customer.id)}
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

        <TabsContent value="customer-details">
          {selectedCustomerData && (
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Profil du client</CardTitle>
                    {selectedCustomerData.loyal && (
                      <Badge variant="outline" className="bg-pharma-accent bg-opacity-20 text-pharma-accent border-pharma-accent">
                        Fidèle
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="text-2xl bg-pharma-primary text-white">
                        {getCustomerInitials(selectedCustomerData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{selectedCustomerData.name}</h3>
                    <p className="text-sm text-muted-foreground">Client depuis Nov 2024</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="mt-1">{selectedCustomerData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                      <p className="mt-1">{selectedCustomerData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dernière visite</p>
                      <p className="mt-1">{selectedCustomerData.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total des achats</p>
                      <p className="mt-1">{selectedCustomerData.purchases} achats</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                      <p className="mt-1">{selectedCustomerData.total}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button className="w-full">Ajouter une vente</Button>
                    <Button variant="outline" className="w-full">Modifier le profil</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des achats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerPurchaseHistory.map((purchase) => (
                          <TableRow key={purchase.id}>
                            <TableCell>{purchase.date}</TableCell>
                            <TableCell>{purchase.products}</TableCell>
                            <TableCell>{purchase.total}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Détails</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tendances d'achat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Antalgiques</div>
                          <div className="text-sm text-muted-foreground">42%</div>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">ORL</div>
                          <div className="text-sm text-muted-foreground">28%</div>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Compléments</div>
                          <div className="text-sm text-muted-foreground">18%</div>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Autres</div>
                          <div className="text-sm text-muted-foreground">12%</div>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Produits recommandés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border rounded-md text-center">
                        <p className="font-medium">Spray nasal</p>
                        <p className="text-sm text-muted-foreground">Basé sur l'historique</p>
                      </div>
                      <div className="p-4 border rounded-md text-center">
                        <p className="font-medium">Vitamines D</p>
                        <p className="text-sm text-muted-foreground">Complément aux achats</p>
                      </div>
                      <div className="p-4 border rounded-md text-center">
                        <p className="font-medium">Crème hydratante</p>
                        <p className="text-sm text-muted-foreground">Produit populaire</p>
                      </div>
                    </div>
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

export default Customers;
