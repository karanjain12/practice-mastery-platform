import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Award,
  Search,
  Tag,
  Clock,
  Percent,
  CheckCircle2,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";

const vouchers = [
  {
    id: "1",
    title: "AWS Solutions Architect Associate Voucher",
    provider: "Amazon Web Services",
    originalPrice: 300,
    discountedPrice: 225,
    discount: 25,
    validUntil: "Dec 31, 2025",
    examCode: "SAA-C03",
    available: true,
  },
  {
    id: "2",
    title: "Azure Administrator AZ-104 Voucher",
    provider: "Microsoft",
    originalPrice: 165,
    discountedPrice: 140,
    discount: 15,
    validUntil: "Mar 31, 2025",
    examCode: "AZ-104",
    available: true,
  },
  {
    id: "3",
    title: "GCP Associate Cloud Engineer Voucher",
    provider: "Google Cloud",
    originalPrice: 200,
    discountedPrice: 160,
    discount: 20,
    validUntil: "Jun 30, 2025",
    examCode: "ACE",
    available: true,
  },
  {
    id: "4",
    title: "Kubernetes CKA Voucher",
    provider: "CNCF",
    originalPrice: 395,
    discountedPrice: 316,
    discount: 20,
    validUntil: "Dec 31, 2025",
    examCode: "CKA",
    available: true,
  },
  {
    id: "5",
    title: "CompTIA Security+ Voucher",
    provider: "CompTIA",
    originalPrice: 404,
    discountedPrice: 343,
    discount: 15,
    validUntil: "Dec 31, 2025",
    examCode: "SY0-701",
    available: true,
  },
  {
    id: "6",
    title: "Terraform Associate Voucher",
    provider: "HashiCorp",
    originalPrice: 70.5,
    discountedPrice: 56,
    discount: 20,
    validUntil: "Dec 31, 2025",
    examCode: "TA-003",
    available: false,
  },
];

export default function VouchersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch = voucher.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = providerFilter === "all" || voucher.provider === providerFilter;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <Badge className="mb-1 bg-secondary/10 text-secondary border-secondary/20">
                  Unlock Your Potential
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Certification Voucher Hub
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Get discounted exam vouchers for top certifications. Save money on your certification journey.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vouchers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="Amazon Web Services">AWS</SelectItem>
                <SelectItem value="Microsoft">Microsoft</SelectItem>
                <SelectItem value="Google Cloud">Google Cloud</SelectItem>
                <SelectItem value="CNCF">CNCF</SelectItem>
                <SelectItem value="CompTIA">CompTIA</SelectItem>
                <SelectItem value="HashiCorp">HashiCorp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vouchers Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVouchers.map((voucher) => (
              <Card key={voucher.id} className={`overflow-hidden ${!voucher.available ? "opacity-60" : "card-hover"}`}>
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-background">
                      {voucher.examCode}
                    </Badge>
                    {voucher.discount > 0 && (
                      <Badge className="bg-success text-success-foreground">
                        <Percent className="w-3 h-3 mr-1" />
                        {voucher.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-2">{voucher.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{voucher.provider}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${voucher.discountedPrice}
                      </div>
                      {voucher.discount > 0 && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${voucher.originalPrice}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Valid until
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {voucher.validUntil}
                      </div>
                    </div>
                  </div>

                  {voucher.available ? (
                    <Button className="w-full gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Purchase Voucher
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Out of Stock
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-12 bg-muted">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Purchase Voucher",
                    description: "Select and purchase your exam voucher at a discounted price.",
                  },
                  {
                    step: "2",
                    title: "Receive Code",
                    description: "Get your unique voucher code via email within 24 hours.",
                  },
                  {
                    step: "3",
                    title: "Schedule Exam",
                    description: "Use the code when scheduling your exam on the provider's website.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
