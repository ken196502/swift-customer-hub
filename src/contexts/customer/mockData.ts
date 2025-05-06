
import { Customer } from './customerTypes';

export const initialCustomers: Customer[] = [
  {
    id: 1,
    customerNumber: "C20240001",
    groupName: "小米集团",
    nameEn: "Xiaomi Auto",
    shortNameEn: "Xiaomi Auto",
    fullNameEn: "Xiaomi Automobile Co., Ltd.",
    shortNameCn: "小米汽车",
    fullNameCn: "小米汽车有限责任公司",
    type: "公司户",
    isListed: true,
    stockCode: "1810.HK",
    city: "北京",
    idType: "统一社会信用代码",
    idNumber: "91110000XXXXX",
    shareholders: "雷军,小米科技",
    actualController: "雷军",
    registeredCapital: "100亿元",
    establishDate: "2021-09-01",
    registeredAddress: "北京市海淀区清河中街68号",
    legalRepresentative: "雷军",
    riskLevel: "低",
    entryDate: "2019-10-01",
    activeStatus: "活跃",
    products: ["股票交易", "咨询", "债券交易", "IPO", "发债"],
    tags: ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"],
  },
  {
    id: 2,
    customerNumber: "C20240002",
    groupName: "小米集团",
    nameEn: "Xiaomi Tech",
    shortNameEn: "Xiaomi Tech",
    fullNameEn: "Xiaomi Technology Co., Ltd.",
    shortNameCn: "小米科技",
    fullNameCn: "小米科技有限公司",
    type: "公司户",
    isListed: true,
    stockCode: "1810.HK",
    city: "北京",
    idType: "统一社会信用代码",
    idNumber: "91110000YYYYY",
    shareholders: "雷军",
    actualController: "雷军",
    registeredCapital: "120亿元",
    establishDate: "2010-04-06",
    registeredAddress: "北京市海淀区安宁庄路66号",
    legalRepresentative: "雷军",
    riskLevel: "低",
    entryDate: "2018-05-15",
    activeStatus: "活跃",
    products: ["股票交易", "咨询", "债券交易"],
    tags: ["零售经纪", "机构经纪"],
  }
];

export const initialProductOptions: string[] = ["股票交易", "咨询", "债券交易", "IPO", "发债"];
export const initialTagOptions: string[] = ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"];
export const initialContactTypes: string[] = ["电话", "会议", "邮件", "拜访", "社交活动"];
export const initialGroupOptions: string[] = ["小米集团", "腾讯", "阿里", "字节"];
