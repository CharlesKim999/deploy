import {
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Conversion from "./component/Conversion";
import Repurchase from "./component/Repurchase";
import Duo from "./component/Duo";
import AvgCharge from "./component/AvgCharge";
import { useChartStore } from "../../libs/hooks/chart/store";
import DoughnutChart from "../../components/DoughnutChart";
import { ANALYTICS_TYPE } from "../../libs/constant/anaytics";
import LineChart from "../../components/LineChart";
import PolarAreaChart from "../../components/PolarAreaChart";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnalyzingPage = () => {
  // const [value, setValue] = useState(ANALYTICS_TYPE.CONVERSION);
  const chartType = useChartStore((state) => state.chartType);
  const doughnutProp = useChartStore((state) => state.doughnutProp);
  const lineProp = useChartStore((state) => state.lineProp);
  const polarAreaProp = useChartStore((state) => state.polarAreaProp);
  const barProp = useChartStore((state) => state.barProp);
  const setChartType = useChartStore((state) => state.setChartType);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue((event.target as HTMLInputElement).value);
    setChartType(event.target?.value);
  };
  const path = window.location.pathname;
  const [nextPath, setNextPath] = useState("analyzing");
  const [isFade, setIsFade] = useState(true);
  const navigate = useNavigate();

  const onclickNav = (path: string) => {
    setNextPath(path);
    setIsFade(false);
  };

  useEffect(() => {
    if (path === "/analyzing") {
      setIsFade(true);
    } else {
      setIsFade(false);
    }
  }, [path]);
  const component = () => {
    console.log(chartType);
    switch (chartType) {
      case ANALYTICS_TYPE.CONVERSION:
        return <Conversion />;
      case ANALYTICS_TYPE.REPURCHASE:
        return <Repurchase />;
      case ANALYTICS_TYPE.DUO:
        return <Duo />;
      case ANALYTICS_TYPE.AVG:
        return <AvgCharge />;
      default:
        return <div>default</div>;
    }
  };

  return (
    <Fade in={isFade} timeout={300} onExited={() => navigate(nextPath)}>
      <div className="flex flex-1 gap-4">
        <nav className="flex flex-col w-[512px] bg-indigo-100">
          <div className="p-10 flex flex-1 flex-col gap-10 justify-between">
            <div className="flex flex-col gap-10">
              <h1 className="text-4xl">분석페이지</h1>
              <FormControl>
                <RadioGroup value={chartType} onChange={handleChange}>
                  <FormControlLabel
                    value={ANALYTICS_TYPE.CONVERSION}
                    control={<Radio />}
                    label="구매 전환율"
                  />
                  <FormControlLabel
                    value={ANALYTICS_TYPE.REPURCHASE}
                    control={<Radio />}
                    label="재구매 주기"
                  />
                  <FormControlLabel
                    value={ANALYTICS_TYPE.DUO}
                    control={<Radio />}
                    label="함께 구매한 상품"
                  />
                  <FormControlLabel
                    value={ANALYTICS_TYPE.AVG}
                    control={<Radio />}
                    label="평균결제금액"
                  />
                </RadioGroup>
              </FormControl>
              {component()}
            </div>
            <div>
              <Button
                variant="contained"
                fullWidth
                onClick={() => onclickNav("/data")}
                size="large"
              >
                데이터 페이지 둘러보기
              </Button>
            </div>
          </div>
        </nav>
        <div className="flex-1 max-w-[1080px] m-10 flex justify-center items-center">
          {chartType === ANALYTICS_TYPE.CONVERSION && doughnutProp && (
            <DoughnutChart {...doughnutProp} />
          )}
          {chartType === ANALYTICS_TYPE.REPURCHASE && lineProp && (
            <LineChart {...lineProp} />
          )}
          {chartType === ANALYTICS_TYPE.DUO && polarAreaProp && (
            <PolarAreaChart {...polarAreaProp} />
          )}
          {chartType === ANALYTICS_TYPE.AVG && barProp && (
            <BarChart {...barProp} />
          )}
        </div>
      </div>
    </Fade>
  );
};

export default AnalyzingPage;
