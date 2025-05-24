// // 리스트 설명중인지를 관리하는 store입니다. localStorage에 저장되어 앱을 새로고침해도 상태가 유지됩니다.
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface CertificationStore {
//   isAcitivityDescription: boolean;
// }

// export const useCertificationStore = create<CertificationStore>()(
//   persist(
//     (set) => ({
//       isAcitivityDescription: false,
//     }),
//     {
//       name: "certification-store", // localStorage에 저장될 key
//       getStorage: () => localStorage, // localStorage를 사용
//     }
//   )
// );
