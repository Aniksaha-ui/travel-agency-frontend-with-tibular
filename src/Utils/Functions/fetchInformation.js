const fetchData = async (
  apiFunction,
  page = 1,
  setLastPage,
  setData,
  search,
  setPaginationInformation,
  setLoading
) => {
  try {
    const response = await apiFunction(page, search);

    if (response.data.length === 0) {
      setLastPage(1);
      setData([]);
      setPaginationInformation({
        to: 0,
        from: 0,
        total: 0,
      });
      setLoading(false);
    }
    if (response.data && response.data.data) {
      setLastPage(response.data.last_page);
      setData(response.data.data ?? []);
      setPaginationInformation({
        to: response.data.to,
        from: response.data.from,
        total: response.data.total,
      });
      setLoading(false);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
