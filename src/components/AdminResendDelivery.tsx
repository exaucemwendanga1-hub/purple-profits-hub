import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS = [
  { key: "bundle", name: "All Supplier Bundle" },
  { key: "shoes", name: "Shoe Supplier" },
  { key: "watch", name: "Luxury Watch Supplier" },
  { key: "earbuds", name: "Earbud Supplier" },
  { key: "cologne", name: "Cologne Supplier" },
  { key: "puffer", name: "Puffer Jacket Supplier" },
  { key: "crm", name: "CRM Supplier" },
  { key: "lulu", name: "Lulu Supplier" },
];

export const AdminResendDelivery = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [productKey, setProductKey] = useState("bundle");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast.error("Enter the customer's email");
      return;
    }
    setSending(true);
    const { data, error } = await supabase.functions.invoke("resend-delivery", {
      body: { recipientEmail: email, customerName: name, productKey },
    });
    setSending(false);
    if (error || (data && data.error)) {
      toast.error(`Failed: ${error?.message || data?.error}`);
      return;
    }
    toast.success(`Delivery email sent to ${email}`);
    setEmail("");
    setName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Resend Delivery Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label>Customer Email</Label>
          <Input
            type="email"
            placeholder="customer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Customer Name (optional)</Label>
          <Input placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Product</Label>
          <Select value={productKey} onValueChange={setProductKey}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCTS.map((p) => (
                <SelectItem key={p.key} value={p.key}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSend} disabled={sending} className="w-full">
          {sending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
          Send Delivery Email
        </Button>
        <p className="text-xs text-muted-foreground">
          Generates a fresh 24-hour download link and emails it to the customer.
        </p>
      </CardContent>
    </Card>
  );
};
