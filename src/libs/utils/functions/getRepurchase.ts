type Props = {
  data: Data[];
  pivotItem: string;
  term: number;
};

type Bought = {
  [key: string]: string[];
};
type repurchaseGap = {
  [key: string]: number;
};

const getRepurchase = (props: Props) => {
  const { data, pivotItem, term } = props;
  const TERM = term * 7;

  const bought: Bought = {};
  data.forEach((item) => {
    if (item.productName === pivotItem) {
      if (bought[item.userName]) {
        bought[item.userName].push(item.date);
      } else {
        bought[item.userName] = [item.date];
      }
    }
  });

  const repurchase: Bought = {};
  const repurchaseGap: repurchaseGap = {};

  for (const key in bought) {
    if (bought[key].length > 1) {
      repurchase[key] = bought[key];

      const sortedDates = bought[key]
        .map((date) => new Date(date).getTime())
        .sort((a, b) => a - b);
      let days = 0;

      for (let i = 0; i < sortedDates.length - 1; i++) {
        const diff = sortedDates[i + 1] - sortedDates[i];
        days += diff / (1000 * 60 * 60 * 24);
      }

      repurchaseGap[key] = Math.round(days / (sortedDates.length - 1));
    }
  }

  const repurchaseGapArr = Object.values(repurchaseGap);
  const repurchaseGapSum = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  repurchaseGapArr.forEach((item) => {
    if (item <= TERM) {
      repurchaseGapSum[1] += 1;
    } else if (item <= 2 * TERM) {
      repurchaseGapSum[2] += 1;
    } else if (item <= 3 * TERM) {
      repurchaseGapSum[3] += 1;
    } else if (item <= 4 * TERM) {
      repurchaseGapSum[4] += 1;
    } else {
      repurchaseGapSum[5] += 1;
    }
  });
  const repurchaseRate =
    Math.round(
      (Object.keys(repurchase).length / Object.keys(bought).length) * 10000
    ) / 100;

  return { repurchaseRate, repurchaseGapSum };
};

export default getRepurchase;
