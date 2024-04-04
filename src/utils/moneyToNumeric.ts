// The money parameter could be either in one of the two formats
// Format 1: ($###.##) which means a negative ###.##
// Format 2: $###.## which means a positive ###.##

export const moneyToNumeric = (money: string) => {
  // This if statement handles format 1
  if (money[0] === "(") {
    return (
      parseFloat(money.substring(2, money.length - 1).replaceAll(",", "")) * -1
    );
  }

  // This statement handles format 2
  return parseFloat(money.substring(1).replaceAll(",", ""));
};
