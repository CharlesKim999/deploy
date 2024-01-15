import { create } from "zustand";
import { ANALYTICS_TYPE } from "../../constant/anaytics";

interface ChartStore {
  chartType: string | null;
  doughnutProp: DounutChartProps | null;
  lineProp: LineChartProps | null;
  polarAreaProp: PolarAreaChartProps | null;
  barProp: BarChartProps | null;
  setChartType: (chartType: string) => void;
  setLineProp: (lineProp: LineChartProps) => void;
  setDoughnutProp: (doughnutProp: DounutChartProps) => void;
  setPolarAreaProp: (PolarAreaProp: PolarAreaChartProps) => void;
  setBarProp: (barProp: BarChartProps) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartType: ANALYTICS_TYPE.CONVERSION,
  doughnutProp: null,
  lineProp: null,
  polarAreaProp: null,
  barProp: null,
  setLineProp: (lineProp: LineChartProps) => set({ lineProp }),
  setDoughnutProp: (doughnutProp: DounutChartProps) => set({ doughnutProp }),
  setChartType: (chartType: string) => set({ chartType }),
  setPolarAreaProp: (polarAreaProp: PolarAreaChartProps) =>
    set({ polarAreaProp }),
  setBarProp: (barProp: BarChartProps) => set({ barProp }),
}));
