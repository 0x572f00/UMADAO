import { useTranslation, Trans } from 'react-i18next';
import Fade from 'react-reveal/Fade';

const lngs = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' },
  fr: { nativeName: 'Français' }
};

const FAQ = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <section id="faq" className="faq">
        <div className="content">
          <Fade top>
            <h2>
              <span className='u'>F</span>requently <span className='u'>a</span>sked <span className='u'>q</span>uestions
            </h2>
          </Fade>
          <Fade bottom delay="500">
            <div className="selectLang">
              {Object.keys(lngs).map((lng) => (
                <button key={lng} style={{ color: i18n.resolvedLanguage === lng ? '#000' : '#707070' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                  {lngs[lng].nativeName}
                </button>
              ))}
            </div>
          </Fade>
            <div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p3') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p4') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h5') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p6') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p7') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h8') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p9') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p10') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p11') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h12') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p13') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p14') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p15') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h16') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p17') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p18') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p19') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h20') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p21') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p22') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p23') }} />

              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h24') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p25') }} />
              </div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: t('faq.h26') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p27') }} />
                <p dangerouslySetInnerHTML={{ __html: t('faq.p28') }} />
              </div>
            </div>
            <h1 className="forever">
              UMA. Forever. For all.
            </h1>
        </div>

      </section>
    </>
  );
};

export default FAQ;