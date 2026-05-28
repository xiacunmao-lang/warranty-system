import { useState, useEffect } from 'react';

export default function Home() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端执行（解决 SSR html5-qrcode 报错）
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    let scanner = null;

    import('html5-qrcode').then((mod) => {
      scanner = new mod.Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(
        (decodedText) => {
          setLoading(true);
          setTimeout(() => {
            setDeviceInfo({
              sn: decodedText,
              product: "智能变频空调 X1",
              status: "在保",
              expireDate: "2027-12-31",
              buyDate: "2024-12-31"
            });
            setLoading(false);
            scanner.pause();
          }, 800);
        },
        () => {}
      );
    });

    return () => { if (scanner) scanner.clear().catch(()=>{}); };
  }, [mounted]);

  const handleReset = () => { setDeviceInfo(null); window.location.reload(); };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">产品保修查询系统</h1>
        <p className="text-gray-500">请对准设备机身二维码进行扫描</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        {!deviceInfo ? (
          <div id="reader" className="w-full rounded-lg overflow-hidden bg-black min-h-[300px] flex items-center justify-center">
            <p className="text-white/60 text-sm">正在启动摄像头...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">设备信息查询成功</h2>
            <div className="text-left space-y-3 bg-gray-50 p-4 rounded-lg text-sm">
              <p><span className="text-gray-500">SN码：</span><span className="font-mono font-medium">{deviceInfo.sn}</span></p>
              <p><span className="text-gray-500">产品型号：</span><span className="font-medium">{deviceInfo.product}</span></p>
              <p><span className="text-gray-500">保修状态：</span><span className="font-bold text-green-600">{deviceInfo.status}</span></p>
              <p><span className="text-gray-500">购买日期：</span><span>{deviceInfo.buyDate}</span></p>
              <p><span className="text-gray-500">保修到期：</span><span>{deviceInfo.expireDate}</span></p>
            </div>
            <button onClick={handleReset} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">重新扫描</button>
          </div>
        )}
      </div>
    </div>
  );
}
