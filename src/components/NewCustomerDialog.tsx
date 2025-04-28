
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Customer;  // Add this line
}

export function NewCustomerDialog({ open, onOpenChange, initialData }: NewCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>客户号</Label>
              <Input placeholder="请输入客户号" />
            </div>

            <div className="space-y-2">
              <Label>所属集团</Label>
              <Input placeholder="请输入所属集团" />
            </div>

            <div className="space-y-2">
              <Label>英文简称</Label>
              <Input placeholder="请输入英文简称" />
            </div>

            <div className="space-y-2">
              <Label>中文简称</Label>
              <Input placeholder="请输入中文简称" />
            </div>

            <div className="space-y-2">
              <Label>英文全称</Label>
              <Input placeholder="请输入英文全称" />
            </div>

            <div className="space-y-2">
              <Label>中文全称</Label>
              <Input placeholder="请输入中文全称" />
            </div>

            <div className="space-y-2">
              <Label>客户类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择客户类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">公司户</SelectItem>
                  <SelectItem value="personal">个人户</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>是否上市</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择是否上市" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">是</SelectItem>
                  <SelectItem value="false">否</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>股票代码</Label>
              <Input placeholder="请输入股票代码" />
            </div>

            <div className="space-y-2">
              <Label>城市地区</Label>
              <Input placeholder="请输入城市地区" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>证件类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择证件类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">统一社会信用代码</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>证件号码</Label>
              <Input placeholder="请输入证件号码" />
            </div>

            <div className="space-y-2">
              <Label>股东</Label>
              <Input placeholder="请输入股东信息" />
            </div>

            <div className="space-y-2">
              <Label>实控人</Label>
              <Input placeholder="请输入实控人" />
            </div>

            <div className="space-y-2">
              <Label>注册资本</Label>
              <Input placeholder="请输入注册资本" />
            </div>

            <div className="space-y-2">
              <Label>成立日期</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>注册地址</Label>
              <Input placeholder="请输入注册地址" />
            </div>

            <div className="space-y-2">
              <Label>法人代表</Label>
              <Input placeholder="请输入法人代表" />
            </div>

            <div className="space-y-2">
              <Label>风险等级</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择风险等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">低</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>活跃状态</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择活跃状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">不活跃</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
