const navButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const navigationBar = document.querySelector('.nav-wrap');
const identityRow = document.querySelector('.identity-row');

if (identityRow && navigationBar) {
  const headerBrand = identityRow.querySelector('.brand');
  if (headerBrand) navigationBar.prepend(headerBrand);
  identityRow.remove();
}

document.querySelectorAll('.search').forEach((search) => search.remove());

if (navButton && navigation) {
  navButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    navButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    navButton.setAttribute('aria-expanded', 'false');
  }));
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
    const hindi = originalText.get(node);
    if (english[hindi]) node.nodeValue = node.nodeValue.replace(value, useEnglish ? english[hindi] : hindi);
  });
  document.querySelectorAll('*').forEach((element) => translatableAttributes.forEach((attribute) => {
    if (!element.hasAttribute(attribute)) return;
    const key = `data-original-${attribute}`;
    if (!element.hasAttribute(key)) element.setAttribute(key, element.getAttribute(attribute));
    const hindi = element.getAttribute(key);
    if (english[hindi]) element.setAttribute(attribute, useEnglish ? english[hindi] : hindi);
  }));
  document.documentElement.lang = language;
  const aboutPage = location.pathname.includes('about');
  document.title = useEnglish ? (aboutPage ? 'About the Cooperative | Prout Agro' : "Prout Agro Farmers' Cooperative | Farm-Grown Essentials") : (aboutPage ? 'सहकारिता परिचय | प्राउट एग्रो' : 'प्राउट एग्रो किसान सहकारी समिति');
  document.querySelectorAll('[data-language]').forEach((button) => button.classList.toggle('active', button.dataset.language === language));
  sessionStorage.setItem('prout-language', language);
}

document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
setLanguage(sessionStorage.getItem('prout-language') || 'en');
