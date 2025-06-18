import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import CustomProfile from "@/entities/user/ui/CustomProfile";
import SettingList from "@/features/mypage/ui/SettingList";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

const MyPage = () => {
  return (
    <div className="flex flex-col h-[100dvh]">
      <CoupleGuard />
      <TopNavigationBar title="마이페이지" />
      <CustomProfile />
      <CoupleProfile />
      <SettingList />
    </div>
  );
};

export default MyPage;
