import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useFetchingData from "../../../libs/hooks/useFetchingData";
import getDuo from "../../../libs/utils/functions/getDuo";
import { useChartStore } from "../../../libs/hooks/chart/store";

const Duo = () => {
  const { data } = useFetchingData();
  const [productList, setProductList] = useState<string[]>([]);
  const [pivotItem, setPivotItem] = useState<string | null>("");
  const setPolarAreaProp = useChartStore((state) => state.setPolarAreaProp);
  useEffect(() => {
    if (!pivotItem) return;
    const { bought } = getDuo({ data, pivotItem });
    const labels = Object.keys(bought);
    const body = Object.values(bought);
    setPolarAreaProp({ body, labels });
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
    <div className="flex w-full">
      <Autocomplete
        className="flex-1"
        options={productList}
        onChange={(_event, value) => setPivotItem(value)}
        renderInput={(params) => <TextField {...params} label="기준품목명" />}
      />
      {/* <Button className="flex-2" onClick={() => duo()}>
        함께산 상품
      </Button> */}
    </div>
  );
};

export default Duo;
