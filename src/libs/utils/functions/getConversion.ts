type Props = {
  data: Data[];
  pivotItem: string;
  targetItem: string;
};

const getConversion = (props: Props) => {
  const { data, pivotItem, targetItem } = props;
  console.log(pivotItem, targetItem);
  const boughtUser = new Set();
  const conversionUser = new Set();
  data.forEach((item) => {
    if (item.productName === pivotItem) {
      boughtUser.add(item.userName);
    }
  });
  data.forEach((item) => {
    if (item.productName === targetItem && boughtUser.has(item.userName)) {
      conversionUser.add(item.userName);
    }
  });

  return { boughtUser, conversionUser };
};

export default getConversion;
