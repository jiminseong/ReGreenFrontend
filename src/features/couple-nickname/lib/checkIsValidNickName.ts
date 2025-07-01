export const checkIsValidNickName = (name: string) => {
  // "띄어쓰기, 특수문자 포함 10자 이내로 입력 가능"
  const regex = /^[가-힣a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{1,10}$/;
  return regex.test(name);
};
