# 빌드 검증
echo "[프로젝트 빌드를 확인합니다]"
npm run build

# 보안 취약점 검사
echo "[의존성 보안 점검 중...]"
npm audit

echo "[pushing]"
