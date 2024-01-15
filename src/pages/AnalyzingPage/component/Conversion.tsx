import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useFetchingData from "../../../libs/hooks/useFetchingData";
import getConversion from "../../../libs/utils/functions/getConversion";
import { useChartStore } from "../../../libs/hooks/chart/store";
import { ANALYTICS_TYPE } from "../../../libs/constant/anaytics";

const Conversion = () => {
  const { data, loading } = useFetchingData();
  const [productList, setProductList] = useState<string[]>([]);
  const [pivotItem, setPivotItem] = useState<string | null>("");
  const [targetItem, setTargetItem] = useState<string | null>("");

  const setDoughnutProp = useChartStore((state) => state.setDoughnutProp);
  const setChartType = useChartStore((state) => state.setChartType);

  useEffect(() => {
    if (!pivotItem || !targetItem) return;

    const { boughtUser, conversionUser } = getConversion({
      data,
      pivotItem,
      targetItem,
    });

    const chartLabel = ["재구매", "구매이탈"];
    const chartData = [
      conversionUser.size,
      boughtUser.size - conversionUser.size,
    ];
    const chartProp = { body: chartData, labels: chartLabel };

    setDoughnutProp(chartProp);
    setChartType(ANALYTICS_TYPE.CONVERSION);
  }, [data, pivotItem, setChartType, setDoughnutProp, targetItem]);

  useEffect(() => {
    if (data?.length > 0 && !loading && productList.length == 0) {
      const products = data.map((item) => item.productName);
      const uniqueProducts = products.filter(
        (item, index) => products.indexOf(item) === index
      );
      setProductList(uniqueProducts);
    }
  }, [data, loading, productList]);

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <Autocomplete
          className="flex-1"
          options={productList}
          onChange={(_e, value) => setPivotItem(value)}
          renderInput={(params) => <TextField {...params} label="기준품목명" />}
        />
        <Autocomplete
          className="flex-1"
          options={productList}
          onChange={(_e, value) => setTargetItem(value)}
          renderInput={(params) => <TextField {...params} label="대상품목명" />}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          기준품목명에 <strong>[증정품]품목</strong> 을 기입해주세요
        </div>
        <div>
          대상품목명에 <strong>품목</strong> 을 기입해주세요
        </div>
        <div>
          <div>
            복잡한 <strong>함수설정</strong> 없이{" "}
            <strong>간단하고 빠르게</strong>
          </div>
          <div>분석값을 얻을 수 있습니다.</div>
        </div>
      </div>
    </>
  );
};

export default Conversion;
