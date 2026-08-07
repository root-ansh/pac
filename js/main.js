const navButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const navigationBar = document.querySelector('.nav-wrap');
const identityRow = document.querySelector('.identity-row');
const insidePages = location.pathname.includes('/pages/');
const assetRoot = insidePages ? '../' : '';
const enhancementStyles = document.createElement('link');
enhancementStyles.rel = 'stylesheet';
enhancementStyles.href = `${assetRoot}css/enhancements.css`;
document.head.append(enhancementStyles);

if (identityRow && navigationBar) {
  const headerBrand = identityRow.querySelector('.brand');
  if (headerBrand) navigationBar.prepend(headerBrand);
  identityRow.remove();
}

document.querySelectorAll('.search').forEach((search) => search.remove());
document.querySelectorAll('.nav-enquiry').forEach((enquiry) => enquiry.remove());
const initiativeTitle = document.querySelector('.top-strip .container > span');
if (initiativeTitle) initiativeTitle.textContent = 'A Self Help Group Initiative';

if (navigation) {
  const root = insidePages ? '../' : '';
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const aboutActive = ['pac-cooperative.html', 'prout-philosophy.html', 'our-members.html'].includes(currentPage);
  navigation.innerHTML = `
    <div class="nav-dropdown${aboutActive ? ' active' : ''}">
      <button class="dropdown-toggle" type="button" aria-expanded="false">About <span class="menu-chevron" aria-hidden="true"></span></button>
      <div class="dropdown-menu">
        <a class="${currentPage === 'pac-cooperative.html' ? 'active' : ''}" href="${root}pages/pac-cooperative.html">PAC Cooperative</a>
        <a class="${currentPage === 'prout-philosophy.html' ? 'active' : ''}" href="${root}pages/prout-philosophy.html">PROUT Philosophy</a>
        <a class="${currentPage === 'our-members.html' ? 'active' : ''}" href="${root}pages/our-members.html">Our Members</a>
      </div>
    </div>
    <a href="${root}index.html#sampark">Contact Us</a>`;
}

if (navButton && navigation) {
  navButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    navButton.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      const dropdown = navigation.querySelector('.nav-dropdown');
      const dropdownToggle = navigation.querySelector('.dropdown-toggle');
      dropdown?.classList.remove('open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    navButton.setAttribute('aria-expanded', 'false');
    navigation.querySelector('.nav-dropdown')?.classList.remove('open');
    navigation.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
  }));
  const dropdownToggle = navigation.querySelector('.dropdown-toggle');
  if (dropdownToggle) dropdownToggle.addEventListener('click', () => {
    const dropdown = dropdownToggle.closest('.nav-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    navigation.querySelector('.nav-dropdown')?.classList.remove('open');
    navigation.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    if (matchMedia('(max-width: 900px)').matches) {
      navigation.classList.remove('open');
      navButton.setAttribute('aria-expanded', 'false');
      navButton.focus();
    }
  });
}

const pageHeroImages = {
  'pac-cooperative.html': '../media/pages/pac-cooperative-hero.png',
  'prout-philosophy.html': '../media/pages/prout-philosophy-hero.png',
  'our-members.html': '../media/pages/our-members-hero.png'
};
const currentFile = location.pathname.split('/').pop() || 'index.html';
const pageBanner = document.querySelector('.page-banner');
if (pageBanner && pageHeroImages[currentFile]) {
  pageBanner.classList.add('generated-hero');
  pageBanner.style.backgroundImage = `url('${pageHeroImages[currentFile]}')`;
}

const productCarousel = document.querySelector('.product-carousel');
if (productCarousel) {
  const track = productCarousel.querySelector('.carousel-track');
  const dots = productCarousel.querySelector('.carousel-dots');
  const count = productCarousel.querySelector('.carousel-count');
  fetch('data/carousel.json')
    .then((response) => { if (!response.ok) throw new Error('Carousel data could not be loaded.'); return response.json(); })
    .then(({ products, autoplayMs = 6500 }) => {
      products.forEach((product, index) => {
        const enquiry = encodeURIComponent(`Hello PROUT Agro Commodity, I would like to enquire about ${product.title}. Please share availability and ordering details.`);
        const slide = document.createElement('article');
        slide.className = `product-slide${index === 0 ? ' active' : ''}`;
        slide.setAttribute('aria-hidden', String(index !== 0));
        slide.innerHTML = `<img class="slide-background" src="${product.backgroundImage}" alt="" loading="${index === 0 ? 'eager' : 'lazy'}"><div class="slide-overlay"></div><div class="container slide-layout"><div class="slide-copy"><p class="slide-eyebrow">Farm fresh • PAC branded</p><h1>${product.title}</h1><p>${product.subtitle}</p><span class="availability-label">Available quantities</span><div class="quantity-list">${product.quantities.map(({weight,price})=>`<span>${weight}<b>${price}</b></span>`).join('')}</div><a class="whatsapp-button" href="https://api.whatsapp.com/send?text=${enquiry}" target="_blank" rel="noopener"><img src="media/whatsapp.svg" alt="" aria-hidden="true">Enquire on WhatsApp</a></div><img class="slide-product" src="${product.foregroundImage}" alt="PAC branded ${product.title} packaging" loading="${index === 0 ? 'eager' : 'lazy'}"></div>`;
        track.append(slide);
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = index === 0 ? 'active' : '';
        dot.setAttribute('aria-label', `Show ${product.title}`);
        dots.append(dot);
      });
      const slides = [...track.querySelectorAll('.product-slide')];
      const dotButtons = [...dots.querySelectorAll('button')];
      const pauseButton = productCarousel.querySelector('.carousel-pause');
      const pauseIcon = pauseButton.querySelector('[aria-hidden="true"]');
      const pauseLabel = pauseButton.querySelector('.carousel-pause-label');
      let activeSlide = 0;
      let carouselTimer;
      let userPaused = false;
      const stopCarousel = () => { clearInterval(carouselTimer); carouselTimer = undefined; };
      const showSlide = (next) => {
        activeSlide = (next + slides.length) % slides.length;
        slides.forEach((slide,index)=>{const active=index===activeSlide;slide.classList.toggle('active',active);slide.setAttribute('aria-hidden',String(!active));});
        dotButtons.forEach((dot,index)=>dot.classList.toggle('active',index===activeSlide));
        count.textContent = `${String(activeSlide + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
      };
      const startCarousel = () => {
        stopCarousel();
        if (!userPaused && !matchMedia('(prefers-reduced-motion: reduce)').matches) carouselTimer = setInterval(()=>showSlide(activeSlide + 1), autoplayMs);
      };
      const updatePauseButton = () => {
        const useHindi = document.documentElement.lang === 'hi';
        const label = userPaused ? (useHindi ? 'कैरोसेल चलाएँ' : 'Play carousel') : (useHindi ? 'कैरोसेल रोकें' : 'Pause carousel');
        pauseButton.setAttribute('aria-label', label);
        pauseButton.setAttribute('aria-pressed', String(userPaused));
        pauseIcon.textContent = userPaused ? '▶' : 'Ⅱ';
        pauseLabel.textContent = label;
      };
      const manuallyShow = (next) => { showSlide(next); startCarousel(); };
      productCarousel.querySelector('.carousel-prev').addEventListener('click',()=>manuallyShow(activeSlide-1));
      productCarousel.querySelector('.carousel-next').addEventListener('click',()=>manuallyShow(activeSlide+1));
      dotButtons.forEach((dot,index)=>dot.addEventListener('click',()=>manuallyShow(index)));
      pauseButton.addEventListener('click', () => {
        userPaused = !userPaused;
        userPaused ? stopCarousel() : startCarousel();
        updatePauseButton();
      });
      document.addEventListener('proutlanguagechange', updatePauseButton);
      productCarousel.addEventListener('mouseenter', stopCarousel);
      productCarousel.addEventListener('mouseleave', startCarousel);
      productCarousel.addEventListener('focusin', stopCarousel);
      productCarousel.addEventListener('focusout',(event)=>{if(!productCarousel.contains(event.relatedTarget))startCarousel();});
      productCarousel.addEventListener('keydown',(event)=>{if(event.key==='ArrowLeft')manuallyShow(activeSlide-1);if(event.key==='ArrowRight')manuallyShow(activeSlide+1);});
      showSlide(0);
      updatePauseButton();
      startCarousel();
      setLanguage(sessionStorage.getItem('prout-language') || 'en');
    })
    .catch((error) => { console.error(error); productCarousel.classList.add('data-error'); });
}

const productsGrid = document.querySelector('.all-products-grid');
if (productsGrid) {
  fetch('data/products.json')
    .then((response) => { if (!response.ok) throw new Error('Product data could not be loaded.'); return response.json(); })
    .then(({ products }) => {
      products.forEach((product) => {
        const enquiry = encodeURIComponent(`Hello PROUT Agro Commodity, I would like to enquire about ${product.name}. Please share availability and ordering details.`);
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `<div class="product-card-image"><img src="${product.image}" alt="PAC branded ${product.name} packaging" loading="lazy"></div><div class="product-card-body"><h3>${product.name}</h3><span class="product-options-label">Available options</span><div class="product-card-quantities">${product.quantities.map(({weight,price})=>`<span><b>${weight}</b><small>${price}</small></span>`).join('')}</div><a class="product-enquire" href="https://api.whatsapp.com/send?text=${enquiry}" target="_blank" rel="noopener"><span class="enquire-icon" aria-hidden="true"><img class="enquire-icon-default" src="media/whatsapp.svg" alt=""><img class="enquire-icon-hover" src="media/whatsapp_black.svg" alt=""></span>Enquire about product</a></div>`;
        productsGrid.append(card);
      });
      setLanguage(sessionStorage.getItem('prout-language') || 'en');
    })
    .catch((error) => { console.error(error); productsGrid.innerHTML = '<p>Products could not be loaded.</p>'; });
}

document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

const sizeMap = { minus: '15px', reset: '16px', plus: '18px' };
document.querySelectorAll('[data-size]').forEach((button) => button.addEventListener('click', () => {
  document.documentElement.style.fontSize = sizeMap[button.dataset.size];
}));

document.querySelectorAll('.search').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.querySelector('input').focus();
}));

const english = {
  'कैरोसेल रोकें':'Pause carousel','कैरोसेल चलाएँ':'Play carousel',
  'एक स्वयं सहायता समूह पहल':'A Self Help Group Initiative','सभी उत्पाद':'All Products','हमारी पूरी उत्पाद श्रृंखला देखें':'Explore our complete product range','खेत में उगाई आवश्यक वस्तुएँ':'Farm-grown essentials','उपलब्ध विकल्प':'Available options','उत्पाद के बारे में पूछताछ करें':'Enquire about product','उत्पाद लोड नहीं किए जा सके।':'Products could not be loaded.',
  'संपर्क करें':'Contact Us','खेत से ताज़ा • पीएसी ब्रांडेड':'Farm fresh • PAC branded','उपलब्ध मात्राएँ':'Available quantities','व्हाट्सऐप पर पूछताछ करें':'Enquire on WhatsApp',
  'सरसों तेल':'Mustard Oil','मुरादनगर मास्टर यूनिट से प्राप्त ताज़ा उत्पादित तेल।':'Freshly produced oil sourced from Muradnagar Master Unit.',
  'गेहूँ':'Wheat','मुरादनगर मास्टर यूनिट से प्राप्त ताज़ा आटा, हमारी आंतरिक पैकेजिंग मशीन से पैक किया गया।':'Freshly produced atta sourced from Muradnagar Master Unit and packed using our in-house packaging machine.',
  'काला गेहूँ':'Black Wheat','मुरादनगर मास्टर यूनिट से प्राप्त ताज़ा काले गेहूँ का आटा, हमारी आंतरिक पैकेजिंग मशीन से पैक किया गया।':'Freshly produced black wheat atta sourced from Muradnagar Master Unit and packed using our in-house packaging machine.',
  'हल्दी पाउडर':'Turmeric Powder','प्राकृतिक रूप से चमकीली हल्दी, जिसका रंग और मिट्टी जैसी सुगंध बनाए रखने के लिए सावधानी से सफाई, पिसाई और पैकिंग की गई है।':'Naturally vibrant turmeric, carefully cleaned, ground and packed to preserve its colour and earthy aroma.',
  'हींग':'Heeng','सुगंधित हींग, रोज़मर्रा के भोजन में गहराई और स्वाद लाने के लिए सुविधाजनक छोटे पैकेट में।':'Aromatic asafoetida packed in a convenient small pouch to bring depth and character to everyday cooking.',
  'सफेद नमक':'White Salt','घर और व्यावसायिक रसोई में भरोसेमंद रोज़मर्रा के उपयोग के लिए साफ़, महीन सफेद नमक।':'Clean, fine white salt packed for dependable everyday use in home and commercial kitchens.',
  'धनिया पाउडर':'Dhaniya Powder','प्राकृतिक गर्म सुगंध वाला ताज़ा धनिया पाउडर, बेहतर स्वाद के लिए छोटी खेप में तैयार।':'Fresh coriander powder with a naturally warm aroma, prepared in small batches for better flavour.',
  'गुड़':'Gur','गन्ने के भरपूर स्वाद वाला पारंपरिक सुनहरा गुड़, रोज़मर्रा के उपयोग के लिए सुविधाजनक पैकिंग में।':'Traditional golden jaggery with a rich sugarcane flavour, conveniently packed for everyday use.',
  'सूक्ष्म, लघु एवं मध्यम उद्यम पहल':'Micro, Small & Medium Enterprise Initiative','भाषा चयन':'Language selection','परिचय / पीएसी सहकारिता':'About / PAC Cooperative','परिचय / प्राउट दर्शन':'About / PROUT Philosophy','परिचय / हमारे सदस्य':'About / Our Members',
  'पीएसी सहकारिता':'PAC Cooperative','प्राउट दर्शन':'PROUT Philosophy','हमारे सदस्य':'Our Members','परिचय':'About',
  'पीएसी सहकारिता क्या है':'What is the PAC Cooperative','साझे स्वामित्व से साझा समृद्धि':'Shared ownership, shared prosperity','पीएसी सहकारिता किसानों और उत्पादकों को संसाधन, जिम्मेदारी और उपलब्धियाँ साझा करने के लिए एक मंच प्रदान करती है।':'The PAC Cooperative gives farmers and producers a platform to share resources, responsibility and achievement.','सहकारिता का उद्देश्य':'Purpose of the Cooperative','उत्पादक को निर्णय और मूल्य-श्रृंखला के केंद्र में रखना।':'To keep the producer at the centre of decisions and the value chain.','साझे संसाधन':'Shared Resources','ज्ञान, साधन और अवसरों का जिम्मेदार उपयोग।':'Responsible use of knowledge, tools and opportunity.','निष्पक्ष भागीदारी':'Fair Participation','हर सदस्य की आवाज़ और योगदान का सम्मान।':'Respect for every member’s voice and contribution.','स्थानीय प्रगति':'Local Progress','आर्थिक लाभ को समुदाय के भीतर मजबूत बनाना।':'Strengthening economic value within the community.',
  'प्राउट दर्शन क्या है':'What is PROUT Philosophy','प्रगति, उपयोग और संतुलन का मानवीय दृष्टिकोण':'A human-centred approach to progress, utilisation and balance','प्राउट एक सामाजिक-आर्थिक दर्शन है जो उपलब्ध संसाधनों के विवेकपूर्ण उपयोग, स्थानीय आत्मनिर्भरता और सभी के कल्याण पर बल देता है।':'PROUT is a socio-economic philosophy that emphasises the rational use of available resources, local self-reliance and welfare for all.','प्रगतिशील उपयोग':'Progressive Utilisation','भौतिक, मानवीय और प्राकृतिक संसाधनों का अधिकतम तथा संतुलित उपयोग।':'Maximum and balanced use of material, human and natural resources.','आर्थिक लोकतंत्र':'Economic Democracy','स्थानीय लोगों की स्थानीय अर्थव्यवस्था में सक्रिय भागीदारी।':'Active participation of local people in their local economy.','संतुलित विकास':'Balanced Development','व्यक्ति, समाज और प्रकृति की आवश्यकताओं के बीच सामंजस्य।':'Harmony between the needs of individuals, society and nature.',
  'हमारे लोग, हमारी शक्ति':'Our people, our strength','PROUT Agro Commodity की दिशा और गुणवत्ता उसके सदस्यों के साझा अनुभव, श्रम और प्रतिबद्धता से बनती है।':'PROUT Agro Commodity is shaped by the shared experience, work and commitment of its members.','उत्पादक सदस्य':'Producer Members','खेती, फसल प्रबंधन और प्राथमिक तैयारी से जुड़े सदस्य।':'Members involved in cultivation, crop management and primary preparation.','प्रसंस्करण सदस्य':'Processing Members','सफाई, छँटाई, पेराई और गुणवत्ता देखरेख में योगदान देने वाले सदस्य।':'Members contributing to cleaning, sorting, pressing and quality oversight.','समुदाय सहयोगी':'Community Partners','आपूर्ति, स्थानीय संपर्क और सहकारी विकास को समर्थन देने वाले सहयोगी।':'Partners supporting supply, local connections and cooperative development.','सदस्य विवरण शीघ्र जोड़े जाएँगे।':'Member profiles will be added soon.',
  'PROUT Agro Commodity एक किसान-स्वामित्व वाली सहकारी पहल है। हम संसाधन, ज्ञान और अवसर साझा करके अच्छी उपज उगाते हैं और हर परिवार तक ईमानदार खाद्य सामग्री पहुँचाते हैं।':'PROUT Agro Commodity is a farmer-owned initiative. We share resources, knowledge and opportunity to grow quality produce and bring honest food to every family.',
  'PROUT Agro Commodity किसान परिवारों की साझा पहल है। इसकी शुरुआत इस विश्वास से हुई कि छोटे किसान अपने संसाधन, अनुभव और अवसर साझा करके एक मजबूत तथा आत्मनिर्भर व्यवस्था बना सकते हैं।':'PROUT Agro Commodity is a shared initiative of farming families. It began with the belief that small farmers can build a stronger, self-reliant system by sharing resources, experience and opportunity.',
  'सामग्री का स्वामित्व एवं प्रबंधन: PROUT Agro Commodity':'Content owned and managed by PROUT Agro Commodity',
  'अ−':'A−','अ':'A','अ+':'A+','१००%':'100%','०':'0','१':'1','२':'2','३':'3','४':'4','एक साझा किसान परिवार':'One cooperative farming family','यहाँ खोजें…':'Search here…','अक्षर छोटे करें':'Decrease text size','अक्षर सामान्य करें':'Reset text size','अक्षर बड़े करें':'Increase text size','प्राउट एग्रो मुखपृष्ठ':'Prout Agro home page','मुख्य मेन्यू':'Primary navigation','महत्वपूर्ण सूचना':'Important notice','गेहूँ और सरसों के खेत में अपनी उपज के साथ खड़े सहकारी किसान':'Cooperative farmers standing with their produce in wheat and mustard fields',
  'मुख्य सामग्री पर जाएँ':'Skip to main content','सूक्ष्म, लघु एवं मध्यम उद्यम सहकारी पहल':'Micro, Small & Medium Enterprise Cooperative Initiative','सामग्री पर जाएँ':'Skip to content','प्राउट एग्रो':'Prout Agro','किसान सहकारी समिति':"Farmers' Cooperative",'खोजें':'Search','खेती से':'From farming','समृद्धि तक':'to prosperity','स्थानीय • शुद्ध • साझा':'Local • Pure • Shared','मेन्यू खोलें':'Open menu','मुखपृष्ठ':'Home','हमारी उपज':'Our Produce','सहकारिता परिचय':'About the Cooperative','खेत से घर तक':'Farm to Home','संपर्क':'Contact','उत्पाद पूछताछ':'Product Enquiry',
  'हमारे खेत • हमारी मेहनत • आपका विश्वास':'Our Farms • Our Labour • Your Trust','धरती की शुद्धता,':'Purity of the earth,','हर घर तक':'delivered to every home','किसानों द्वारा उगाया, सहकारिता द्वारा सँवारा—शुद्ध तेल, पौष्टिक गेहूँ और सुगंधित मसाले सीधे हमारे खेतों से।':'Grown by farmers and prepared by the cooperative—pure oils, nutritious wheat and aromatic spices straight from our fields.','हमारी उपज देखें':'Explore Our Produce','हमारी कहानी जानें':'Discover Our Story','सूचना पट्ट':'Notice Board','थोक एवं खुदरा आपूर्ति के लिए पूछताछ स्वीकार की जा रही है  •  नई फसल का गेहूँ और सरसों तेल शीघ्र उपलब्ध होगा  •  सभी उत्पाद सहकारी किसानों के अपने खेतों से':'Enquiries are open for wholesale and retail supply  •  New-season wheat and mustard oil will be available soon  •  Every product comes from our cooperative farmers’ own fields',
  'उत्पाद सूची':'Product Catalogue','हमारी पूरी उपज देखें':'View our complete range','गुणवत्ता प्रक्रिया':'Quality Process','खेत से पैकिंग तक':'From field to packing','किसान परिवार':'Farmer Families','हमारे सदस्यों से मिलें':'Meet our members','सीधी पूछताछ':'Direct Enquiry','हमसे संपर्क करें':'Contact our team','हमारे खेतों की उपज':'Produce From Our Fields','रसोई की रोज़मर्रा की शुद्ध ज़रूरतें':'Pure everyday essentials for your kitchen','बिचौलियों की लंबी श्रृंखला नहीं—उत्पादन और तैयारी की हर अवस्था हमारे किसान सदस्यों की देखरेख में।':'No long chain of intermediaries—every stage of production and preparation is supervised by our farmer members.',
  'सरसों':'Mustard','तेल':'Oil','संपूर्ण':'Whole','गेहूँ':'Wheat','सुगंधित':'Aromatic','मसाले':'Spices','शीघ्र उपलब्ध':'Available Soon','नई फसल':'New Harvest','छोटी खेप':'Small Batch','कच्ची घानी सरसों तेल':'Cold-Pressed Mustard Oil','खेत का साबुत गेहूँ':'Farm-Grown Whole Wheat','खेत में उगे मसाले':'Farm-Grown Spices','धीमी गति से निकाला गया तेल, जिसमें सरसों की प्राकृतिक सुगंध और स्वाद सुरक्षित रहे।':'Slow-pressed oil that preserves mustard’s natural aroma and flavour.','चुने हुए दानों वाला पौष्टिक गेहूँ, घर की मुलायम और स्वादिष्ट रोटियों के लिए।':'Nutritious, carefully selected wheat for soft and wholesome rotis.','धूप में सुखाए, साफ किए और सावधानी से तैयार किए गए भरपूर स्वाद वाले मसाले।':'Sun-dried, cleaned and carefully prepared spices with abundant natural flavour.','जानकारी लें':'Enquire Now',
  'साझी मेहनत, साझा उन्नति':'Shared Effort, Shared Progress','सिर्फ़ उत्पाद नहीं,':'More than produce,','किसान का आत्मसम्मान':'a farmer’s self-respect','प्राउट एग्रो एक किसान-स्वामित्व वाली सहकारी पहल है। हम संसाधन, ज्ञान और अवसर साझा करके अच्छी उपज उगाते हैं और हर परिवार तक ईमानदार खाद्य सामग्री पहुँचाते हैं।':'Prout Agro is a farmer-owned cooperative. We share resources, knowledge and opportunity to grow quality produce and bring honest food to every family.','सहकारिता के बारे में':'About the Cooperative','अपने खेतों की उपज':'Produce from our own farms','अनावश्यक बिचौलिए':'Unnecessary intermediaries','मुख्य उत्पाद श्रेणियाँ':'Core product categories','साझा किसान परिवार':'One cooperative family',
  'हमारी कार्यप्रणाली':'Our Process','बीज से आपके भोजन तक':'From seed to your meal','हर चरण में किसान की निगरानी और गुणवत्ता का ध्यान।':'Farmer oversight and careful quality control at every stage.','सावधानी से खेती':'Responsible Cultivation','मौसम और मिट्टी के अनुरूप जिम्मेदार खेती।':'Farming responsibly for the season and soil.','सही समय पर कटाई':'Timely Harvest','स्वाद और गुणवत्ता के लिए उचित समय का चुनाव।':'Harvested at the right time for flavour and quality.','स्वच्छ तैयारी':'Clean Preparation','छँटाई, सफाई और छोटी खेप में प्रसंस्करण।':'Sorting, cleaning and small-batch processing.','सीधे आपके लिए':'Directly for You','खुदरा, परिवार और थोक खरीदारों तक आपूर्ति।':'Supply for families, retailers and wholesale buyers.',
  'उपज संबंधी पूछताछ':'Produce Enquiries','आपकी आवश्यकता,':'Your requirement,','हमारी सीधी सहायता':'our direct support','घरेलू, खुदरा या थोक आवश्यकता के लिए हमें लिखें। उपलब्धता और मूल्य की जानकारी हमारी टीम साझा करेगी।':'Write to us for household, retail or wholesale requirements. Our team will share availability and pricing.','ईमेल द्वारा संपर्क':'Contact by Email','उत्तर का समय: कार्यदिवस में २४ घंटे के भीतर':'Response time: within 24 hours on working days','किसानों की अपनी भूमि पर उगाई शुद्ध उपज।':'Pure produce grown on our farmers’ own land.','धरती से जुड़ी, विश्वास से भरी।':'Rooted in the earth, filled with trust.','महत्वपूर्ण कड़ियाँ':'Important Links','सामग्री का स्वामित्व एवं प्रबंधन: प्राउट एग्रो':'Content owned and managed by Prout Agro',
  'मुखपृष्ठ / सहकारिता परिचय':'Home / About the Cooperative','हमारी सहकारिता':'Our Cooperative','एक खेत नहीं—एकजुट किसान परिवार':'Not one farm—a united farming family','हमारी':'Our','मिट्टी':'Soil','हमारी पहचान':'Our Identity','हम कौन हैं':'Who We Are','जब किसान साथ बढ़ते हैं,':'When farmers grow together,','हर फसल बेहतर होती है':'every harvest becomes better','प्राउट एग्रो किसान परिवारों की साझा पहल है। इसकी शुरुआत इस विश्वास से हुई कि छोटे किसान अपने संसाधन, अनुभव और अवसर साझा करके एक मजबूत तथा आत्मनिर्भर व्यवस्था बना सकते हैं।':'Prout Agro is a shared initiative of farming families. It began with the belief that small farmers can build a stronger, self-reliant system by sharing resources, experience and opportunity.','हम अपने खेतों पर तिलहन, गेहूँ और मसाले उगाते हैं। खेती से लेकर सफाई, तैयारी और आपूर्ति तक हमारे सदस्य हर चरण से जुड़े रहते हैं। इससे ग्राहक को उपज का स्पष्ट स्रोत मिलता है और किसान को अपनी मेहनत का उचित सम्मान।':'We grow oilseeds, wheat and spices on our own land. Our members remain involved from cultivation through cleaning, preparation and supply, giving customers clear provenance and farmers fair recognition for their work.',
  'हमारा उद्देश्य':'Our Purpose','शुद्ध भोजन और सशक्त किसान समुदाय':'Pure food and empowered farming communities','जिम्मेदार खेती, पारदर्शी प्रक्रिया और सीधी पहुँच के माध्यम से खेत तथा रसोई के बीच विश्वास का संबंध बनाना।':'To build trust between farm and kitchen through responsible cultivation, transparent processes and direct access.','हमारी दृष्टि':'Our Vision','स्थानीय समृद्धि का टिकाऊ सहकारी मॉडल':'A sustainable cooperative model for local prosperity','ऐसी व्यवस्था विकसित करना जहाँ गुणवत्ता की पहचान किसान के नाम से हो और विकास का लाभ पूरे समुदाय तक पहुँचे।':'To create a system where quality carries the farmer’s name and the benefits of growth reach the whole community.',
  'हमारे मूल सिद्धांत':'Our Guiding Principles','हर निर्णय की जड़ में':'At the root of every decision','धरती का सम्मान':'Respect for the Earth','मिट्टी, मौसम और आने वाली पीढ़ियों को ध्यान में रखकर खेती।':'Farming with care for soil, seasons and future generations.','साझी प्रगति':'Shared Progress','संसाधन, ज्ञान, अवसर और उपलब्धियों में सभी की भागीदारी।':'Participation for all in resources, knowledge, opportunity and achievement.','स्पष्ट गुणवत्ता':'Transparent Quality','उपज कहाँ उगी और कैसे तैयार हुई—इसकी साफ जानकारी।':'Clear information about where produce was grown and how it was prepared.','किसान प्रथम':'Farmers First','हर व्यवस्था में किसान की गरिमा और उचित मूल्य को प्राथमिकता।':'Prioritising farmer dignity and fair value in every system.',
  'हमारी साझा यात्रा':'Our Shared Journey','भूमि से जुड़ाव,':'Rooted in the land,','भविष्य की तैयारी':'ready for the future','पहला चरण':'First Step','किसान परिवारों का जुड़ना':'Farming Families Unite','साझी आवश्यकताओं और अवसरों के लिए एक सहकारी विचार पर सहमति।':'A shared cooperative vision for common needs and opportunities.','दूसरा चरण':'Second Step','उत्पादन और संसाधन साझा करना':'Sharing Production and Resources','खेती के अनुभव, प्रक्रियाओं और गुणवत्ता मानकों को एक साथ लाना।':'Bringing together farming experience, processes and quality standards.','आज':'Today','खेत से ग्राहक तक सीधा संबंध':'A Direct Farm-to-Customer Connection','शुद्ध तेल, गेहूँ और मसालों को भरोसे के साथ उपलब्ध कराना।':'Providing pure oils, wheat and spices with confidence.','हमसे जुड़ें':'Connect With Us','एक बेहतर खाद्य व्यवस्था,':'A better food system,','मिलकर बनाएँ':'built together','उत्पाद, साझेदारी या थोक आवश्यकता के लिए हमारी सहकारी टीम से संपर्क करें।':'Contact our cooperative team for produce, partnerships or wholesale requirements.'
};

const hindi = Object.fromEntries(Object.entries(english).map(([hi, en]) => [en, hi]));

const originalText = new Map();
const translatableAttributes = ['aria-label', 'placeholder', 'alt'];

function setLanguage(language) {
  const useEnglish = language === 'en';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const value = node.nodeValue.trim();
    if (!value) return;
    if (!originalText.has(node)) originalText.set(node, value);
    const original = originalText.get(node);
    const translated = useEnglish ? (english[original] || original) : (english[original] ? original : (hindi[original] || original));
    node.nodeValue = node.nodeValue.replace(value, translated);
    node.nodeValue = node.nodeValue.replace(/Prout Agro Farmers' Cooperative|Prout Agro cooperative|Prout Agro(?! Commodity)|प्राउट एग्रो किसान सहकारी समिति|प्राउट एग्रो/gi, 'PROUT Agro Commodity');
  });
  document.querySelectorAll('*').forEach((element) => translatableAttributes.forEach((attribute) => {
    if (!element.hasAttribute(attribute)) return;
    const key = `data-original-${attribute}`;
    if (!element.hasAttribute(key)) element.setAttribute(key, element.getAttribute(attribute));
    const original = element.getAttribute(key);
    const translated = useEnglish ? (english[original] || original) : (english[original] ? original : (hindi[original] || original));
    element.setAttribute(attribute, translated);
    element.setAttribute(attribute, element.getAttribute(attribute).replace(/Prout Agro Farmers' Cooperative|Prout Agro cooperative|Prout Agro(?! Commodity)|प्राउट एग्रो किसान सहकारी समिति|प्राउट एग्रो/gi, 'PROUT Agro Commodity'));
  }));
  document.querySelectorAll('.brand strong').forEach((name) => { name.textContent = 'PROUT Agro Commodity'; });
  document.querySelectorAll('.brand small').forEach((descriptor) => descriptor.remove());
  document.documentElement.lang = language;
  const pageTitles = {
    'pac-cooperative.html': ['PAC Cooperative | PROUT Agro Commodity', 'पीएसी सहकारिता | PROUT Agro Commodity'],
    'prout-philosophy.html': ['PROUT Philosophy | PROUT Agro Commodity', 'प्राउट दर्शन | PROUT Agro Commodity'],
    'our-members.html': ['Our Members | PROUT Agro Commodity', 'हमारे सदस्य | PROUT Agro Commodity'],
    'about.html': ['About | PROUT Agro Commodity', 'परिचय | PROUT Agro Commodity']
  };
  const fileName = location.pathname.split('/').pop() || 'index.html';
  document.title = pageTitles[fileName]?.[useEnglish ? 0 : 1] || (useEnglish ? 'PROUT Agro Commodity | Farm-Grown Essentials' : 'PROUT Agro Commodity');
  document.querySelectorAll('[data-language]').forEach((button) => button.classList.toggle('active', button.dataset.language === language));
  sessionStorage.setItem('prout-language', language);
  document.dispatchEvent(new CustomEvent('proutlanguagechange'));
}

document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
setLanguage(sessionStorage.getItem('prout-language') || 'en');
