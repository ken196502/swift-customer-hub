
import { CustomerContent } from "@/components/customer/CustomerContent";
import { CustomerProvider } from "@/contexts/CustomerContext";

export default function Index() {
  return (
    <CustomerProvider>
      <CustomerContent />
    </CustomerProvider>
  );
}
