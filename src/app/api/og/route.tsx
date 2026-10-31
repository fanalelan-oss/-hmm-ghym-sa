import { ImageResponse } from 'next/og';
import db from '@/data/initial-db.json';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const portfolio = (db.portfolio || []).filter(
      (p) => p.src && !p.src.endsWith('.mp4')
    );

    // Dynamic rotation: changes every hour or cycle through the projects
    const total = portfolio.length || 1;
    const hour = Math.floor(Date.now() / (1000 * 60 * 60));
    const activeProject = portfolio[hour % total] || portfolio[0];

    const title = activeProject?.title?.ar || 'شركة همم غيم للدعاية والإعلان والمقاولات';
    const city = activeProject?.city?.ar || 'المملكة العربية السعودية';
    const category = activeProject?.category || 'دعاية وإعلان ومقاولات';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#071628',
            backgroundImage:
              'radial-gradient(circle at 85% 20%, rgba(32, 142, 193, 0.45) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(17, 52, 92, 0.8) 0%, transparent 60%)',
            padding: '60px 70px',
            fontFamily: 'sans-serif',
            color: '#FFFFFF',
            direction: 'rtl',
          }}
        >
          {/* Top Bar: Brand and Official Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#208EC1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(32, 142, 193, 0.5)',
                }}
              >
                غ
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                  }}
                >
                  شركة همم غيم
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    color: '#7dd3fc',
                    fontWeight: 700,
                  }}
                >
                  للدعاية والإعلان والمقاولات العامة · بالسعودية
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 22px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#38bdf8',
                fontSize: '15px',
                fontWeight: 800,
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#38bdf8',
                }}
              />
              <span>مشروع مميز وموثق</span>
            </div>
          </div>

          {/* Middle: Dynamic Rotating Project Highlight */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '920px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#facc15',
                fontSize: '17px',
                fontWeight: 800,
              }}
            >
              <span>✦ من أحدث أعمالنا المنفذة في {city}</span>
            </div>

            <h1
              style={{
                fontSize: '48px',
                fontWeight: 900,
                lineHeight: 1.3,
                margin: 0,
                color: '#FFFFFF',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: '#cbd5e1',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              تصنيع وتركيب الحروف البارزة، واجهات الكلادينج المقاوم للحريق، الديكور والتشطيبات، والمقاولات العامة بأعلى المعايير وضمان رسمي 10 سنوات.
            </p>
          </div>

          {/* Bottom Bar: Stats & Live Phone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '30px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8' }}>
                  +100
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>
                  مشروع منفذ ومعتمد
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8' }}>
                  8
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>
                  تخصصات متكاملة
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8' }}>
                  10 سنوات
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>
                  ضمان الجودة الشامل
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 26px',
                borderRadius: '20px',
                backgroundColor: 'rgba(32, 142, 193, 0.25)',
                border: '1.5px solid rgba(56, 189, 248, 0.5)',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 800,
                direction: 'ltr',
              }}
            >
              <span>+966 56 546 7928</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
