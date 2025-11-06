function debounce(func, delay) {
      func.timer = setTimeout(() => {
        func();
      }, delay);
  }

  
  export default debounce;