  const fetchData = async (apiFunction, page = 1,setLastPage,setData,search) => {
    try {
      const response = await apiFunction(page,search);
      if (response.data && response.data.data) {
        setLastPage(response.data.last_page); 
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  export default fetchData;