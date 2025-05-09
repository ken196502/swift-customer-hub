
import { useToast } from "@/hooks/use-toast";

export interface ManagementChangeRecord {
  id: number;
  date: string;
  type: "集团" | "联系类型";
  before: string[];
  after: string[];
  user: string;
}

export function useManagementAudit() {
  const { toast } = useToast();

  const recordManagementChange = (
    type: "集团" | "联系类型",
    before: string[],
    after: string[]
  ): ManagementChangeRecord => {
    // Create a change record
    const changeRecord: ManagementChangeRecord = {
      id: Math.floor(Math.random() * 10000),
      date: new Date().toLocaleString(),
      type,
      before,
      after,
      user: "当前用户"
    };

    // Create an audit record for the change
    window.dispatchEvent(
      new CustomEvent("audit:create", {
        detail: {
          id: changeRecord.id,
          submitTime: changeRecord.date,
          customer: "系统配置",
          type: "修改",
          category: type === "集团" ? "集团管理" : "联系类型管理",
          before: before.join(", "),
          after: after.join(", "),
          note: `${type}配置变更`,
          submitter: changeRecord.user,
          status: "pending"
        },
      })
    );

    toast({
      title: "配置变更已提交",
      description: `${type}配置变更记录已提交审核，通过后将生效`,
    });

    return changeRecord;
  };

  return {
    recordManagementChange
  };
}
