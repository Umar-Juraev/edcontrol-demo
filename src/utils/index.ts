// parse phone number format to string data format
export const parsePhoneNumber = (phone: string) => {
  return `+${phone.replace(/\D/g, "")}`;
};

export const separatePhoneNumber = (phone: string | number) => {
  const slicedPhone = phone.toString().slice(4);

  const ozg = slicedPhone.split("");
  const res = `${ozg[0]}${ozg[1]} ${ozg[2]}${ozg[3]}${ozg[4]}-${ozg[5]}${ozg[6]}-${ozg[7]}${ozg[8]}`;

  return res;
};

export const separateNumberThousands = (num?: any) => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0;
};

export const checkValueEmpty = (value: any) => {
  return value ? value : `--------`;
};

export const checkObjectValueExist = (object: any) => {
  Object.keys(object).forEach((key) => {
    if (!object[key]) {
      delete object[key];
    }
  });
};
