import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";

const seed = [
  { id: "c1", title: "Python Fundamentals", level: "Beginner", pricing: "paid" as const, updatedAt: "2026-01-04" },
  { id: "c2", title: "AWS Cloud Practitioner", level: "Beginner", pricing: "free" as const, updatedAt: "2026-01-02" },
  { id: "c3", title: "Kubernetes in Production", level: "Advanced", pricing: "paid" as const, updatedAt: "2025-12-18" },
];

export default function AdminCourses() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return seed;
    return seed.filter((c) => c.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <AdminLayout title="Courses">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">Courses</CardTitle>
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4 mr-2" /> New Course
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search courses..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>{c.level}</TableCell>
                    <TableCell>
                      <Badge variant={c.pricing === "paid" ? "paid" : "free"}>{c.pricing}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
