import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import SettingList from "@/features/mypage/ui/SettingList";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CoupleGuard />
      <TopNavigationBar title="마이페이지" />
      <CoupleProfile className="mt-4" />
      <SettingList />
    </div>
  );
};

export default MyPage;
