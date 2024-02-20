export const getData = async () => {
  try {
    const res = await fetch(`/api/order`);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await res.json();
    const data = resData?.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
