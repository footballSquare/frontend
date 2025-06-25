const getDeviceUUID = (): string => {
  // 브라우저의 localStorage에서 deviceUUID를 가져옵니다.
  const deviceUUID = localStorage.getItem("deviceUUID");
  if (deviceUUID) {
    return deviceUUID;
  }
  // 만약 localStorage에 deviceUUID가 없다면, 새로 생성합니다.
  const newDeviceUUID = crypto.randomUUID();
  // 생성한 deviceUUID를 localStorage에 저장합니다.
  localStorage.setItem("deviceUUID", newDeviceUUID);
  return newDeviceUUID;
};

export default getDeviceUUID;
