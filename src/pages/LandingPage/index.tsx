import { Button, Fade, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const path = window.location.pathname;
  const [nextPath, setNextPath] = useState("/");
  const [isFade, setIsFade] = useState(true);
  const navigate = useNavigate();
  const onclickNav = (path: string) => {
    setNextPath(path);
    setIsFade(false);
  };
  useEffect(() => {
    if (path === "/") {
      setIsFade(true);
    } else {
      setIsFade(false);
    }
  }, [path]);
  return (
    <Fade in={isFade} timeout={300} onExited={() => navigate(nextPath)}>
      <div className="flex flex-col flex-1 w-[768px] items-center justify-center">
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">
            안녕하세요 프론트엔드 개발자 김찬섭입니다.
          </h1>
          <div className="flex gap-4">
            <Paper className="flex flex-col flex-1 p-4" elevation={10}>
              <div className="p-2 flex font-semibold flex-col items-center justify-center flex-1 gap-1">
                <div>4가지 분석 샘플에 사용되는</div>
                <div>30,000건의 더미데이터를</div>
                <div>확인해 보세요!</div>
              </div>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onclickNav("data")}
              >
                데이터 둘러보기
              </Button>
            </Paper>
            <Paper className="flex flex-col flex-1 p-4" elevation={10}>
              <div className="flex flex-col">
                <div className="p-2 flex font-semibold flex-col items-center gap-1 h-full">
                  <div>구매전환율, 고객 재구매율</div>
                  <div>함께 구매한 상풍, 고객평균결제금액</div>
                  <div>4가지 분석 샘플을 체험해보세요</div>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onclickNav("analyzing")}
                >
                  분석페이지 둘러보기
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default LandingPage;
