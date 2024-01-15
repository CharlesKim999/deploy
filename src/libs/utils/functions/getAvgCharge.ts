import { std } from "mathjs";

type Props = {
  data: Data[];
};

type Bought = {
  [key: string]: number;
};
const chargeCoverage = [1000, 5000, 10000, 50000, 100000];

const getAvgCharge = (props: Props) => {
  const { data } = props;
  console.log(std([1, 2, 3, 4]));
  const userBought: Bought = {};
  let totalCharge = 0;

  for (const item of data) {
    const userId = item.userName + item.address;
    if (userBought[userId]) {
      userBought[userId] += item.price;
    } else {
      userBought[userId] = item.price;
    }
    totalCharge += item.price;
  }

  const coverage = {
    pivot: 1000,
    divide: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const maxCharge = Math.max(...Object.values(userBought));
  for (const pivot of chargeCoverage) {
    if (maxCharge > pivot * 10) {
      coverage.pivot = pivot;
      continue;
    }
    break;
  }

  for (const key in userBought) {
    const idx = Math.floor(userBought[key] / coverage.pivot);
    if (idx == 0) {
      coverage.divide[0] += 1;
    } else if (idx >= 10) {
      coverage.divide[9] += 1;
    } else {
      coverage.divide[idx - 1] += 1;
    }
  }

  const userCnt = Object.keys(userBought).length;
  const avgCharge = totalCharge / userCnt;

  return { avgCharge, coverage };
};

export default getAvgCharge;
