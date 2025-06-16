export const checkIsValidNickName = (name: string) => {
  // "이름은 한글, 영어, 숫자, 공백만 포함할 수 있으며, 1~10자 이내로 입력해주세요."
  const regex = /^[가-힣a-zA-Z0-9\s]{1,10}$/;
  return regex.test(name);
};
