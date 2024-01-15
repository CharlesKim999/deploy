type Props = {
  data: Data[];
  pivotItem: string;
};

type Bought = {
  [key: string]: number;
};

const getDuo = (props: Props) => {
  const { data, pivotItem } = props;
  const MINIMUM = 1;

  const bought: Bought = {};
  const boughtUser = new Set();
  data.forEach((item) => {
    const userId = item.userName + item.address;
    if (item.productName === pivotItem && !boughtUser.has(userId)) {
      boughtUser.add(userId);
    } else {
      if (boughtUser.has(userId)) {
        if (bought[item.productName]) {
          bought[item.productName] += 1;
        } else {
          bought[item.productName] = 1;
        }
      }
    }
  });

  for (const key in bought) {
    if (bought[key] < MINIMUM) {
      delete bought[key];
    }
  }

  return { bought };
};

export default getDuo;
