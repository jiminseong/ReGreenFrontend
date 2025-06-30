import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import CustomProfile from "@/entities/user/ui/CustomProfile";
import SettingList from "@/features/mypage/ui/SettingList";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

const MyPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <CoupleGuard />
      <TopNavigationBar title="마이페이지" />
      <CustomProfile />
      <CoupleProfile />

      {/* 이 부분만 스크롤되도록 수정 */}
      <div className="flex-1 scrollable-area">
        <SettingList />
      </div>
    </div>
  );
};

export default MyPage;
