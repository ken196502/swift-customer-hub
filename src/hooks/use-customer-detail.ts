
import { useState } from "react";
import { Customer } from "@/contexts/CustomerContext";
import { TransactionData } from "@/components/CustomerDetail";
import { useToast } from "@/hooks/use-toast";

export function useCustomerDetail(
  customer: Customer,
  onEditCustomer?: (updatedCustomer: Partial<Customer>) => void
) {
  const [activeTab, setActiveTab] = useState("basic");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([
    {
      id: 1,
      date: "2025-03-26",
      amount: -34000.0,
      type: "出差费用",
      purpose: "出差实访客户",
      department: "零售经纪部",
      person: "张三",
    },
    {
      id: 2,
      date: "2025-03-22",
      amount: 0.0,
      type: "电话沟通",
      purpose: "运营和销售沟通",
      department: "金融市场部",
      person: "李四",
    },
    {
      id: 3,
      date: "2025-03-21",
      amount: 0.0,
      type: "财富管理部",
      purpose: "运营和销售服务反馈",
      department: "销售部",
      person: "李四",
    },
    {
      id: 4,
      date: "2025-03-20",
      amount: -1234.56,
      type: "招待客户",
      purpose: "招待客户",
      department: "投资银行DCM",
      person: "张三，王五",
    },
    {
      id: 5,
      date: "2025-03-19",
      amount: 0.0,
      type: "线上会议",
      purpose: "线上1on1",
      department: "投资银行ECM",
      person: "赵六",
    },
  ]);
  const { toast } = useToast();

  const handleUpdateCustomer = (updatedCustomer: Partial<Customer>) => {
    // Create an audit record
    window.dispatchEvent(
      new CustomEvent("audit:create", {
        detail: {
          id: Math.floor(Math.random() * 10000),
          submitTime: new Date().toLocaleString(),
          customer: customer.fullNameCn,
          type: "修改",
          category: "客户信息",
          before: `客户名称: ${customer.fullNameCn}\n联系人: ${customer.contact || ''}\n电话: ${customer.phone || ''}`,
          after: `客户名称: ${updatedCustomer.fullNameCn || customer.fullNameCn}\n联系人: ${updatedCustomer.contact || customer.contact || ''}\n电话: ${updatedCustomer.phone || customer.phone || ''}`,
          note: "",
          submitter: "当前用户",
          status: "pending"
        },
      })
    );
    
    toast({
      title: "提交审核",
      description: "已提交修改客户信息审核请求，审核通过后修改将生效",
    });
    
    if (onEditCustomer) {
      onEditCustomer(updatedCustomer);
    }
    setEditDialogOpen(false);
  };

  const handleAddServiceRecord = (record: any) => {
    // Create a new transaction record
    const newTransaction: TransactionData = {
      id: transactionData.length + 1,
      date: record.date,
      amount: parseFloat(record.amount) || 0,
      type: record.type,
      purpose: record.purpose || "",
      department: record.department || "",
      person: record.person || "",
      description: record.notes || ""
    };

    // Add the new transaction to the list
    setTransactionData([newTransaction, ...transactionData]);
  };

  return {
    activeTab,
    setActiveTab,
    editDialogOpen,
    setEditDialogOpen,
    transactionData,
    handleUpdateCustomer,
    handleAddServiceRecord
  };
}
