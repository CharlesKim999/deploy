import useFetchingData from "../../../libs/hooks/useFetchingData";
import getAvgCharge from "../../../libs/utils/functions/getAvgCharge";
import { useEffect } from "react";
import { useChartStore } from "../../../libs/hooks/chart/store";

const AvgCharge = () => {
  const { data, loading } = useFetchingData();
  const setBarProp = useChartStore((state) => state.setBarProp);
  useEffect(() => {
    const { avgCharge, coverage } = getAvgCharge({ data });
    const labels = [];
    for (let i = 0; i < 10; i++) {
      labels.push(
        `${(i + 1) * coverage.pivot}원 ${
          i == 0 ? "이하" : i == 9 ? "이상" : ""
        }`
      );
    }
    const body = Object.values(coverage.divide);
    setBarProp({ body, labels, avg: avgCharge });
  }, [loading]);

  return <div className="flex w-full"></div>;
};

export default AvgCharge;
