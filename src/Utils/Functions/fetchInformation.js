const fetchData = async (
  apiFunction,
  page = 1,
  setLastPage,
  setData,
  search,
  setPaginationInformation
) => {
  try {
    const response = await apiFunction(page, search);
    if (response.data && response.data.data) {
      setLastPage(response.data.last_page);
      setData(response.data.data);
      setPaginationInformation({
        to: response.data.to,
        from: response.data.from,
        total: response.data.total
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
