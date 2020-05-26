export const searchProducts = (filterString, array) => {
    let query = filterString.toLowerCase();
    return array.filter(item => item.device_name.toLowerCase().indexOf(query) >= 0);
  }