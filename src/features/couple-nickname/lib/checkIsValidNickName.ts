export const checkIsValidNickName = (name: string) => {
  const regex = /^[a-zA-Z0-9가-힣]{1,10}$/; // 한글, 영문, 숫자만 허용, 10자 이하
  return regex.test(name);
};
