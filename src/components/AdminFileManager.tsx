import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string } | null;
}

const EXPECTED_FILES = [
  "all-supplier-bundle.pdf",
  "shoe-supplier.pdf",
  "luxury-watch-supplier.pdf",
  "earbud-supplier.pdf",
  "cologne-supplier.pdf",
  "puffer-jacket-supplier.pdf",
  "lulu-supplier.pdf",
];

export const AdminFileManager = () => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.functions.invoke("manage-digital-products?action=list", {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    if (error) {
      toast.error("Failed to load files");
      console.error(error);
    } else {
      setFiles(data.files || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    const { data: { session } } = await supabase.auth.getSession();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-digital-products?action=upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: formData,
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast.success(`Uploaded ${file.name}`);
      fetchFiles();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Delete "${fileName}"?`)) return;

    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase.functions.invoke("manage-digital-products?action=delete", {
      headers: { Authorization: `Bearer ${session?.access_token}` },
      body: { fileName },
    });

    if (error) {
      toast.error("Delete failed");
    } else {
      toast.success(`Deleted ${fileName}`);
      fetchFiles();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const uploadedNames = new Set(files.map((f) => f.name));
  const missingFiles = EXPECTED_FILES.filter((f) => !uploadedNames.has(f));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Digital Product Files</CardTitle>
        <div className="relative">
          <Input
            type="file"
            accept=".pdf,.zip,.epub"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <Button variant="outline" size="sm" disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Upload File
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {missingFiles.length > 0 && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            <p className="font-medium mb-1">Missing product files ({missingFiles.length}):</p>
            <ul className="list-disc list-inside">
              {missingFiles.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {loading ? (
          <p className="text-muted-foreground text-sm">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-muted-foreground text-sm">No files uploaded yet. Upload your product PDFs above.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{file.name}</span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {file.metadata?.size ? formatSize(file.metadata.size) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(file.name)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
