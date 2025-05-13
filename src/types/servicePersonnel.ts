
export interface ServicePersonnel {
  id: number;
  name: string;
  englishName: string;
  position: string;
  industry: string;
  status: "在职" | "离职";
  systemUser: string;
  email: string;
  phone: string;
}
