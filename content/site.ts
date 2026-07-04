export const site = {
  name: "Finopia Services",
  founder: "Yogesh Kadam CFP®",
  phone: "+91 97393 79696",
  office: "+91 99776 96796",
  email: "finopiaservices@gmail.com",
  whatsapp: "919739379696",
  address: "Office No. 1, Sai Samarth Complex, above Gaurav Surgicals, near Shree Hospital, Wakhan Road, Karad – 415110, Maharashtra",
  addressMr: "ऑफिस क्र. १, साई समर्थ कॉम्प्लेक्स, गौरव सर्जिकल्सच्या वर, श्री हॉस्पिटलजवळ, वाखाण रोड, कराड – ४१५११०, महाराष्ट्र",
  instagram: "https://www.instagram.com/finopia_services_",
  youtube: "https://youtube.com/@finopiaservices",
  facebook: "https://www.facebook.com/share/1YnxV29NV1/",
  compliance: {
    arn: "ARN-337302",
    euin: "E641374",
    validity: "05 June 2028",
    cfp: "126010",
    insurer: "HDFC Life Insurance Company Limited",
    agency: "HDF01946314",
  },
} as const;

export const navItems = [
  ["Home", "मुख्यपृष्ठ", "/"],
  ["About", "आमच्याविषयी", "/about"],
  ["Services", "सेवा", "/services"],
  ["Financial Literacy", "आर्थिक साक्षरता", "/financial-literacy"],
  ["Book", "पुस्तक", "/book"],
  ["Insights", "लेख", "/blogs"],
  ["Gallery", "छायाचित्रे", "/gallery"],
  ["Contact", "संपर्क", "/contact"],
] as const;

export const services = [
  { icon: "chart", title: "Mutual Fund Distribution", titleMr: "म्युच्युअल फंड वितरण", description: "Help selecting and accessing suitable mutual fund products with clear, process-led support.", descriptionMr: "स्पष्ट आणि प्रक्रियाधारित सहाय्याने योग्य म्युच्युअल फंड उत्पादने समजून घेण्यास व निवडण्यास मदत." },
  { icon: "shield", title: "Life Insurance Solutions", titleMr: "जीवन विमा उपाय", description: "Protection-focused solutions designed around responsibilities, dependants and life stages.", descriptionMr: "जबाबदाऱ्या, अवलंबित व्यक्ती आणि जीवनातील टप्पे लक्षात घेऊन संरक्षणकेंद्रित उपाय." },
  { icon: "heart", title: "Health Insurance Solutions", titleMr: "आरोग्य विमा उपाय", description: "Guidance to understand health cover, exclusions and the importance of preparedness.", descriptionMr: "आरोग्य विमा संरक्षण, अपवाद आणि आर्थिक तयारीचे महत्त्व समजून घेण्यासाठी मार्गदर्शन." },
  { icon: "book", title: "Financial Literacy Programs", titleMr: "आर्थिक साक्षरता कार्यक्रम", description: "Practical learning experiences that turn financial concepts into everyday habits.", descriptionMr: "आर्थिक संकल्पनांचे दैनंदिन सवयींमध्ये रूपांतर करणारे व्यावहारिक शिक्षण." },
  { icon: "users", title: "Investor Awareness Programs", titleMr: "गुंतवणूकदार जागरूकता कार्यक्रम", description: "Clear, compliant education that helps participants ask better financial questions.", descriptionMr: "सहभागींना योग्य आर्थिक प्रश्न विचारण्यास मदत करणारे स्पष्ट आणि नियमसुसंगत शिक्षण." },
  { icon: "family", title: "Family Financial Management", titleMr: "कौटुंबिक आर्थिक व्यवस्थापन", description: "Simple frameworks for household cash flow, protection, goals and shared decisions.", descriptionMr: "घरगुती रोख प्रवाह, संरक्षण, उद्दिष्टे आणि सामूहिक निर्णयांसाठी सोप्या चौकटी." },
] as const;

export const articles = [
  { category: "Money basics", categoryMr: "पैशाची मूलतत्त्वे", title: "The quiet power of a family money conversation", titleMr: "कुटुंबातील पैशांविषयी संवादाची शांत ताकद", read: "6 min read", readMr: "६ मिनिटांचे वाचन", tone: "mint" },
  { category: "Financial discipline", categoryMr: "आर्थिक शिस्त", title: "Small systems beat big financial resolutions", titleMr: "मोठ्या आर्थिक संकल्पांपेक्षा छोट्या सवयी प्रभावी", read: "4 min read", readMr: "४ मिनिटांचे वाचन", tone: "blue" },
  { category: "Insurance literacy", categoryMr: "विमा साक्षरता", title: "Protection first: understanding what insurance is for", titleMr: "संरक्षण प्रथम: विम्याचा खरा उद्देश समजून घ्या", read: "7 min read", readMr: "७ मिनिटांचे वाचन", tone: "sand" },
] as const;
