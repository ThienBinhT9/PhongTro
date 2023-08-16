export const getNumberFromString = (string) => {
    let number = 0
    if (string?.search('đồng/tháng') !== -1) {
        number = +string?.match(/\d+/)[0] / Math.pow(10, 3)
    } else if (string?.search('triệu/tháng') !== -1) {
        number = +string?.match(/\d+/)[0]
    } else if (string?.search('m')) {
        number = +string?.match(/\d+/)[0]
    }
    return +number
}


export const FormatDate = (chuoi_ngay_gio) => {
    const ngay_gio_hien_tai = new Date();
    const ngay_gio_tao = new Date(chuoi_ngay_gio);
  
    // Tính khoảng thời gian giữa thời gian hiện tại và thời gian tạo
    const khoang_thoi_gian = ngay_gio_hien_tai.getTime() - ngay_gio_tao.getTime();
  
    // Đổi thành mili giây
    const mili_giay = 1000;
    const mili_phut = mili_giay * 60;
    const mili_gio = mili_phut * 60;
    const mili_ngay = mili_gio * 24;
  
    if (khoang_thoi_gian < mili_giay) {
      return "Vừa xong";
    } else if (khoang_thoi_gian < mili_phut) {
      const so_phut = Math.floor(khoang_thoi_gian / mili_giay);
      return so_phut + " phút trước";
    } else if (khoang_thoi_gian < mili_gio) {
      const so_gio = Math.floor(khoang_thoi_gian / mili_phut);
      return so_gio + " giờ trước";
    } else if (khoang_thoi_gian < mili_ngay) {
      const so_ngay = Math.floor(khoang_thoi_gian / mili_gio);
      if (so_ngay === 1) {
        return "1 ngày trước";
      } else {
        return so_ngay + " ngày trước";
      }
    } else {
      // Định dạng ngày tháng năm
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return ngay_gio_tao.toLocaleDateString('vi-VN', options);
    }
}

export const getNumberFromString02 = (string) => {
    
  const numbers = string.match(/-?\d+(\.\d+)?/g)

  const parsedNum = numbers.map(item => Math.floor(parseFloat(item)))
    
  return parsedNum
  
}