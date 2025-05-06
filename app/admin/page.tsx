"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  PlusCircle,
  Pencil,
  Trash2,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PortoInterface } from "@/types";

export default function AdminPage() {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<{ portos: PortoInterface[] }>(
    "/api/portos",
    fetcher
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPorto, setSelectedPorto] = useState<PortoInterface | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    gitLink: "",
    webLink: "",
    tags: [] as string[],
    featured: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Tambahkan fungsi untuk handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0]; // Hanya ambil 1 file
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            images: [reader.result as string], // Ganti array images dengan 1 gambar baru
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setError("File harus berupa gambar");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validasi form
      if (!formData.title.trim()) {
        throw new Error("Judul harus diisi");
      }
      if (!formData.description.trim()) {
        throw new Error("Deskripsi harus diisi");
      }
      if (formData.images.length === 0) {
        throw new Error("Gambar harus diupload");
      }

      const url = selectedPorto
        ? `/api/portos/${selectedPorto._id}`
        : "/api/portos";

      const response = await fetch(url, {
        method: selectedPorto ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Gagal menyimpan data");
      }

      mutate();
      setIsModalOpen(false);
      setSelectedPorto(null);
      setFormData({
        title: "",
        description: "",
        images: [],
        gitLink: "",
        webLink: "",
        tags: [],
        featured: false,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal logout");
      }

      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-20 rounded-full bg-gradient-to-r from-blue-600/20 to-emerald-600/20 blur-[100px]" />
          <div className="absolute -inset-20 rounded-full bg-gradient-to-l from-emerald-600/20 to-blue-600/20 blur-[100px]" />
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 space-y-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white">A</span>
          </div>
          <span>Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Portfolio Management</h1>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tambah Portfolio
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="sticky top-0 bg-slate-900 z-10 pb-4 border-b border-slate-800">
                  <DialogTitle>
                    {selectedPorto ? "Edit" : "Tambah"} Portfolio
                  </DialogTitle>
                  <DialogDescription>
                    Isi form berikut untuk {selectedPorto ? "mengubah" : "menambah"} portfolio
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <label>Judul</label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Deskripsi</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div
                      className="space-y-2"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <label>Gambar (drag & drop atau pilih file)</label>
                      <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
                        {formData.images.length > 0 ? (
                          <div className="relative aspect-video">
                            <Image
                              src={formData.images[0]}
                              alt="Preview"
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        ) : (
                          <div className="py-8 text-slate-400">
                            Drag & drop gambar di sini atau klik untuk memilih
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label>Git Link</label>
                      <Input
                        value={formData.gitLink}
                        onChange={(e) =>
                          setFormData({ ...formData, gitLink: e.target.value })
                        }
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Web Link</label>
                      <Input
                        value={formData.webLink}
                        onChange={(e) =>
                          setFormData({ ...formData, webLink: e.target.value })
                        }
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Tags (pisahkan dengan koma)</label>
                      <Input
                        value={formData.tags.join(", ")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim()),
                          })
                        }
                        className="bg-slate-800/50 border-slate-700"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featured: e.target.checked,
                          })
                        }
                        className="rounded border-slate-700"
                      />
                      <label htmlFor="featured">Featured Portfolio</label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500"
                    >
                      {selectedPorto ? "Update" : "Simpan"}
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.portos.map((porto) => (
              <Card
                key={porto._id}
                className="bg-slate-900/50 border-slate-800 overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={porto.images[0]?.url || "/placeholder.svg"}
                    alt={porto.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{porto.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {porto.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {porto.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-slate-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedPorto(porto);
                      setFormData({
                        title: porto.title,
                        description: porto.description,
                        images: porto.images.map((img) => img.url),
                        gitLink: porto.gitLink,
                        webLink: porto.webLink,
                        tags: porto.tags,
                        featured: porto.featured,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={async () => {
                      if (confirm("Yakin ingin menghapus portfolio ini?")) {
                        await fetch(`/api/portos/${porto._id}`, {
                          method: "DELETE",
                        });
                        mutate();
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
