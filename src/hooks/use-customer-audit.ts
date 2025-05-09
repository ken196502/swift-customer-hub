
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/contexts/CustomerContext";

export interface CustomerAuditOptions {
  onApproved?: (updatedCustomer: Partial<Customer>) => void;
}

export function useCustomerAudit(options?: CustomerAuditOptions) {
  const { toast } = useToast();
  const [pendingChanges, setPendingChanges] = useState<{
    customerId?: number;
    customerName?: string;
    before?: Partial<Customer>;
    after?: Partial<Customer>;
  } | null>(null);

  const submitCustomerChanges = (
    originalCustomer: Customer | null,
    updatedData: Partial<Customer>,
    isNewCustomer: boolean = false
  ) => {
    // Format customer name for the audit record
    const customerName = updatedData.fullNameCn || updatedData.shortNameCn || "新客户";
    
    // For a new customer, we don't have "before" data
    const auditData = {
      id: Math.floor(Math.random() * 10000),
      submitTime: new Date().toLocaleString(),
      customer: customerName,
      type: isNewCustomer ? "新增" : "修改",
      category: "客户信息",
      before: isNewCustomer ? "" : formatCustomerDiff(originalCustomer),
      after: formatCustomerDiff(updatedData),
      note: isNewCustomer ? "新建客户" : "更新客户信息",
      submitter: "当前用户",
      status: "pending"
    };

    // Store the pending changes to apply when approved
    setPendingChanges({
      customerId: originalCustomer?.id,
      customerName,
      before: originalCustomer ? { ...originalCustomer } : {},
      after: updatedData
    });

    // Dispatch an event to create an audit record
    window.dispatchEvent(
      new CustomEvent("audit:create", {
        detail: auditData,
      })
    );

    toast({
      title: "审核提交成功",
      description: "客户信息变更已提交审核，通过后将生效",
    });

    return auditData.id;
  };

  // Listen for audit approved events
  const setupAuditApprovedListener = () => {
    const handleAuditApproved = (event: CustomEvent) => {
      const { type, category, itemId, customer } = event.detail;
      
      if (type === "客户信息" && pendingChanges && pendingChanges.customerName === customer) {
        if (options?.onApproved && pendingChanges.after) {
          options.onApproved(pendingChanges.after);
          setPendingChanges(null);
          
          toast({
            title: "审核已通过",
            description: "客户信息变更已生效",
          });
        }
      }
    };

    window.addEventListener("audit:approved", handleAuditApproved as EventListener);
    
    return () => {
      window.removeEventListener("audit:approved", handleAuditApproved as EventListener);
    };
  };

  // Helper function to format customer data for audit display
  const formatCustomerDiff = (customer: Partial<Customer> | null | undefined) => {
    if (!customer) return "";
    
    // Format key customer fields for the audit record
    return [
      customer.fullNameCn ? `名称: ${customer.fullNameCn}` : "",
      customer.type ? `类型: ${customer.type}` : "",
      customer.groupName ? `集团: ${customer.groupName}` : "",
      customer.phone ? `电话: ${customer.phone}` : "", 
      customer.contact ? `联系人: ${customer.contact}` : "",
      customer.products?.length ? `产品: ${customer.products.join(", ")}` : "",
      customer.sponsorDepartments?.length ? `主办部门: ${customer.sponsorDepartments.join(", ")}` : ""
    ].filter(Boolean).join("\n");
  };

  return {
    submitCustomerChanges,
    setupAuditApprovedListener,
    pendingChanges
  };
}
