{\rtf1\ansi\ansicpg936\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset134 PingFangSC-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import \{ useState, useEffect \} from 'react';\
import \{ Html5QrcodeScanner \} from 'html5-qrcode';\
\
export default function Home() \{\
  const [deviceInfo, setDeviceInfo] = useState(null);\
\
  useEffect(() => \{\
    const scanner = new Html5QrcodeScanner("reader", \{ fps: 10, qrbox: 250 \});\
    scanner.render(async (text) => \{\
      // \'c4\'a3\'c4\'e2\'ba\'f3\'b6\'cb\'d1\'e9\'c7\'a9\'b7\'b5\'bb\'d8\'bd\'e1\'b9\'fb\
      setDeviceInfo(\{ \
        sn: text.split('_'), \
        category: '\'ca\'d6\'bb\'fa\'c6\'c1\'c4\'bb', \
        status: '\'b1\'a3\'d0\'de\'d6\'d0', \
        warrantyEnd: '2027-05-28' \
      \});\
      scanner.clear(); // \'c9\'a8\'c2\'eb\'b3\'c9\'b9\'a6\'ba\'f3\'cd\'a3\'d6\'b9\'cf\'e0\'bb\'fa\
    \});\
    return () => scanner.clear();\
  \}, []);<websource>source_group_web_1</websource>\
\
  return (\
    <div style=\{\{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' \}\}>\
      <h1>\'ba\'a3\'cd\'e2\'c5\'e4\'bc\'fe\'b1\'a3\'d0\'de\'d1\'e9\'d6\'a4</h1>\
      \{!deviceInfo ? (\
        <div id="reader" style=\{\{ width: '100%', maxWidth: '400px', margin: 'auto' \}\}></div>\
      ) : (\
        <div style=\{\{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' \}\}>\
          <p><b>\'d0\'f2\'c1\'d0\'ba\'c5\'a3\'ba</b>\{deviceInfo.sn\}</p>\
          <p><b>\'d6\'d6\'c0\'e0\'a3\'ba</b>\{deviceInfo.category\}</p>\
          <p style=\{\{ color: 'green' \}\}><b>\'d7\'b4\'cc\'ac\'a3\'ba</b>\{deviceInfo.status\}</p>\
          <p><b>\'b1\'a3\'d0\'de\'d6\'c1\'a3\'ba</b>\{deviceInfo.warrantyEnd\}</p>\
          <button onClick=\{() => window.location.reload()\} style=\{\{ padding: '10px 20px', marginTop: '10px' \}\}>\'bc\'cc\'d0\'f8\'c9\'a8\'c2\'eb</button>\
        </div>\
      )\}\
    </div>\
  );\
\}}
