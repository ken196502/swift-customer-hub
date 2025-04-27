
import React from "react";
import type { Customer } from "@/pages/Index";

interface BasicInformationProps {
  customer: Customer;
}

export function BasicInformation({ customer }: BasicInformationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">客户号：</div>
          <div className="col-span-2">{customer.customerNumber}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">所属集团：</div>
          <div className="col-span-2">{customer.groupName}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">英文简称：</div>
          <div className="col-span-2">{customer.shortNameEn}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">中文简称：</div>
          <div className="col-span-2">{customer.shortNameCn}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">英文全称：</div>
          <div className="col-span-2">{customer.fullNameEn}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">中文全称：</div>
          <div className="col-span-2">{customer.fullNameCn}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">客户类型：</div>
          <div className="col-span-2">{customer.type}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">是否上市：</div>
          <div className="col-span-2">{customer.isListed ? "是" : "否"}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">股票代码：</div>
          <div className="col-span-2">{customer.stockCode}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">城市地区：</div>
          <div className="col-span-2">{customer.city}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">证件类型：</div>
          <div className="col-span-2">{customer.idType}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">证件号码：</div>
          <div className="col-span-2">{customer.idNumber}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">股东：</div>
          <div className="col-span-2">{customer.shareholders}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">实控人：</div>
          <div className="col-span-2">{customer.actualController}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">注册资本：</div>
          <div className="col-span-2">{customer.registeredCapital}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">成立日期：</div>
          <div className="col-span-2">{customer.establishDate}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">注册地址：</div>
          <div className="col-span-2">{customer.registeredAddress}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">法人代表：</div>
          <div className="col-span-2">{customer.legalRepresentative}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">风险等级：</div>
          <div className="col-span-2">{customer.riskLevel}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">录入时间：</div>
          <div className="col-span-2">{customer.entryDate}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-sm text-gray-500">活跃状态：</div>
          <div className="col-span-2">{customer.activeStatus}</div>
        </div>
      </div>
    </div>
  );
}
