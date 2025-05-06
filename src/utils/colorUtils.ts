
export function getProductColor(product: string): string {
  switch (product) {
    case "股票交易":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "咨询":
      return "bg-pink-100 text-pink-800 hover:bg-pink-100";
    case "债券交易":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "IPO":
      return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100";
    default:
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
  }
}

export function getTagColor(tag: string): string {
  switch (tag) {
    case "零售经纪":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "机构经纪":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "跨资产":
      return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100";
    case "DCM":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
  }
}
