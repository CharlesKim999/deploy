import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useFetchingData from "../../../libs/hooks/useFetchingData";
import getRepurchase from "../../../libs/utils/functions/getRepurchase";
import { useChartStore } from "../../../libs/hooks/chart/store";

const Repurchase = () => {
  const { data } = useFetchingData();
  const [productList, setProductList] = useState<string[]>([]);
  const [pivotItem, setPivotItem] = useState<string | null>(productList[0]);
  const setLineProp = useChartStore((state) => state.setLineProp);

  useEffect(() => {
    if (!pivotItem) return;
    const ChartX = 4;
    const { repurchaseGapSum, repurchaseRate } = getRepurchase({
      data,
      pivotItem,
      term: ChartX,
    });
    console.log(repurchaseGapSum, repurchaseRate);
    const body = Object.values(repurchaseGapSum);
    const labels = Object.keys(repurchaseGapSum).map(
      (item) => `${+item * ChartX}주`
    );
    setLineProp({ body, labels });
    return;
  }, [pivotItem]);

  useEffect(() => {
    if (data?.length > 0 && productList.length == 0) {
      const products = data.map((item) => item.productName);
      const uniqueProducts = products.filter(
        (item, index) => products.indexOf(item) === index
      );
      setProductList(uniqueProducts);
    }
  }, [data, productList]);

  return (
    <div className="flex flex-col w-full gap-2">
      <Autocomplete
        className="flex-1"
        options={productList}
        onChange={(_event, value) => setPivotItem(value)}
        renderInput={(params) => <TextField {...params} label="기준품목명" />}
      />
    </div>
  );
};

export default Repurchase;
