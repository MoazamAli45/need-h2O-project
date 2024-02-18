export const getData = async () => {
  try {
    const res = await fetch(`/api/order`);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await res.json();
    const data = resData?.data;
    console.log(data, "Data");
    return data;
  } catch (error) {
    // toast.error(error);
    console.log(error);
  }
};
