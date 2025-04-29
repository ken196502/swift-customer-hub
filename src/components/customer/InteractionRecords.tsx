
import React, { useState } from "react";
import { ServiceRecordChart, type ServiceRecord } from "./ServiceRecordChart";
import { TransactionTable, type Transaction } from "./TransactionTable";
import { TransactionData } from "@/components/CustomerDetail";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewServiceRecordDialog } from "./NewServiceRecordDialog";

interface InteractionRecordsProps {
  contactData: ServiceRecord[];
  transactionData: TransactionData[];
  onAddServiceRecord: (record: any) => void;
  contactTypes: string[];
}

export function InteractionRecords({ 
  contactData, 
  transactionData, 
  onAddServiceRecord,
  contactTypes
}: InteractionRecordsProps) {
  const [dateRange, setDateRange] = useState({ start: "2025-03-01", end: "2025-03-31" });
  const [showNewServiceRecordDialog, setShowNewServiceRecordDialog] = useState(false);

  // Convert TransactionData to Transaction for the TransactionTable component
  const transactions: Transaction[] = transactionData.map(item => ({
    id: item.id,
    date: item.date,
    amount: item.amount,
    type: item.type,
    purpose: item.purpose,
    department: item.department,
    person: item.person,
    description: item.description
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">日期：</div>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
          <div className="text-sm">至</div>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
        <Button 
          size="sm" 
          onClick={() => setShowNewServiceRecordDialog(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          新增触达记录
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ServiceRecordChart data={contactData} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">服务记录明细</h3>
        <TransactionTable transactions={transactions} />
      </div>

      <NewServiceRecordDialog
        open={showNewServiceRecordDialog}
        onOpenChange={setShowNewServiceRecordDialog}
        onSubmit={onAddServiceRecord}
        contactTypes={contactTypes}
      />
    </div>
  );
}
