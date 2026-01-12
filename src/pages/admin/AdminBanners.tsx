import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Upload, Eye, EyeOff } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

const seedBanners: Banner[] = [
  { 
    id: "1", 
    title: "Master Cloud Computing", 
    subtitle: "Get certified in AWS, Azure & GCP",
    imageUrl: "/placeholder.svg",
    linkUrl: "/courses",
    isActive: true,
    order: 1,
    createdAt: "2026-01-01" 
  },
  { 
    id: "2", 
    title: "New Labs Available", 
    subtitle: "Hands-on Kubernetes training",
    imageUrl: "/placeholder.svg",
    linkUrl: "/labs",
    isActive: true,
    order: 2,
    createdAt: "2026-01-05" 
  },
  { 
    id: "3", 
    title: "Special Offer", 
    subtitle: "50% off all premium courses",
    imageUrl: "/placeholder.svg",
    linkUrl: "/vouchers",
    isActive: false,
    order: 3,
    createdAt: "2026-01-08" 
  },
];

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>(seedBanners);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredBanners = banners.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle,
        imageUrl: banner.imageUrl,
        linkUrl: banner.linkUrl,
        isActive: banner.isActive,
      });
      setImagePreview(banner.imageUrl);
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        subtitle: "",
        imageUrl: "",
        linkUrl: "",
        isActive: true,
      });
      setImagePreview("");
    }
    setDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (editingBanner) {
      setBanners(banners.map(b =>
        b.id === editingBanner.id
          ? { ...b, ...formData }
          : b
      ));
    } else {
      const newBanner: Banner = {
        id: Date.now().toString(),
        ...formData,
        order: banners.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBanners([...banners, newBanner]);
    }

    setDialogOpen(false);
    setFormData({ title: "", subtitle: "", imageUrl: "", linkUrl: "", isActive: true });
    setEditingBanner(null);
    setImagePreview("");
  };

  const handleDelete = () => {
    if (bannerToDelete) {
      setBanners(banners.filter(b => b.id !== bannerToDelete.id));
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
    }
  };

  const toggleBannerActive = (bannerId: string) => {
    setBanners(banners.map(b =>
      b.id === bannerId ? { ...b, isActive: !b.isActive } : b
    ));
  };

  return (
    <AdminLayout title="Banners">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">Banner Management</CardTitle>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" /> Add Banner
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search banners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBanners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="w-20 h-12 bg-muted rounded overflow-hidden">
                        {banner.imageUrl ? (
                          <img 
                            src={banner.imageUrl} 
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      {banner.subtitle}
                    </TableCell>
                    <TableCell className="text-sm text-primary">{banner.linkUrl}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={banner.isActive}
                          onCheckedChange={() => toggleBannerActive(banner.id)}
                        />
                        <Badge variant={banner.isActive ? "default" : "secondary"}>
                          {banner.isActive ? (
                            <><Eye className="w-3 h-3 mr-1" /> Active</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" /> Hidden</>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{banner.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenDialog(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => {
                            setBannerToDelete(banner);
                            setDeleteDialogOpen(true);
                          }}
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
        </CardContent>
      </Card>

      {/* Add/Edit Banner Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingBanner ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div 
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Click to change</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground">Recommended: 1920x600px</p>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                placeholder="e.g. Master Cloud Computing"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <Textarea
                placeholder="e.g. Get certified in AWS, Azure & GCP"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link URL</label>
              <Input
                placeholder="/courses or https://..."
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Active</p>
                <p className="text-sm text-muted-foreground">Show this banner on the homepage</p>
              </div>
              <Switch 
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!formData.title.trim()}>
              {editingBanner ? 'Save Changes' : 'Add Banner'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Banner</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{bannerToDelete?.title}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
