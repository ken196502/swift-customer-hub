
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ServiceRecordChart } from "./ServiceRecordChart";
import { TransactionTable } from "./TransactionTable";
import { NewServiceRecordDialog } from "./NewServiceRecordDialog";
import type { TransactionData } from "@/components/CustomerDetail";

interface InteractionRecordsProps {
  contactData: Array<{ name: string; value: number; percentage: number; color: string }>;
  transactionData: TransactionData[];
  onAddServiceRecord: (record: any) => void;
  contactTypes: string[];
  departments: string[];
}

export function InteractionRecords({ 
  contactData, 
  transactionData, 
  onAddServiceRecord,
  contactTypes,
  departments
}: InteractionRecordsProps) {
  const [showNewServiceRecord, setShowNewServiceRecord] = useState(false);
  
  const handleEditTransaction = (transactionId: number) => {
    console.log(`Edit transaction: ${transactionId}`);
    // Implement edit functionality here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">触达记录</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowNewServiceRecord(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          新增触达记录
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ServiceRecordChart data={contactData} />
        </div>
        <div className="lg:col-span-2">
          <TransactionTable 
            data={transactionData} 
            onEditTransaction={handleEditTransaction}
          />
        </div>
      </div>

      <NewServiceRecordDialog
        open={showNewServiceRecord}
        onOpenChange={setShowNewServiceRecord}
        onSubmit={onAddServiceRecord}
        contactTypes={contactTypes}
        departments={departments}
      />
    </div>
  );
}
