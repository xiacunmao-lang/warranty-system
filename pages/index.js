import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Home() {
  const [deviceInfo, setDeviceInfo] = useState(null); // 存储查询到的设备信息
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 初始化扫描器
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        // --- 扫码成功后的处理逻辑 ---
        console.log(`Scan result: ${decodedText}`);
        setLoading(true);

        // 模拟查询过程（实际项目中这里会调用后端API）
        setTimeout(() => {
          setDeviceInfo({
            sn: decodedText, // 假设二维码内容就是SN码
            product: "智能变频空调 X1",
            status: "在保",
            expireDate: "2027-12-31",
            buyDate: "2024-12-31"
          });
          setLoading(false);
          // 扫码成功后可以暂停扫描，避免重复触发
          scanner.pause();
        }, 1000);
      },
      (errorMessage) => {
        // 扫码过程中的常规错误（通常是没对准），忽略即可
        // console.warn(errorMessage);
      }
    );

    // 组件卸载时清除扫描器
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  // 重新扫描的功能
  const handleReset = () => {
    setDeviceInfo(null);
    window.location.reload(); // 简单粗暴刷新页面重置扫描器
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* 顶部标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">产品保修查询系统</h1>
        <p className="text-gray-500">请对准设备机身二维码进行扫描</p>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        {!deviceInfo ? (
          // --- 未扫码时显示扫描框 ---
          <div id="reader" className="w-full rounded-lg overflow-hidden bg-black"></div>
        ) : (
          // --- 扫码成功后显示结果卡片 ---
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">查询成功</h2>
            <p className="text-sm text-gray-500 mb-6">设备信息如下</p>

            <div className="text-left bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">产品名称</span>
                <span className="font-medium text-gray-800">{deviceInfo.product}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">序列号 (SN)</span>
                <span className="font-mono text-gray-800">{deviceInfo.sn}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">购买日期</span>
                <span className="text-gray-800">{deviceInfo.buyDate}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">保修状态</span>
                <span className={`font-bold ${deviceInfo.status === '在保' ? 'text-green-600' : 'text-red-500'}`}>
                  {deviceInfo.status} (至 {deviceInfo.expireDate})
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              继续扫描下一个
            </button>
          </div>
        )}
      </div>

      {/* 底部版权 */}
      <footer className="mt-12 text-gray-400 text-sm">
        © 2024 售后服务部 | Vercel Deployed
      </footer>

      {/* 简单的 CSS 用于覆盖 html5-qrcode 的默认丑陋样式 */}
      <style jsx global>{`
        #reader {
          width: 100% !important;
          border: none !important;
        }
        #reader video {
          object-fit: cover;
          border-radius: 8px;
        }
        /* 隐藏那个丑陋的 "Request Camera Permissions" 按钮和文件上传链接 */
        #reader__dashboard_section_csr span,
        #reader__dashboard_section_swaplink {
          display: none !important;
        }
        #reader__dashboard_section {
            padding: 0 !important;
        }
        #reader__scan_region {
            background: white;
            min-height: 300px; /* 给扫描区域一个最小高度防止塌陷 */
        }
      `}</style>
    </div>
  );
}
