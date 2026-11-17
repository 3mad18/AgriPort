import { ExportProduct } from "./catalog";
import {
  Language,
  getProductStatusTranslation,
  getProductCategoryTranslation,
  getProductSeasonTranslation,
  translateAgriText,
} from "./i18n";

type ProductLocalizationData = {
  name: string;
  variety: string;
  category: string;
  season: string;
  pack: string;
  specs: string;
  origin: string;
  storageTemp: string;
  shelfLife: string;
  description: string;
};

const PRODUCT_LOCALIZATIONS: Record<string, Partial<Record<Language, ProductLocalizationData>>> = {
  artichoke: {
    en: {
      name: "Fresh Egyptian Artichokes",
      variety: "Baladi Variety, French Violet, Green Globe",
      category: "Vegetables",
      season: "November — May",
      pack: "Food-grade brine drums, chilled cartons, vacuum-sealed bags",
      specs: "Calibers: 50, 60, 65 mm Grade 1, trimmed bottoms & hearts, EU compliant",
      origin: "Arab Republic of Egypt",
      storageTemp: "0°C — 2°C (95% Relative Humidity)",
      shelfLife: "21 — 28 days in certified continuous cold chain",
      description:
        "Fresh, premium Egyptian artichokes harvested at dawn from the fertile Nile Delta. Processed in certified packhouses with instant pre-cooling to preserve compact heads, tender bottoms, and completely fiber-free hearts, fully meeting European Union phytosanitary and export standards.",
    },
    fr: {
      name: "Artichauts Égyptiens Frais",
      variety: "Artichaut Français, Variété Baladi, Violet",
      category: "Légumes",
      season: "Novembre — Mai",
      pack: "Fûts alimentaires en saumure, cartons réfrigérés, sachets sous vide",
      specs: "Calibres: 50, 60, 65 mm Catégorie 1, fonds et cœurs parés selon normes UE",
      origin: "République Arabe d'Égypte",
      storageTemp: "0°C — 2°C (Humidité relative 95%)",
      shelfLife: "21 — 28 jours sous chaîne du froid continue",
      description:
        "Artichauts frais d'Égypte récoltés à l'aube et parés dans des stations agréées avec pré-refroidissement immédiat pour garantir des têtes fermes et des cœurs tendres sans fibres, conformes aux exigences strictes de l'Union Européenne.",
    },
    it: {
      name: "Carciofi Freschi Egiziani",
      variety: "Varietà Baladi, Francese Violetto, Green Globe",
      category: "Verdure",
      season: "Novembre — Maggio",
      pack: "Fusti alimentari in salamoia, cartoni refrigerati, sacchetti sottovuoto",
      specs: "Calibri: 50, 60, 65 mm Prima Scelta, cuori e fondi lavorati a norma UE",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "0°C — 2°C (Umidità 95%)",
      shelfLife: "21 — 28 giorni in catena del freddo continua",
      description:
        "Carciofi egiziani freschi di prima qualità raccolti a mano nel Delta del Nilo. Lavorati e confezionati con pre-raffreddamento immediato per garantire teste compatte e cuori teneri senza fibre, pienamente conformi agli standard europei.",
    },
    es: {
      name: "Alcachofas Frescas de Egipto",
      variety: "Variedad Baladi, Francesa Violeta, Green Globe",
      category: "Verduras",
      season: "Noviembre — Mayo",
      pack: "Bidones de salmuera de grado alimentario, cajas refrigeradas, bolsas al vacío",
      specs: "Calibres: 50, 60, 65 mm Primera Categoría, fondos y corazones recortados conforme a la UE",
      origin: "República Árabe de Egipto",
      storageTemp: "0°C — 2°C (Humedad relativa 95%)",
      shelfLife: "21 — 28 días en cadena de frío certificada",
      description:
        "Alcachofas egipcias frescas seleccionadas cosechadas al amanecer y acondicionadas con preenfriamiento inmediato para mantener capítulos prietos y corazones tiernos libres de fibra, cumpliendo rigurosamente los estándares fitosanitarios de la UE.",
    },
  },
  "green-beans": {
    en: {
      name: "Fresh Egyptian Green Beans",
      variety: "Polesta, Bronco, Valentino",
      category: "Vegetables",
      season: "October — May",
      pack: "Reinforced 4-5 kg cartons, 250g & 500g punnets in chilled master flats",
      specs: "Straight crisp stringless pods, 10-14 cm length, Extra Fine & Fine grades",
      origin: "Arab Republic of Egypt",
      storageTemp: "4°C — 7°C (90-95% Relative Humidity)",
      shelfLife: "14 — 21 days",
      description:
        "Hand-picked tender green beans grown under GlobalG.A.P. protocol. Pods are uniformly green, straight, completely stringless, and rapidly pre-cooled upon harvest to maintain crunchiness and fresh farm texture for air and sea reefer shipments.",
    },
    fr: {
      name: "Haricots Verts Frais d'Égypte",
      variety: "Polesta, Bronco, Valentino",
      category: "Légumes",
      season: "Octobre — Mai",
      pack: "Cartons renforcés 4-5 kg, barquettes 250g et 500g sous froid",
      specs: "Gousses droites sans fil, longueur 10-14 cm, calibres Fin & Extra-Fin",
      origin: "République Arabe d'Égypte",
      storageTemp: "4°C — 7°C (Humidité 90-95%)",
      shelfLife: "14 — 21 jours",
      description:
        "Haricots verts cueillis à la main selon les protocoles GlobalG.A.P. Gousses uniformes, bien droites, sans fils, pré-refroidies immédiatement après la cueillette pour préserver croquant et fraîcheur lors du transport aérien et maritime.",
    },
    it: {
      name: "Fagiolini Verdi Freschi",
      variety: "Polesta, Bronco, Valentino",
      category: "Verdure",
      season: "Ottobre — Maggio",
      pack: "Cartoni rinforzati 4-5 kg, cestini 250g e 500g refrigerati",
      specs: "Baccelli dritti e croccanti senza fili, 10-14 cm, gradi Fine ed Extra Fine",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "4°C — 7°C (Umidità 90-95%)",
      shelfLife: "14 — 21 giorni",
      description:
        "Fagiolini teneri di prima scelta raccolti a mano. Baccelli di calibro fine, di colore verde uniforme, privi di fili e pre-raffreddati istantaneamente per garantire una lunga conservabilità.",
    },
    es: {
      name: "Judías Verdes Frescas de Egipto",
      variety: "Polesta, Bronco, Valentino",
      category: "Verduras",
      season: "Octubre — Mayo",
      pack: "Cajas reforzadas 4-5 kg, tarrinas de 250g y 500g en flats refrigerados",
      specs: "Vainas rectas sin hebras, longitud 10-14 cm, categorías Fina y Extrafina",
      origin: "República Árabe de Egipto",
      storageTemp: "4°C — 7°C (Humedad 90-95%)",
      shelfLife: "14 — 21 días",
      description:
        "Judías verdes recolectadas a mano con trazabilidad GlobalG.A.P. Vainas tiernas, rectas y sin hebras, con preenfriamiento rápido tras la recolección para envíos aéreos y marítimos con total frescura.",
    },
  },
  broccoli: {
    en: {
      name: "Fresh Green Broccoli",
      variety: "Calabrese, Marathon, Heritage",
      category: "Vegetables",
      season: "November — April",
      pack: "Iced Styrofoam boxes 5-6 kg, shrink-wrapped chilled cartons",
      specs: "Compact dark blue-green florets, 10-15 cm head diameter, 2-3 cm trimmed stem, pre-cooled",
      origin: "Arab Republic of Egypt",
      storageTemp: "0°C — 1°C with top crushed ice contact",
      shelfLife: "21 — 25 days",
      description:
        "Premium dense broccoli heads featuring tight, deep blue-green beads with zero yellowing. Packed in top-iced polystyrene containers or micro-perforated film to maintain crisp moisture and peak nutritional value across global transit.",
    },
    fr: {
      name: "Brocoli Vert Frais",
      variety: "Calabrais, Marathon, Heritage",
      category: "Légumes",
      season: "Novembre — Avril",
      pack: "Boîtes polystyrène avec glace broyée 5-6 kg, cartons filmés réfrigérés",
      specs: "Têtes compactes vert bleuté foncé, diamètre 10-15 cm, tige parée 2-3 cm, pré-refroidi",
      origin: "République Arabe d'Égypte",
      storageTemp: "0°C — 1°C avec glace de couverture",
      shelfLife: "21 — 25 jours",
      description:
        "Têtes de brocoli de première qualité aux grains très serrés, sans floraison ni jaunissement. Emballé avec glace alimentaire en caisses polystyrène pour maintenir une hydratation optimale et un croquant irréprochable.",
    },
    it: {
      name: "Broccoli Verdi Freschi",
      variety: "Calabrese, Marathon, Heritage",
      category: "Verdure",
      season: "Novembre — Aprile",
      pack: "Scatole in polistirolo con ghiaccio 5-6 kg, cartoni refrigerati",
      specs: "Cime compatte verde scuro bluastro, diametro 10-15 cm, gambo rifilato 2-3 cm",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "0°C — 1°C con ghiaccio a scaglie",
      shelfLife: "21 — 25 giorni",
      description:
        "Teste di broccolo dense e sode con granuli fini e compatti, prive di ingiallimento. Confezionamento con ghiaccio alimentare in casse isotermiche per preservare sapore e consistenza.",
    },
    es: {
      name: "Brócoli Verde Fresco",
      variety: "Calabrese, Marathon, Heritage",
      category: "Verduras",
      season: "Noviembre — Abril",
      pack: "Cajas de poliestireno con hielo triturado 5-6 kg, cajas refrigeradas filmadas",
      specs: "Cabezas compactas verde azulado oscuro, diámetro 10-15 cm, tallo recortado 2-3 cm",
      origin: "República Árabe de Egipto",
      storageTemp: "0°C — 1°C con hielo de cobertura",
      shelfLife: "21 — 25 días",
      description:
        "Brócoli de exportación con pellas muy apretadas y color verde intenso, sin motas ni floración. Empacado con nieve de hielo en cajas aislantes para salvaguardar su frescura hasta el punto de venta final.",
    },
  },
  cauliflower: {
    en: {
      name: "Premium White Cauliflower",
      variety: "Snowball, Fremantle, Incline",
      category: "Vegetables",
      season: "November — April",
      pack: "Lined corrugated cartons 6-8 heads, micro-perforated shrink wrap",
      specs: "Dense snow-white curds, 1.0 - 1.8 kg per head, jacket leaves trimmed for protection",
      origin: "Arab Republic of Egypt",
      storageTemp: "0°C — 2°C (95% Relative Humidity)",
      shelfLife: "21 — 30 days",
      description:
        "Pristine white, dense cauliflower heads with firm compact curds and zero discoloration. Trimmed with protective outer jacket leaves or individually wrapped in breathable film to safeguard during ocean and air transit.",
    },
    fr: {
      name: "Chou-fleur Blanc Extra",
      variety: "Snowball, Fremantle, Incline",
      category: "Légumes",
      season: "Novembre — Avril",
      pack: "Cartons doublés 6-8 pièces, film étirable micro-perforé",
      specs: "Pommes blanc éclatant très denses, 1,0 - 1,8 kg/pièce, feuilles de protection parées",
      origin: "République Arabe d'Égypte",
      storageTemp: "0°C — 2°C (Humidité 95%)",
      shelfLife: "21 — 30 jours",
      description:
        "Choux-fleurs éclatants de blancheur, lourds et fermes, sans taches. Protégés par des feuilles couronnes calibrées ou filmés individuellement pour préserver l'aspect fraîchement récolté.",
    },
    it: {
      name: "Cavolfiore Bianco Extra",
      variety: "Snowball, Fremantle, Incline",
      category: "Verdure",
      season: "Novembre — Aprile",
      pack: "Cartoni foderati 6-8 pezzi, film microforato",
      specs: "Infiorescenze sode bianco brillante, 1,0 - 1,8 kg/testa, foglie parate a protezione",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "0°C — 2°C (Umidità 95%)",
      shelfLife: "21 — 30 giorni",
      description:
        "Cavolfiori a corimbo bianco candido, compatto e privo di difetti. Lavorati con foglie a corona protettive per garantire la massima integrità durante il trasporto refrigerato.",
    },
    es: {
      name: "Coliflor Blanca Extra",
      variety: "Snowball, Fremantle, Incline",
      category: "Verduras",
      season: "Noviembre — Abril",
      pack: "Cajas de cartón forradas 6-8 piezas, retractilado microperforado",
      specs: "Pellas blanco brillante muy prietas, 1.0 - 1.8 kg/pieza, hojas de protección recortadas",
      origin: "República Árabe de Egipto",
      storageTemp: "0°C — 2°C (Humedad 95%)",
      shelfLife: "21 — 30 días",
      description:
        "Coliflores de pella densa, blanca y limpia, seleccionadas en su punto idóneo de madurez y protegidas con hojas exteriores o film transpirable para asegurar una vida útil prolongada.",
    },
  },
  cabbage: {
    en: {
      name: "Fresh Green Cabbage",
      variety: "Baladi Export Variety, Hybrid F1 (Braunschweig, Bronco)",
      category: "Vegetables",
      season: "December — May",
      pack: "15-20 kg mesh bags, wooden crates, sea reefer pallets",
      specs: "Firmly wrapped round heads, uniform weights 1.5 - 2.5 kg, blemish-free",
      origin: "Arab Republic of Egypt",
      storageTemp: "0°C — 1°C (98% Relative Humidity)",
      shelfLife: "4 — 6 weeks",
      description:
        "Crisp, compact green cabbage heads with glossy green wrapper leaves. Uniformly sized and trimmed for retail distribution, processing, and foodservice across European, GCC, and global markets.",
    },
    fr: {
      name: "Chou Vert Frais",
      variety: "Chou Baladi Export, Hybrides F1",
      category: "Légumes",
      season: "Décembre — Mai",
      pack: "Sacs filet 15-20 kg, caisses bois, palettes maritimes réfrigérées",
      specs: "Pommes rondes bien serrées, poids uniformes 1,5 - 2,5 kg, sans défaut",
      origin: "République Arabe d'Égypte",
      storageTemp: "0°C — 1°C (Humidité 98%)",
      shelfLife: "4 — 6 semaines",
      description:
        "Choux verts pommés, lourds et fermes, aux feuilles saines et nettes. Conditionnés sur palettes maritimes selon les normes des grandes surfaces européennes.",
    },
    it: {
      name: "Cavolo Cappuccio Verde",
      variety: "Baladi Export, Ibridi F1",
      category: "Verdure",
      season: "Dicembre — Maggio",
      pack: "Sacchi a rete 15-20 kg, casse in legno, pallet marittimi refrigerati",
      specs: "Teste sferiche compatte, pesi uniformi 1,5 - 2,5 kg, qualità impeccabile",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "0°C — 1°C (Umidità 98%)",
      shelfLife: "4 — 6 settimane",
      description:
        "Cavoli cappucci verdi a testa serrata e fogliame lucido, privi di lesioni meccaniche e perfettamente idonei allo stoccaggio e alle spedizioni marittime su lunga distanza.",
    },
    es: {
      name: "Repollo Verde Fresco",
      variety: "Variedad Baladi Export, Híbridos F1",
      category: "Verduras",
      season: "Diciembre — Mayo",
      pack: "Mallas transpirables 15-20 kg, cajas de madera, palés marítimos refrigerados",
      specs: "Cabezas esféricas prietas, pesos homogéneos 1.5 - 2.5 kg, sin taras",
      origin: "República Árabe de Egipto",
      storageTemp: "0°C — 1°C (Humedad 98%)",
      shelfLife: "4 — 6 semanas",
      description:
        "Repollos verdes muy densos y firmes, con hojas externas brillantes e intactas, calibrados para distribución a supermercados y canal horeca internacional.",
    },
  },
  potatoes: {
    en: {
      name: "Fresh Table & Processing Potatoes",
      variety: "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
      category: "Vegetables",
      season: "January — June",
      pack: "10 kg & 25 kg poly mesh bags, 1250 kg jumbo bags, chilled cartons",
      specs: "Washed & dry-brushed or sand-dusted, graded: 35/55 mm, 55/65 mm, 65+ mm",
      origin: "Arab Republic of Egypt",
      storageTemp: "4°C — 8°C (variety and application specific)",
      shelfLife: "3 — 5 months in controlled ventilation",
      description:
        "Top-grade fresh table and processing potatoes harvested from certified pest-free desert virgin soils. Compliant with stringent European, British, Russian, and Arab phytosanitary brown rot protocols, electronic caliber sorting, and washing.",
    },
    fr: {
      name: "Pommes de Terre de Consommation & Industrie",
      variety: "Spunta, Mondial, Lady Rosetta, Cara, Hermès",
      category: "Légumes",
      season: "Janvier — Juin",
      pack: "Sacs filet 10 kg et 25 kg, big bags jumbo 1250 kg, cartons réfrigérés",
      specs: "Lavees et brossées ou sablées, calibres : 35/55 mm, 55/65 mm, 65+ mm",
      origin: "République Arabe d'Égypte",
      storageTemp: "4°C — 8°C selon variété et destination",
      shelfLife: "3 — 5 mois sous ventilation contrôlée",
      description:
        "Pommes de terre fraîches pour consommation directe ou friture industrielle, cultivées en zones indemnes certifiées conformes aux protocoles stricts de l'Union Européenne et du Royaume-Uni.",
    },
    it: {
      name: "Patate Fresche da Consumo e Industria",
      variety: "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
      category: "Verdure",
      season: "Gennaio — Giugno",
      pack: "Sacchi a rete 10 e 25 kg, sacchi jumbo 1250 kg, cartoni refrigerati",
      specs: "Lavate e spazzolate o sabbiate, calibri: 35/55 mm, 55/65 mm, 65+ mm",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "4°C — 8°C (in base alla varietà)",
      shelfLife: "3 — 5 mesi in ambiente a temperatura e ventilazione controllate",
      description:
        "Patate da tavola e da trasformazione industriale provenienti da terreni desertici vergini certificati privi di marciume bruno, conformi alle normative fitosanitarie UE.",
    },
    es: {
      name: "Patatas Frescas de Consumo e Industria",
      variety: "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
      category: "Verduras",
      season: "Enero — Junio",
      pack: "Sacos de malla 10 y 25 kg, sacas jumbo 1250 kg, cajas refrigeradas",
      specs: "Lavadas y cepilladas o con arena, calibradas: 35/55 mm, 55/65 mm, 65+ mm",
      origin: "República Árabe de Egipto",
      storageTemp: "4°C — 8°C (según variedad)",
      shelfLife: "3 — 5 meses en atmósfera controlada",
      description:
        "Patatas frescas para mesa y elaboración industrial procedentes de parcelas desérticas libres de plagas, con estricto cumplimiento de los protocolos fitosanitarios de la UE y Reino Unido.",
    },
  },
  lettuce: {
    en: {
      name: "Iceberg & Romaine Lettuce",
      variety: "Iceberg, Romaine, Lollo Rosso",
      category: "Vegetables",
      season: "November — May",
      pack: "Corrugated cartons 10-12 heads in micro-perforated individual bags",
      specs: "Crisp heads rapidly vacuum-cooled post-harvest, uniform 400 - 700 g per head",
      origin: "Arab Republic of Egypt",
      storageTemp: "1°C — 2°C (95-98% Relative Humidity)",
      shelfLife: "18 — 24 days",
      description:
        "Crisp, succulent Iceberg and Romaine lettuce vacuum pre-cooled immediately after morning picking to rapidly pull down core temperature, guaranteeing maximum shelf life and peak crunchiness across international distribution.",
    },
    fr: {
      name: "Laitues Iceberg & Romaine",
      variety: "Iceberg, Romaine, Lollo Rosso",
      category: "Légumes",
      season: "Novembre — Mai",
      pack: "Cartons ondulés 10-12 têtes sous sachets individuels micro-perforés",
      specs: "Têtes croquantes refroidies par le vide (Vacuum Cooling), 400 - 700 g",
      origin: "République Arabe d'Égypte",
      storageTemp: "1°C — 2°C (Humidité 95-98%)",
      shelfLife: "18 — 24 jours",
      description:
        "Laitues Iceberg et Romaines extrêmement croquantes, soumises au pré-refroidissement sous vide immédiatement après récolte afin d'offrir une conservation prolongée sur les étals internationaux.",
    },
    it: {
      name: "Lattuga Iceberg e Romana",
      variety: "Iceberg, Romana, Lollo Rosso",
      category: "Verdure",
      season: "Novembre — Maggio",
      pack: "Cartoni ondulati 10-12 cespi in buste singole microforate",
      specs: "Cespi croccanti pre-raffreddati a vuoto (Vacuum Cooling), 400 - 700 g",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "1°C — 2°C (Umidità 95-98%)",
      shelfLife: "18 — 24 giorni",
      description:
        "Lattughe freschissime e croccanti lavorate con tecnologia di raffreddamento sotto vuoto per abbattere la temperatura interna in pochi minuti e preservare croccantezza e lucentezza.",
    },
    es: {
      name: "Lechuga Iceberg y Romana",
      variety: "Iceberg, Romana, Lollo Rosso",
      category: "Verduras",
      season: "Noviembre — Mayo",
      pack: "Cajas de cartón ondulado 10-12 piezas en bolsas microperforadas" ,
      specs: "Piezas crujientes con enfriamiento por vacío (Vacuum Cooling), 400 - 700 g",
      origin: "República Árabe de Egipto",
      storageTemp: "1°C — 2°C (Humedad 95-98%)",
      shelfLife: "18 — 24 días",
      description:
        "Lechugas Iceberg y Romanas de máxima turgencia, recolectadas a primera hora y sometidas a vacuum cooling para estabilizar la temperatura del cogollo y alargar su frescura en destino.",
    },
  },
  "red-cabbage": {
    en: {
      name: "Fresh Red Cabbage",
      variety: "Ruby Ball, Rodo, Roxy",
      category: "Vegetables",
      season: "December — May",
      pack: "10 kg & 15 kg mesh ventilation bags, telescopic chilled cartons",
      specs: "Deep vibrant purple-red, dense compact heads, 1.0 - 2.0 kg per head, supreme storage stamina",
      origin: "Arab Republic of Egypt",
      storageTemp: "0°C — 1°C",
      shelfLife: "6 — 8 weeks",
      description:
        "Vibrant ruby-red cabbage heads noted for exceptional density, firm structural integrity, and long sea transit resilience. High in natural anthocyanins and antioxidants, ideal for retail and fresh salad production.",
    },
    fr: {
      name: "Chou Rouge Frais",
      variety: "Ruby Ball, Rodo, Roxy",
      category: "Légumes",
      season: "Décembre — Mai",
      pack: "Sacs filet ventilés 10 et 15 kg, cartons télescopiques réfrigérés",
      specs: "Couleur pourpre vif, pommes fermes et lourdes, 1,0 - 2,0 kg, excellente tenue",
      origin: "République Arabe d'Égypte",
      storageTemp: "0°C — 1°C",
      shelfLife: "6 — 8 semaines",
      description:
        "Choux rouges éclatants à la texture serrée et dense, réputés pour leur résistance remarquable aux longues traversées maritimes et leur teneur élevée en antioxydants naturels.",
    },
    it: {
      name: "Cavolo Cappuccio Rosso",
      variety: "Ruby Ball, Rodo, Roxy",
      category: "Verdure",
      season: "Dicembre — Maggio",
      pack: "Sacchi ventilati 10 e 15 kg, cartoni telescopici refrigerati",
      specs: "Colore viola rubino intenso, teste compatte 1,0 - 2,0 kg, tenuta superiore",
      origin: "Repubblica Araba d'Egitto",
      storageTemp: "0°C — 1°C",
      shelfLife: "6 — 8 settimane",
      description:
        "Cavoli cappucci rossi dal colore porpora brillante e dalla consistenza straordinariamente solida, ideali per la conservazione prolungata e il mercato fresco europeo.",
    },
    es: {
      name: "Col Lombarda / Repollo Rojo",
      variety: "Ruby Ball, Rodo, Roxy",
      category: "Verduras",
      season: "Diciembre — Mayo",
      pack: "Mallas ventiladas 10 y 15 kg, cajas telescópicas refrigeradas",
      specs: "Color morado rojizo intenso, cogollos compactos 1.0 - 2.0 kg, gran aguante",
      origin: "República Árabe de Egipto",
      storageTemp: "0°C — 1°C",
      shelfLife: "6 — 8 semanas",
      description:
        "Lombarda de tono púrpura vibrante con estructura interna maciza, de extraordinaria resistencia en tránsito marítimo frigorífico y excelente vida comercial en anaquel.",
    },
  },
};

export function getLocalizedProduct(
  product: ExportProduct,
  language: Language
): ExportProduct {
  if (!product) return product;

  // In Arabic, return full Arabic product data
  if (language === "ar") {
    return {
      ...product,
      origin: product.origin || "جمهورية مصر العربية (Egypt)",
      status: product.status || "متاح للتصدير",
    };
  }

  // Find curated localization by product ID
  const cropId = (product.id || "").toLowerCase();
  const cur = PRODUCT_LOCALIZATIONS[cropId]?.[language] || PRODUCT_LOCALIZATIONS[cropId]?.en;

  // Translate status & category
  const localizedStatus = getProductStatusTranslation(
    product.status || "متاح للتصدير",
    language
  );
  const localizedCategory =
    cur?.category || getProductCategoryTranslation(product.category, language);
  const localizedSeason =
    cur?.season || getProductSeasonTranslation(product.season, language);

  // Translate Origin: remove any Arabic and provide standardized country name
  const localizedOrigin =
    language === "fr"
      ? "République Arabe d'Égypte"
      : language === "it"
      ? "Repubblica Araba d'Egitto"
      : language === "es"
      ? "República Árabe de Egipto"
      : "Arab Republic of Egypt";

  // Translate descriptions, specs, packaging, variety
  let localizedName = cur?.name || translateAgriText(product.name, language);
  let localizedVariety = cur?.variety || translateAgriText(product.variety, language);
  let localizedPack = cur?.pack || translateAgriText(product.pack, language);
  let localizedSpecs = cur?.specs || translateAgriText(product.specs, language);
  let localizedDesc = cur?.description || translateAgriText(product.description, language);
  let localizedStorage = cur?.storageTemp || translateAgriText(product.storageTemp, language);
  let localizedShelfLife = cur?.shelfLife || translateAgriText(product.shelfLife, language);

  // If translation still contains Arabic characters, sanitize them to clean English fallbacks
  if (/[\u0600-\u06FF]/.test(localizedDesc)) {
    localizedDesc =
      "Premium Egyptian export-grade agricultural produce harvested, sorted, and packed under strict GlobalG.A.P. and continuous cold chain protocols.";
  }
  if (/[\u0600-\u06FF]/.test(localizedStorage)) {
    localizedStorage = "0°C — 4°C (Controlled Cold Chain)";
  }
  if (/[\u0600-\u06FF]/.test(localizedShelfLife)) {
    localizedShelfLife = "21 — 30 Days (Certified Cold Chain)";
  }

  return {
    ...product,
    name: localizedName,
    variety: localizedVariety,
    category: localizedCategory,
    season: localizedSeason,
    pack: localizedPack,
    specs: localizedSpecs,
    status: localizedStatus,
    origin: localizedOrigin,
    description: localizedDesc,
    storageTemp: localizedStorage,
    shelfLife: localizedShelfLife,
  };
}
