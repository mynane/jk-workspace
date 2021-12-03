/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
export const queue = async (lists: any[]) => {
  const result: any = [];
  for (const list of lists) {
    try {
      console.log(1);
      const re: unknown = await Promise.resolve(list);
      console.log(2);
      result.push(re);
    } catch (error) {
      // result.push(error);
    }
  }

  return Promise.resolve(result);
};
