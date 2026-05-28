import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Home() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render(async (text) => {
      // 这里模拟解析二维码内容
      // 假设二维码内容是: SN_CATEGORY_STATUS_DATE
      setDeviceInfo({
        sn: text.split('_')[0],
        category: '智能家电', // 示例分类
        status: '保修期内',   // 示例状态
        warrantyEnd: '2027-05-28'
      });
      scanner.clear();
    });

    return () => scanner.clear();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h1>产品保修查询系统</h1>

      {!deviceInfo ? (
        <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}></div>
      ) : (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <p><b>设备序列号:</b> {deviceInfo.sn}</p>
          <p><b>设备类别:</b> {deviceInfo.category}</p>
          <p style={{ color: 'green' }}><b>状态:</b> {deviceInfo.status}</p>
          <p><b>保修截止:</b> {deviceInfo.warrantyEnd}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '10px' }}>查询下一个</button>
        </div>
      )}
    </div>
  );
}
