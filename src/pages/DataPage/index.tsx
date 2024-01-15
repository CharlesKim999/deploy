import { useEffect, useState } from "react";
import MockTable from "../../components/MockTable";
import { Button, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataPage = () => {
  const path = window.location.pathname;
  const [nextPath, setNextPath] = useState("data");
  const [isFade, setIsFade] = useState(true);
  const navigate = useNavigate();
  const onclickNav = (path: string) => {
    setNextPath(path);
    setIsFade(false);
  };
  useEffect(() => {
    if (path === "/data") {
      setIsFade(true);
    } else {
      setIsFade(false);
    }
  }, [path]);
  return (
    <Fade in={isFade} timeout={300} onExited={() => navigate(nextPath)}>
      <div className="flex gap-4">
        <nav className="flex flex-col w-96 bg-indigo-100">
          <div className="p-10 flex flex-col gap-10 flex-1 justify-between">
            <div className="flex flex-col gap-10 ">
              <h1 className="text-4xl">데이터 페이지</h1>
              <div className="text-xl flex flex-col gap-10">
                <div>
                  <p>이번 분석 서비스에 사용된</p>
                  <p>가상데이터입니다.</p>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onclickNav("/analyzing")}
              size="large"
            >
              분석페이지 둘러보기
            </Button>
          </div>
        </nav>
        <div className="flex flex-1 justify-center items-center ">
          <MockTable />
        </div>
      </div>
    </Fade>
  );
};

export default DataPage;
