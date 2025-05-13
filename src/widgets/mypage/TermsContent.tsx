import React from "react";

const TermsContent = () => {
  return (
    <div className="h-full p-4 text-sm leading-relaxed text-gray-800 overflow-y-scroll no-scrollbar">
      <p className="mb-4">
        본 약관은 &quot;우리는 이별을 미루기로 했다&quot;(이하 &quot;회사&quot;)가 제공하는 모바일
        애플리케이션 &quot;우이미&quot;(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자
        간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      </p>
      <h2 className="text-base font-semibold mt-6 mb-2">제1조 (목적)</h2>
      <p className="mb-4">
        이 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
        책임사항을 규정함을 목적으로 합니다.
      </p>
      <h2 className="text-base font-semibold mt-6 mb-2">제2조 (정의)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          서비스: 회사가 운영하는 모바일 애플리케이션으로, 커플 간의 친환경 실천 활동을 지원하고
          기록하는 기능을 제공합니다.
        </li>
        <li>이용자: 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
        <li>
          콘텐츠: 이용자가 서비스 내에서 작성하거나 업로드하는 텍스트, 사진, 영상 등 모든 자료를
          의미합니다.
        </li>
        <li>하트 및 리워드: 서비스 내 친환경 실천에 따라 지급되는 가상의 보상 수단입니다.</li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제3조 (약관의 효력 및 변경)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>본 약관은 서비스를 설치하거나 이용함으로써 효력을 발생합니다.</li>
        <li>
          회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 앱 또는
          웹사이트를 통해 사전 공지합니다.
        </li>
        <li>
          이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
        </li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제4조 (서비스의 이용)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          회사는 이용자에게 커플 활동 기록, 미션 인증, 포인트 적립, 아지트 꾸미기 등 다양한 기능을
          제공합니다.
        </li>
        <li>일부 서비스는 회원가입 또는 인증 절차를 거쳐야 이용이 가능합니다.</li>
        <li>
          서비스는 연중무휴, 1일 24시간 제공됨을 원칙으로 하나, 회사의 사정에 따라 일시적으로 중단될
          수 있습니다.
        </li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제5조 (이용자의 의무)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          이용자는 다음 행위를 하여서는 안 됩니다:
          <ul className="list-disc pl-5">
            <li>타인의 개인정보를 도용하거나 허위 정보를 입력하는 행위</li>
            <li>서비스 내 게시물에 대한 비방, 음란, 불법 행위</li>
            <li>회사의 운영을 방해하거나 시스템에 무단 접근하는 행위</li>
          </ul>
        </li>
        <li>이용자는 관계 법령, 본 약관, 이용안내 등 회사가 제공하는 안내를 준수해야 합니다.</li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제6조 (개인정보 보호)</h2>
      <p className="mb-4">
        회사는 관련 법령에 따라 이용자의 개인정보를 보호하며, 개인정보 처리방침에 따라 수집, 이용,
        보관, 파기합니다.
      </p>
      <h2 className="text-base font-semibold mt-6 mb-2">제7조 (지적 재산권)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>서비스 내 회사가 작성한 자료에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.</li>
        <li>
          이용자가 작성한 콘텐츠의 저작권은 해당 이용자에게 있으나, 회사는 서비스 운영을 위한 범위
          내에서 이를 사용할 수 있습니다.
        </li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제8조 (책임의 제한)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          회사는 천재지변, 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
        </li>
        <li>회사는 이용자가 귀책사유로 인해 발생한 문제에 대해서는 책임을 지지 않습니다.</li>
        <li>서비스 내 타 이용자가 작성한 정보의 정확성이나 신뢰성에 대해서는 보증하지 않습니다.</li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제9조 (서비스 해지 및 이용제한)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>이용자는 언제든지 서비스 내 탈퇴 기능을 통해 이용계약을 해지할 수 있습니다.</li>
        <li>
          회사는 이용자 귀책사유로 인해 별도 통보 없이 이용자의 서비스 이용을 제한하거나 계약을
          해지할 수 있습니다.
        </li>
      </ul>
      <h2 className="text-base font-semibold mt-6 mb-2">제10조 (분쟁 해결)</h2>
      <p className="mb-4">
        본 약관은 대한민국 법령에 따르며, 회사와 이용자 간 발생한 분쟁은 민사소송법상 관할 법원에
        제출합니다.
      </p>
      <p className="text-xs text-gray-500 mt-6">본 약관은 2025년 5월 16일부터 적용됩니다.</p>
    </div>
  );
};

export default TermsContent;
