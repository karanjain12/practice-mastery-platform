import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Shield, Pencil, Trash2 } from "lucide-react";

type PermissionKey = "view" | "add" | "edit" | "delete";

const modules = [
  { key: "content", label: "Content information", feature: "Content management" },
  { key: "users", label: "Users", feature: "User management" },
  { key: "staff", label: "Staff", feature: "Staff management" },
  { key: "reports", label: "Reports", feature: "Analytics & exports" },
];

function emptyPerms() {
  const base: Record<string, Record<PermissionKey, boolean>> = {};
  for (const m of modules) base[m.key] = { view: true, add: false, edit: false, delete: false };
  return base;
}

export default function AdminAccessControl() {
  const [roleName, setRoleName] = useState("");
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<{ id: string; name: string; type: "System" | "Custom"; perms: any }[]>([
    { id: "r1", name: "Super Admin", type: "System", perms: (() => {
      const all: any = {};
      for (const m of modules) all[m.key] = { view: true, add: true, edit: true, delete: true };
      return all;
    })() },
    { id: "r2", name: "Content Manager", type: "System", perms: emptyPerms() },
    { id: "r3", name: "Support Staff", type: "System", perms: emptyPerms() },
    { id: "r4", name: "Librarian", type: "System", perms: emptyPerms() },
  ]);
  const [activeRoleId, setActiveRoleId] = useState("r1");

  const activeRole = roles.find((r) => r.id === activeRoleId);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((r) => r.name.toLowerCase().includes(q));
  }, [roles, search]);

  const createRole = () => {
    const name = roleName.trim();
    if (!name) return;
    const id = `r_${Date.now()}`;
    setRoles([{ id, name, type: "Custom", perms: emptyPerms() }, ...roles]);
    setRoleName("");
    setActiveRoleId(id);
  };

  const setPerm = (moduleKey: string, perm: PermissionKey, value: boolean) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id !== activeRoleId
          ? r
          : {
              ...r,
              perms: {
                ...r.perms,
                [moduleKey]: { ...r.perms[moduleKey], [perm]: value },
              },
            }
      )
    );
  };

  return (
    <AdminLayout title="Access Control">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Role-Based Access Control</h1>
          <p className="text-muted-foreground">Manage user roles and define detailed permissions for the platform.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Create Role</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Name *</div>
                  <Input value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="Enter role name" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={createRole}>
                    <Plus className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Note: when you connect backend, store roles in a separate roles table and enforce permissions server-side.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-8">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-base">Role List</CardTitle>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Role</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="w-24 text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((r) => (
                        <TableRow
                          key={r.id}
                          className={r.id === activeRoleId ? "bg-primary/5" : undefined}
                          onClick={() => setActiveRoleId(r.id)}
                        >
                          <TableCell className="font-medium">{r.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{r.type}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit role">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Delete role"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (r.type === "System") return;
                                  setRoles((prev) => prev.filter((x) => x.id !== r.id));
                                  if (activeRoleId === r.id) setActiveRoleId("r1");
                                }}
                                disabled={r.type === "System"}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Card className="border shadow-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">Permissions</CardTitle>
                      {activeRole ? <Badge variant="outline">{activeRole.name}</Badge> : null}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Module</TableHead>
                            <TableHead>Feature</TableHead>
                            <TableHead className="w-24 text-center">View</TableHead>
                            <TableHead className="w-24 text-center">Add</TableHead>
                            <TableHead className="w-24 text-center">Edit</TableHead>
                            <TableHead className="w-24 text-center">Delete</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {modules.map((m) => (
                            <TableRow key={m.key}>
                              <TableCell className="font-medium">{m.label}</TableCell>
                              <TableCell className="text-muted-foreground">{m.feature}</TableCell>
                              {(["view", "add", "edit", "delete"] as PermissionKey[]).map((perm) => (
                                <TableCell key={perm} className="text-center">
                                  <Checkbox
                                    checked={!!activeRole?.perms?.[m.key]?.[perm]}
                                    onCheckedChange={(v) => setPerm(m.key, perm, Boolean(v))}
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button>
                        Save
                        <span className="ml-2">→</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
