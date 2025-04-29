
import React, { useState } from "react";
import { ServiceRecordChart, type ServiceRecord } from "./ServiceRecordChart";
import { TransactionTable, type Transaction } from "./TransactionTable";
import { TransactionData } from "@/components/CustomerDetail";

interface InteractionRecordsProps {
  contactData: ServiceRecord[];
  transactionData: TransactionData[];
}

export function InteractionRecords({ contactData, transactionData }: InteractionRecordsProps) {
  const [dateRange, setDateRange] = useState({ start: "2025-03-01", end: "2025-03-31" });

  // Convert TransactionData to Transaction for the TransactionTable component
  const transactions: Transaction[] = transactionData.map(item => ({
    id: item.id,
    date: item.date,
    amount: item.amount,
    type: item.type,
    purpose: item.purpose,
    department: item.department,
    person: item.person
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ServiceRecordChart data={contactData} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">服务记录明细</h3>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
