// Validation functions for user input

/**
 * Validate field using switch statement
 * @param {string} name       - tên field (userName, email, password, confirmPassword, phoneNumber)
 * @param {string} value      - giá trị hiện tại của field
 * @param {object} allValues  - toàn bộ values của form (dùng cho confirmPassword)
 * @returns {string}          - thông báo lỗi, hoặc '' nếu hợp lệ
 */
export const validateField = (name, value, allValues = {}) => {
  switch (name) {
    case 'username':
      if (!value || value.trim() === '') {
        return 'Tên người dùng không được để trống';
      }
      if (value.length < 3) {
        return 'Tên người dùng phải có ít nhất 3 ký tự';
      }
      if (value.length > 50) {
        return 'Tên người dùng không được vượt quá 50 ký tự';
      }
      if (!/^[a-zA-Z0-9_\s-]+$/.test(value)) {
        return 'Tên người dùng chỉ chứa chữ, số, dấu cách, dấu gạch dưới và dấu gạch ngang';
      }
      return '';

    case 'email':
      if (!value || value.trim() === '') {
        return 'Email không được để trống';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Email không hợp lệ';
      }
      return '';

    case 'password':
      if (!value) {
        return 'Mật khẩu không được để trống';
      }
      if (value.length < 6) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      if (value.length > 50) {
        return 'Mật khẩu không được vượt quá 50 ký tự';
      }
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
      }
      // Kiểm tra nếu confirmPassword tồn tại thì so sánh
      if (allValues.confirmPassword && value !== allValues.confirmPassword) {
        return 'Mật khẩu và xác nhận mật khẩu không trùng khớp';
      }
      return '';

    case 'confirmPassword':
      if (!value) {
        return 'Xác nhận mật khẩu không được để trống';
      }
      // Lấy password từ allValues để so sánh
      if (allValues.password && value !== allValues.password) {
        return 'Mật khẩu và xác nhận mật khẩu không trùng khớp';
      }
      return '';

    case 'phoneNumber':
      if (!value || value.trim() === '') {
        return 'Số điện thoại không được để trống';
      }
      const phoneNumberRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneNumberRegex.test(value.replace(/\s/g, ''))) {
        return 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số bắt đầu với 0 hoặc +84';
      }
      return '';
    
    case 'address':
      if (!value || value.trim() === '') {
        return 'Địa chỉ không được để trống';
      }
      return '';

    default:
      return '';
  }
};

/**
 * Validate all user input at once
 * @param {object} allValues - User input data
 * @param {string} allValues.userName - Username
 * @param {string} allValues.email - Email
 * @param {string} allValues.password - Password
 * @param {string} allValues.confirmPassword - Confirm password
 * @param {string} allValues.phoneNumber - Phone number
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateUserInput = (allValues) => {
  const errors = {};
  const fields = ['username', 'email', 'password', 'confirmPassword', 'phoneNumber', 'address'];

  fields.forEach((field) => {
    const error = validateField(field, allValues[field], allValues);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSettingUserInput = (allValues) => {
  const errors = {};
  const fields = ['username', 'email', 'phoneNumber', 'address'];

  fields.forEach((field) => {
    const error = validateField(field, allValues[field], allValues);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
//==============Valid các field khi chuẩn bị đặt hàng==============//
export function ValidateName(value){
  if (!value || value.trim() === '') {
    return 'Tên sản phẩm không được để trống';
  }
  if (value.length < 3) {
    return 'Tên sản phẩm phải có ít nhất 3 ký tự';
  }
  if (value.length > 100) {
    return 'Tên sản phẩm không được vượt quá 100 ký tự';
  }
  return '';
}

export function ValidateQuantity(value) {
  if (!value || value.trim() === '') {
    return 'Số lượng không được để trống';
  }
  if (value <= 0) {
    return 'Số lượng phải lớn hơn 0';
  }
  if (value > 1000000) {
    return 'Số lượng không được vượt quá 1000000';
  }
  return '';
}

export function ValidatePrice(value) {
  if (!value || value.trim() === '') {
    return 'Giá không được để trống';
  }
  if (value <= 0) {
    return 'Giá phải lớn hơn 0';
  }
  return '';
}

// valid ảnh ko được để trống(ảnh sẽ lưu vào db)
export function ValidateImage(value) {
  if (!value || value.trim() === '') {
    return 'Ảnh không được để trống';
  }
  return '';
}

export function ValidateCategory(value) {
  if (!value || value.trim() === '') {
    return 'Danh mục không được để trống';
  }
  if (value.length < 2) {
    return 'Danh mục phải có ít nhất 2 ký tự';
  }
  if (value.length > 30) {
    return 'Danh mục không được vượt quá 30 ký tự';
  }
  return '';
}

export function ValidateOrderInput(formData) {
  const errors = {};
  errors.name = ValidateName(formData.name);
  errors.quantity = ValidateQuantity(formData.quantity);
  errors.price = ValidatePrice(formData.price);
  errors.image = ValidateImage(formData.image);
  errors.category = ValidateCategory(formData.category);

  return errors
}

//-----------------------------------SHOP----------------------------
// name, address, phone, email, logo, banner, description, status

export function ValidateShopName(value) {
  if (!value || value.trim() === '') {
    return 'Tên shop không được để trống';
  }
  if (value.trim().length < 3) {
    return 'Tên shop phải có ít nhất 3 ký tự';
  }
  if (value.trim().length > 100) {
    return 'Tên shop không được vượt quá 100 ký tự';
  }
  return '';
}

export function ValidateShopAddress(value) {
  if (!value || value.trim() === '') {
    return 'Địa chỉ không được để trống';
  }
  if (value.trim().length < 5) {
    return 'Địa chỉ phải có ít nhất 5 ký tự';
  }
  if (value.trim().length > 200) {
    return 'Địa chỉ không được vượt quá 200 ký tự';
  }
  return '';
}

export function ValidateShopPhone(value) {
  if (!value || value.trim() === '') {
    return 'Số điện thoại không được để trống';
  }
  const phoneRegex = /^(0|\+84)[0-9]{9}$/;
  if (!phoneRegex.test(value.replace(/\s/g, ''))) {
    return 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số bắt đầu với 0 hoặc +84';
  }
  return '';
}

export function ValidateShopEmail(value) {
  if (!value || value.trim() === '') {
    return 'Email không được để trống';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return 'Email không hợp lệ';
  }
  return '';
}

export function ValidateShopLogo(value) {
  if (!value || value.trim() === '') {
    return 'Logo không được để trống';
  }
  return '';
}

export function ValidateShopBanner(value) {
  if (!value || value.trim() === '') {
    return 'Banner không được để trống';
  }
  return '';
}

export function ValidateShopDescription(value) {
  if (!value || value.trim() === '') {
    return 'Mô tả không được để trống';
  }
  if (value.trim().length < 10) {
    return 'Mô tả phải có ít nhất 10 ký tự';
  }
  if (value.trim().length > 500) {
    return 'Mô tả không được vượt quá 500 ký tự';
  }
  return '';
}

export function ValidateShopStatus(value) {
  const allowedStatuses = ['active', 'inactive', 'pending'];
  if (!value || value.trim() === '') {
    return 'Trạng thái không được để trống';
  }
  if (!allowedStatuses.includes(value.trim().toLowerCase())) {
    return 'Trạng thái không hợp lệ (active, inactive, pending)';
  }
  return '';
}

export function ValidateShopInput(formData) {
  const errors = {};
  errors.name        = ValidateShopName(formData.name);
  errors.address     = ValidateShopAddress(formData.address);
  errors.phone       = ValidateShopPhone(formData.phone);
  errors.email       = ValidateShopEmail(formData.email);
  errors.description = ValidateShopDescription(formData.description);
  errors.status      = ValidateShopStatus(formData.status);
  return errors;
}


//name, description, price, image(option), stock, category, shop(it auto fill, don't need)

export function ValidateItemName(value) {
  if (!value || value.trim() === '') {
    return 'Tên sản phẩm không được để trống';
  }
  if (value.trim().length < 3) {
    return 'Tên sản phẩm phải có ít nhất 3 ký tự';
  }
  if (value.trim().length > 100) {
    return 'Tên sản phẩm không được vượt quá 100 ký tự';
  }
  return '';
}

export function ValidateItemDescription(value) {
  if (!value || value.trim() === '') {
    return 'Mô tả sản phẩm không được để trống';
  }
  if (value.trim().length < 10) {
    return 'Mô tả sản phẩm phải có ít nhất 10 ký tự';
  }
  if (value.trim().length > 500) {
    return 'Mô tả sản phẩm không được vượt quá 500 ký tự';
  }
  return '';
}

export function ValidateItemPrice(value) {
  if (!value || String(value).trim() === '') {
    return 'Giá sản phẩm không được để trống';
  }
  if (value <= 0) {
    return 'Giá sản phẩm phải lớn hơn 0';
  }
  return '';
}

export function ValidateItemStock(value) {
  if (!value || String(value).trim() === '') {
    return 'Số lượng tồn kho không được để trống';
  }
  if (value <= 0) {
    return 'Số lượng tồn kho phải lớn hơn 0';
  }
  return '';
}

export function ValidateItemCategory(value, categoryList = []) {
  if (!value || String(value).trim() === '') {
    return 'Danh mục sản phẩm không được để trống';
  }
  if (categoryList && categoryList.length > 0) {
    const categoryIds = categoryList.map(category => String(category.id));
    if(!categoryIds.includes(String(value))) {
      return 'Danh mục sản phẩm không hợp lệ';
    }
  }
  return '';
}

export function ValidateItemInput(formData, categoryList = []) {
  const errors = {};
  errors.name        = ValidateItemName(formData.name);
  errors.description = ValidateItemDescription(formData.description);
  errors.price       = ValidateItemPrice(formData.price);
  errors.stock       = ValidateItemStock(formData.stock);
  errors.categoryId  = ValidateItemCategory(formData.categoryId, categoryList);
  errors.image       = ValidateImage(formData.image);
  return errors;
}