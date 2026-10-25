export type Farm = {
  id: string;
  name: string;
  location: string;
  crop: string;
  areaFeddan: number;
  status: "نشطة" | "قيد المتابعة";
};
