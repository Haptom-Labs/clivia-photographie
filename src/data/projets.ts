// Auto-genere par scripts/build-projets-data.mjs - ne pas editer manuellement
// Source: ~/Desktop/site-photographie (Instagram @cliviaambroise_photographie)

export type ProjetIndividuel = {
  slug: string;
  title: string;
  location: string;
  locationSlug: string;
  year: number | null;
  description: string;
  cover: string;
  images: string[];
  imageCount: number;
  partnerAgence?: string;
};

export type Agence = {
  slug: string;
  name: string;
  blurb: string;
  cover: string;
  locations: string[];
  yearStart: number;
  yearEnd: number;
  imageCountTotal: number;
  projects: ProjetIndividuel[];
};

export type SerieProjet = {
  slug: string;
  location: string;
  date: string;
  year: number | null;
  postCount: number;
  images: string[];
};

export type CarnetVoyage = {
  slug: string;
  title: string;
  blurb: string;
  locations: string[];
  yearStart: number;
  yearEnd: number;
  cover: string;
  imageCount: number;
  images: string[];
  series: SerieProjet[];
};

export const agences: Agence[] = [
  {
    "slug": "brochet-rose",
    "name": "Brochet Rose",
    "blurb": "Maisons et résidences singulières, de Saint-Émilion au Cap-Ferret.",
    "cover": "/images/projets/brochetrose-architecture/3481383345251303791_3481383330873131302.jpg",
    "locations": [
      "Bordeaux",
      "Cap-Ferret"
    ],
    "yearStart": 2024,
    "yearEnd": 2025,
    "imageCountTotal": 196,
    "projects": [
      {
        "slug": "bordeaux-maison-surelevation",
        "title": "Maison rénovée et surélevée",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Réhabilitation contemporaine d'une maison bordelaise. Surélévation et redistribution complète des volumes intérieurs, lecture précise des matériaux et de la lumière.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533772653114351.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533772653114351.jpg",
          "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533774314079765.jpg",
          "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533775563987035.jpg",
          "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987291257708677.jpg",
          "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987294739023841.jpg",
          "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987299654750199.jpg",
          "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987301701580037.jpg",
          "/images/projets/brochetrose-architecture/instagram/3882191816712028148_3882191764333537171.jpg",
          "/images/projets/brochetrose-architecture/instagram/3882191816712028148_3882191766866891602.jpg",
          "/images/projets/brochetrose-architecture/instagram/3880013525431411120_3880013491818218775.jpg",
          "/images/projets/brochetrose-architecture/instagram/3880013525431411120_3880013495458908375.jpg",
          "/images/projets/brochetrose-architecture/instagram/3880013525431411120_3880013495853172722.jpg",
          "/images/projets/brochetrose-architecture/instagram/3875664688382232427_3875664653829556793.jpg",
          "/images/projets/brochetrose-architecture/instagram/3875664688382232427_3875664660506895072.jpg",
          "/images/projets/brochetrose-architecture/instagram/3874216656524594607_3874216619522430999.jpg",
          "/images/projets/brochetrose-architecture/instagram/3874216656524594607_3874216621896382055.jpg",
          "/images/projets/brochetrose-architecture/instagram/3872040360365277390.jpg",
          "/images/projets/brochetrose-architecture/instagram/3870588774959025697_3870588712371631542.jpg",
          "/images/projets/brochetrose-architecture/instagram/3870588774959025697_3870588724358978322.jpg",
          "/images/projets/brochetrose-architecture/instagram/3870588774959025697_3870588724904231859.jpg",
          "/images/projets/brochetrose-architecture/instagram/3869477508014191354_3869477454343836600.jpg",
          "/images/projets/brochetrose-architecture/instagram/3869477508014191354_3869477456248081160.jpg",
          "/images/projets/brochetrose-architecture/instagram/3866973916774567085.jpg",
          "/images/projets/brochetrose-architecture/instagram/3608234490249526105_3608234473958807278.jpg",
          "/images/projets/brochetrose-architecture/instagram/3608234490249526105_3608234474260758737.jpg",
          "/images/projets/brochetrose-architecture/instagram/3607521635158566870.jpg",
          "/images/projets/brochetrose-architecture/instagram/3606797609536726540.jpg",
          "/images/projets/brochetrose-architecture/instagram/3606086284703664823.jpg",
          "/images/projets/brochetrose-architecture/instagram/3600975181497579601.jpg",
          "/images/projets/brochetrose-architecture/instagram/3598105939987170714.jpg",
          "/images/projets/brochetrose-architecture/instagram/3596643394000671604.jpg",
          "/images/projets/brochetrose-architecture/instagram/3571294706357446519.jpg",
          "/images/projets/brochetrose-architecture/instagram/3569835450692680482.jpg",
          "/images/projets/brochetrose-architecture/instagram/3565488295023165102.jpg",
          "/images/projets/brochetrose-architecture/instagram/3562593285504188755.jpg",
          "/images/projets/brochetrose-architecture/instagram/3559797752251151794.jpg",
          "/images/projets/brochetrose-architecture/instagram/3557585204177229128.jpg",
          "/images/projets/brochetrose-architecture/instagram/3508963629408519336_3508963613067645069.jpg",
          "/images/projets/brochetrose-architecture/instagram/3508963629408519336_3508963613243694604.jpg",
          "/images/projets/brochetrose-architecture/instagram/3508963629408519336_3508963613252019813.jpg",
          "/images/projets/brochetrose-architecture/instagram/3500988715267293585_3500988702617344918.jpg",
          "/images/projets/brochetrose-architecture/instagram/3500988715267293585_3500988702718055369.jpg",
          "/images/projets/brochetrose-architecture/instagram/3496641695333228710_3496641676769263733.jpg",
          "/images/projets/brochetrose-architecture/instagram/3496641695333228710_3496641676769448271.jpg",
          "/images/projets/brochetrose-architecture/instagram/3496641695333228710_3496641676979055322.jpg",
          "/images/projets/brochetrose-architecture/instagram/3493751378586244506.jpg",
          "/images/projets/brochetrose-architecture/instagram/3490096376172991053.jpg",
          "/images/projets/brochetrose-architecture/instagram/3395117950803066525.jpg",
          "/images/projets/brochetrose-architecture/instagram/3393695000933571776.jpg",
          "/images/projets/brochetrose-architecture/instagram/3392248456157901637.jpg"
        ],
        "imageCount": 50
      },
      {
        "slug": "bordeaux-maison-individuelle",
        "title": "Maison individuelle rénovée",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Rénovation d'une maison individuelle à Bordeaux. Volumes recomposés, ouvertures généreuses, attention portée aux finitions et à la lumière naturelle.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3811184325593696660_3811184317641267400.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3811184325593696660_3811184317641267400.jpg",
          "/images/projets/brochetrose-architecture/instagram/3811184325593696660_3811184317641284880.jpg",
          "/images/projets/brochetrose-architecture/instagram/3811184325593696660_3811184317649668613.jpg",
          "/images/projets/brochetrose-architecture/instagram/3808271937194197283_3808271931255036338.jpg",
          "/images/projets/brochetrose-architecture/instagram/3808271937194197283_3808271931531861668.jpg",
          "/images/projets/brochetrose-architecture/instagram/3808271937194197283_3808271931531867130.jpg",
          "/images/projets/brochetrose-architecture/instagram/3808271937194197283_3808271931531882473.jpg",
          "/images/projets/brochetrose-architecture/instagram/3803947102796300265_3803947095556946166.jpg",
          "/images/projets/brochetrose-architecture/instagram/3803947102796300265_3803947095640821642.jpg",
          "/images/projets/brochetrose-architecture/instagram/3803947102796300265_3803947095741477911.jpg",
          "/images/projets/brochetrose-architecture/instagram/3799610524045149962_3799610518844213052.jpg",
          "/images/projets/brochetrose-architecture/instagram/3799610524045149962_3799610518861007439.jpg",
          "/images/projets/brochetrose-architecture/instagram/3790897901522951766_3790897895323763229.jpg",
          "/images/projets/brochetrose-architecture/instagram/3790897901522951766_3790897895332173340.jpg",
          "/images/projets/brochetrose-architecture/instagram/3790897901522951766_3790897895541879790.jpg",
          "/images/projets/brochetrose-architecture/instagram/3788726504319132323_3788726497700518247.jpg",
          "/images/projets/brochetrose-architecture/instagram/3788726504319132323_3788726497708919494.jpg",
          "/images/projets/brochetrose-architecture/instagram/3788726504319132323_3788726497968934318.jpg",
          "/images/projets/brochetrose-architecture/instagram/3786112829385102044_3786112819176154111.jpg",
          "/images/projets/brochetrose-architecture/instagram/3786112829385102044_3786112819176167144.jpg",
          "/images/projets/brochetrose-architecture/instagram/3786112829385102044_3786112819176172818.jpg",
          "/images/projets/brochetrose-architecture/instagram/3783249454036685966_3783249448558923517.jpg",
          "/images/projets/brochetrose-architecture/instagram/3783249454036685966_3783249448558946795.jpg",
          "/images/projets/brochetrose-architecture/instagram/3783249454036685966_3783249448768659590.jpg",
          "/images/projets/brochetrose-architecture/instagram/3780349394634421689_3780349390205271700.jpg",
          "/images/projets/brochetrose-architecture/instagram/3780349394634421689_3780349390213660539.jpg",
          "/images/projets/brochetrose-architecture/instagram/3778872431734434158_3778872427154254050.jpg",
          "/images/projets/brochetrose-architecture/instagram/3778872431734434158_3778872427154264728.jpg",
          "/images/projets/brochetrose-architecture/instagram/3777409713387098164_3777409706835630013.jpg",
          "/images/projets/brochetrose-architecture/instagram/3777409713387098164_3777409707028537877.jpg",
          "/images/projets/brochetrose-architecture/instagram/3775993574765365440.jpg"
        ],
        "imageCount": 31
      },
      {
        "slug": "cap-ferret-villa",
        "title": "Villa rénovée et étendue",
        "location": "Cap-Ferret",
        "locationSlug": "cap-ferret",
        "year": 2025,
        "description": "Rénovation et extension d'une villa au Cap-Ferret, dans le respect du caractère du lieu. Travail sur les vues, les terrasses et les intérieurs.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3474142509799303890_3474142495513450323.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3474142509799303890_3474142495513450323.jpg",
          "/images/projets/brochetrose-architecture/instagram/3474142509799303890_3474142495538624495.jpg",
          "/images/projets/brochetrose-architecture/instagram/3474142509799303890_3474142495546891902.jpg",
          "/images/projets/brochetrose-architecture/instagram/3471238794154962796_3471238784072015297.jpg",
          "/images/projets/brochetrose-architecture/instagram/3471238794154962796_3471238784080295794.jpg",
          "/images/projets/brochetrose-architecture/instagram/3471238794154962796_3471238784290112138.jpg",
          "/images/projets/brochetrose-architecture/instagram/3469060226327083199_3469060213224193042.jpg",
          "/images/projets/brochetrose-architecture/instagram/3469060226327083199_3469060213425511211.jpg",
          "/images/projets/brochetrose-architecture/instagram/3469060226327083199_3469060213475686289.jpg",
          "/images/projets/brochetrose-architecture/instagram/3466163185448117076_3466163174039479317.jpg",
          "/images/projets/brochetrose-architecture/instagram/3466163185448117076_3466163174064651529.jpg",
          "/images/projets/brochetrose-architecture/instagram/3464720363805048040_3464720354284132933.jpg",
          "/images/projets/brochetrose-architecture/instagram/3464720363805048040_3464720354435117979.jpg",
          "/images/projets/brochetrose-architecture/instagram/3463272029496047576_3463272017030668080.jpg",
          "/images/projets/brochetrose-architecture/instagram/3463272029496047576_3463272017047565041.jpg",
          "/images/projets/brochetrose-architecture/instagram/3463272029496047576_3463272017064169466.jpg"
        ],
        "imageCount": 16
      },
      {
        "slug": "bordeaux-maison-bassin",
        "title": "Maison sur le bassin",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Maison contemporaine en bord de bassin signée Brochet Rose. Reportage sur les volumes, la lumière, et le rapport au paysage.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3701324683370260585.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3701324683370260585.jpg",
          "/images/projets/brochetrose-architecture/instagram/3695178486016210774.jpg",
          "/images/projets/brochetrose-architecture/instagram/3691175727289976462.jpg",
          "/images/projets/brochetrose-architecture/instagram/3687188197888508648.jpg",
          "/images/projets/brochetrose-architecture/instagram/3683576239587066118.jpg",
          "/images/projets/brochetrose-architecture/instagram/3682150542255603430_3682150533305110910.jpg",
          "/images/projets/brochetrose-architecture/instagram/3682150542255603430_3682150533313552058.jpg",
          "/images/projets/brochetrose-architecture/instagram/3681070188581283678_3681070178196035989.jpg",
          "/images/projets/brochetrose-architecture/instagram/3681070188581283678_3681070178196125255.jpg",
          "/images/projets/brochetrose-architecture/instagram/3672724866838710386.jpg",
          "/images/projets/brochetrose-architecture/instagram/3664030280427717862.jpg"
        ],
        "imageCount": 11
      },
      {
        "slug": "bordeaux-etude-notariale-dgot",
        "title": "Étude notariale (avec DGOT)",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Rénovation d'une étude notariale bordelaise en partenariat avec l'agence DGOT. Espaces de travail, lumière naturelle, mobilier.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3772339793725002734.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3772339793725002734.jpg",
          "/images/projets/brochetrose-architecture/instagram/3769869338954964772.jpg",
          "/images/projets/brochetrose-architecture/instagram/3768442114469064457.jpg",
          "/images/projets/brochetrose-architecture/instagram/3767290996770791048.jpg",
          "/images/projets/brochetrose-architecture/instagram/3765542306230088104_3765542301364653862.jpg",
          "/images/projets/brochetrose-architecture/instagram/3765542306230088104_3765542301364699765.jpg",
          "/images/projets/brochetrose-architecture/instagram/3762926952022574710_3762926942509867026.jpg",
          "/images/projets/brochetrose-architecture/instagram/3762926952022574710_3762926942518293207.jpg",
          "/images/projets/brochetrose-architecture/instagram/3762926952022574710_3762926942627322574.jpg"
        ],
        "imageCount": 9,
        "partnerAgence": "DGOT"
      },
      {
        "slug": "bordeaux-appartement",
        "title": "Appartement rénové",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Réhabilitation d'un appartement bordelais. Intervention sobre et précise sur les volumes, la lumière et les finitions.",
        "cover": "/images/projets/brochetrose-architecture/instagram/3349475440445825508_3349475427124608718.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/instagram/3349475440445825508_3349475427124608718.jpg",
          "/images/projets/brochetrose-architecture/instagram/3349475440445825508_3349475427124671302.jpg",
          "/images/projets/brochetrose-architecture/instagram/3348740761358933923_3348740751351347175.jpg",
          "/images/projets/brochetrose-architecture/instagram/3348740761358933923_3348740751535779854.jpg",
          "/images/projets/brochetrose-architecture/instagram/3347329315584454439_3347329296089225140.jpg",
          "/images/projets/brochetrose-architecture/instagram/3347329315584454439_3347329296089252916.jpg"
        ],
        "imageCount": 6
      },
      {
        "slug": "bordeaux-mars-2024",
        "title": "Bordeaux — Mars 2024",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Reportage photographique d'un chantier livré en Mars 2024 à Bordeaux pour l'agence Brochet Rose. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/brochetrose-architecture/001_brochetrose-architecture.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/001_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/002_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/003_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/004_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/005_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/006_brochetrose-architecture.jpg"
        ],
        "imageCount": 6
      },
      {
        "slug": "bordeaux-juin-2024",
        "title": "Bordeaux — Juin 2024",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Reportage photographique d'un chantier livré en Juin 2024 à Bordeaux pour l'agence Brochet Rose. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/brochetrose-architecture/007_brochetrose-architecture.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/007_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/008_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/009_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/010_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/011_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/012_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/013_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/014_brochetrose-architecture.jpg"
        ],
        "imageCount": 8
      },
      {
        "slug": "bordeaux-juillet-2024",
        "title": "Bordeaux — Juillet 2024",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Reportage photographique d'un chantier livré en Juillet 2024 à Bordeaux pour l'agence Brochet Rose. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/brochetrose-architecture/015_brochetrose-architecture.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/015_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/016_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/017_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/018_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/019_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/020_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/021_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/022_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/023_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/024_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/025_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/026_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/027_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/028_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/029_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/030_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/031_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/032_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/033_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/034_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/035_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/036_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/037_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/038_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/039_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/040_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/041_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/042_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/043_brochetrose-architecture.jpg"
        ],
        "imageCount": 29
      },
      {
        "slug": "cap-ferret-juillet-2024",
        "title": "Cap-Ferret — Juillet 2024",
        "location": "Cap-Ferret",
        "locationSlug": "cap-ferret",
        "year": 2024,
        "description": "Reportage photographique d'un chantier livré en Juillet 2024 à Cap-Ferret pour l'agence Brochet Rose. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/brochetrose-architecture/044_brochetrose-architecture.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/044_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/045_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/046_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/047_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/048_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/049_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/050_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/051_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/052_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/053_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/054_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/055_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/056_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/057_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/058_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/059_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/060_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/061_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/062_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/063_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/064_brochetrose-architecture.jpg"
        ],
        "imageCount": 21
      },
      {
        "slug": "bordeaux-avril-2025",
        "title": "Bordeaux — Avril 2025",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Avril 2025 à Bordeaux pour l'agence Brochet Rose. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/brochetrose-architecture/065_brochetrose-architecture.jpg",
        "images": [
          "/images/projets/brochetrose-architecture/065_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/066_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/067_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/068_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/069_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/070_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/071_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/072_brochetrose-architecture.jpg",
          "/images/projets/brochetrose-architecture/073_brochetrose-architecture.jpg"
        ],
        "imageCount": 9
      }
    ]
  },
  {
    "slug": "agence-dame",
    "name": "Agence Dame",
    "blurb": "Architecture résidentielle contemporaine en Gironde.",
    "cover": "/images/projets/agence-dame/001_agence-dame.jpg",
    "locations": [
      "Castres-sur-Gironde",
      "Saint-Émilion",
      "Bordeaux"
    ],
    "yearStart": 2025,
    "yearEnd": 2026,
    "imageCountTotal": 75,
    "projects": [
      {
        "slug": "bordeaux-fevrier-2025",
        "title": "Bordeaux — Février 2025",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Février 2025 à Bordeaux pour l'agence Agence Dame. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/agence-dame/001_agence-dame.jpg",
        "images": [
          "/images/projets/agence-dame/001_agence-dame.jpg",
          "/images/projets/agence-dame/002_agence-dame.jpg",
          "/images/projets/agence-dame/003_agence-dame.jpg",
          "/images/projets/agence-dame/004_agence-dame.jpg",
          "/images/projets/agence-dame/005_agence-dame.jpg",
          "/images/projets/agence-dame/006_agence-dame.jpg",
          "/images/projets/agence-dame/007_agence-dame.jpg",
          "/images/projets/agence-dame/008_agence-dame.jpg",
          "/images/projets/agence-dame/009_agence-dame.jpg",
          "/images/projets/agence-dame/010_agence-dame.jpg",
          "/images/projets/agence-dame/011_agence-dame.jpg"
        ],
        "imageCount": 11
      },
      {
        "slug": "castres-sur-gironde-juillet-2025",
        "title": "Castres-sur-Gironde — Juillet 2025",
        "location": "Castres-sur-Gironde",
        "locationSlug": "castres-sur-gironde",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Juillet 2025 à Castres-sur-Gironde pour l'agence Agence Dame. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/agence-dame/012_agence-dame.jpg",
        "images": [
          "/images/projets/agence-dame/012_agence-dame.jpg",
          "/images/projets/agence-dame/013_agence-dame.jpg",
          "/images/projets/agence-dame/014_agence-dame.jpg",
          "/images/projets/agence-dame/015_agence-dame.jpg",
          "/images/projets/agence-dame/016_agence-dame.jpg",
          "/images/projets/agence-dame/017_agence-dame.jpg",
          "/images/projets/agence-dame/018_agence-dame.jpg",
          "/images/projets/agence-dame/019_agence-dame.jpg",
          "/images/projets/agence-dame/020_agence-dame.jpg",
          "/images/projets/agence-dame/021_agence-dame.jpg",
          "/images/projets/agence-dame/022_agence-dame.jpg",
          "/images/projets/agence-dame/023_agence-dame.jpg",
          "/images/projets/agence-dame/024_agence-dame.jpg",
          "/images/projets/agence-dame/025_agence-dame.jpg",
          "/images/projets/agence-dame/026_agence-dame.jpg",
          "/images/projets/agence-dame/027_agence-dame.jpg",
          "/images/projets/agence-dame/028_agence-dame.jpg",
          "/images/projets/agence-dame/029_agence-dame.jpg",
          "/images/projets/agence-dame/030_agence-dame.jpg",
          "/images/projets/agence-dame/031_agence-dame.jpg",
          "/images/projets/agence-dame/032_agence-dame.jpg",
          "/images/projets/agence-dame/033_agence-dame.jpg",
          "/images/projets/agence-dame/034_agence-dame.jpg",
          "/images/projets/agence-dame/035_agence-dame.jpg",
          "/images/projets/agence-dame/036_agence-dame.jpg",
          "/images/projets/agence-dame/037_agence-dame.jpg",
          "/images/projets/agence-dame/038_agence-dame.jpg",
          "/images/projets/agence-dame/039_agence-dame.jpg"
        ],
        "imageCount": 28
      },
      {
        "slug": "saint-emilion-juillet-2025",
        "title": "Saint-Émilion — Juillet 2025",
        "location": "Saint-Émilion",
        "locationSlug": "saint-emilion",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Juillet 2025 à Saint-Émilion pour l'agence Agence Dame. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/agence-dame/040_agence-dame.jpg",
        "images": [
          "/images/projets/agence-dame/040_agence-dame.jpg",
          "/images/projets/agence-dame/041_agence-dame.jpg",
          "/images/projets/agence-dame/042_agence-dame.jpg",
          "/images/projets/agence-dame/043_agence-dame.jpg",
          "/images/projets/agence-dame/044_agence-dame.jpg",
          "/images/projets/agence-dame/045_agence-dame.jpg",
          "/images/projets/agence-dame/046_agence-dame.jpg",
          "/images/projets/agence-dame/047_agence-dame.jpg",
          "/images/projets/agence-dame/048_agence-dame.jpg",
          "/images/projets/agence-dame/049_agence-dame.jpg",
          "/images/projets/agence-dame/050_agence-dame.jpg",
          "/images/projets/agence-dame/051_agence-dame.jpg",
          "/images/projets/agence-dame/052_agence-dame.jpg",
          "/images/projets/agence-dame/053_agence-dame.jpg",
          "/images/projets/agence-dame/054_agence-dame.jpg",
          "/images/projets/agence-dame/055_agence-dame.jpg",
          "/images/projets/agence-dame/056_agence-dame.jpg",
          "/images/projets/agence-dame/057_agence-dame.jpg",
          "/images/projets/agence-dame/058_agence-dame.jpg",
          "/images/projets/agence-dame/059_agence-dame.jpg",
          "/images/projets/agence-dame/060_agence-dame.jpg",
          "/images/projets/agence-dame/061_agence-dame.jpg",
          "/images/projets/agence-dame/062_agence-dame.jpg",
          "/images/projets/agence-dame/063_agence-dame.jpg",
          "/images/projets/agence-dame/064_agence-dame.jpg",
          "/images/projets/agence-dame/065_agence-dame.jpg",
          "/images/projets/agence-dame/066_agence-dame.jpg",
          "/images/projets/agence-dame/067_agence-dame.jpg",
          "/images/projets/agence-dame/068_agence-dame.jpg",
          "/images/projets/agence-dame/069_agence-dame.jpg",
          "/images/projets/agence-dame/070_agence-dame.jpg",
          "/images/projets/agence-dame/071_agence-dame.jpg",
          "/images/projets/agence-dame/072_agence-dame.jpg",
          "/images/projets/agence-dame/073_agence-dame.jpg",
          "/images/projets/agence-dame/074_agence-dame.jpg",
          "/images/projets/agence-dame/075_agence-dame.jpg"
        ],
        "imageCount": 36
      }
    ]
  },
  {
    "slug": "florentine-du-chazaud",
    "name": "Florentine du Chazaud",
    "blurb": "Architecture d'intérieur, projets résidentiels et lieux d'exception.",
    "cover": "/images/projets/florentine-du-chazaud/3774561766215576925_3774561756971295449.jpg",
    "locations": [
      "Bordeaux"
    ],
    "yearStart": 2025,
    "yearEnd": 2025,
    "imageCountTotal": 36,
    "projects": [
      {
        "slug": "bordeaux-octobre-2024",
        "title": "Bordeaux — Octobre 2024",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2024,
        "description": "Reportage photographique d'un chantier livré en Octobre 2024 à Bordeaux pour l'agence Florentine du Chazaud. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/florentine-du-chazaud/001_florentine-du-chazaud.jpg",
        "images": [
          "/images/projets/florentine-du-chazaud/001_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/002_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/003_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/004_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/005_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/006_florentine-du-chazaud.jpg"
        ],
        "imageCount": 6
      },
      {
        "slug": "bordeaux-juin-2025",
        "title": "Bordeaux — Juin 2025",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Juin 2025 à Bordeaux pour l'agence Florentine du Chazaud. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/florentine-du-chazaud/007_florentine-du-chazaud.jpg",
        "images": [
          "/images/projets/florentine-du-chazaud/007_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/008_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/009_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/010_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/011_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/012_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/013_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/014_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/015_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/016_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/017_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/018_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/019_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/020_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/021_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/022_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/023_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/024_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/025_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/026_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/027_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/028_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/029_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/030_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/031_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/032_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/033_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/034_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/035_florentine-du-chazaud.jpg",
          "/images/projets/florentine-du-chazaud/036_florentine-du-chazaud.jpg"
        ],
        "imageCount": 30
      }
    ]
  },
  {
    "slug": "dgot",
    "name": "DGOT",
    "blurb": "Studio d'architecture, interventions contemporaines en milieu patrimonial.",
    "cover": "/images/projets/dgot/3772340301009311289.jpg",
    "locations": [
      "Bordeaux"
    ],
    "yearStart": 2025,
    "yearEnd": 2026,
    "imageCountTotal": 18,
    "projects": [
      {
        "slug": "bordeaux-avril-2025",
        "title": "Bordeaux — Avril 2025",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Avril 2025 à Bordeaux pour l'agence DGOT. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/dgot/001_dgot.jpg",
        "images": [
          "/images/projets/dgot/001_dgot.jpg",
          "/images/projets/dgot/002_dgot.jpg",
          "/images/projets/dgot/003_dgot.jpg",
          "/images/projets/dgot/004_dgot.jpg",
          "/images/projets/dgot/005_dgot.jpg",
          "/images/projets/dgot/006_dgot.jpg",
          "/images/projets/dgot/007_dgot.jpg",
          "/images/projets/dgot/008_dgot.jpg",
          "/images/projets/dgot/009_dgot.jpg"
        ],
        "imageCount": 9
      },
      {
        "slug": "bordeaux-juillet-2025",
        "title": "Bordeaux — Juillet 2025",
        "location": "Bordeaux",
        "locationSlug": "bordeaux",
        "year": 2025,
        "description": "Reportage photographique d'un chantier livré en Juillet 2025 à Bordeaux pour l'agence DGOT. Une lecture sensible du projet, du chantier livré au détail.",
        "cover": "/images/projets/dgot/010_dgot.jpg",
        "images": [
          "/images/projets/dgot/010_dgot.jpg",
          "/images/projets/dgot/011_dgot.jpg",
          "/images/projets/dgot/012_dgot.jpg",
          "/images/projets/dgot/013_dgot.jpg",
          "/images/projets/dgot/014_dgot.jpg",
          "/images/projets/dgot/015_dgot.jpg",
          "/images/projets/dgot/016_dgot.jpg",
          "/images/projets/dgot/017_dgot.jpg",
          "/images/projets/dgot/018_dgot.jpg"
        ],
        "imageCount": 9
      }
    ]
  }
];

export const carnetVoyage: CarnetVoyage | null = {
  "slug": "carnet-de-voyage",
  "title": "Carnet de voyage",
  "blurb": "Notes visuelles, voyages personnels — quand l'œil ne travaille pas pour les autres.",
  "locations": [
    "Pouilles, Italie",
    "Châteaux de la Loire"
  ],
  "yearStart": 2024,
  "yearEnd": 2025,
  "cover": "/images/projets/carnet-de-voyage/001_italie-pouilles.jpg",
  "imageCount": 20,
  "images": [
    "/images/projets/carnet-de-voyage/001_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/002_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/003_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/004_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/005_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/006_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/007_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/008_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/009_italie-pouilles.jpg",
    "/images/projets/carnet-de-voyage/010_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/011_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/012_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/013_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/014_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/015_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/016_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/017_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/018_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/019_chateaux-de-la-loire.jpg",
    "/images/projets/carnet-de-voyage/020_chateaux-de-la-loire.jpg"
  ],
  "series": [
    {
      "slug": "italie-pouilles",
      "location": "Pouilles, Italie",
      "date": "2025-09-08",
      "year": 2025,
      "postCount": 6,
      "images": [
        "/images/projets/carnet-de-voyage/001_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/002_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/003_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/004_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/005_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/006_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/007_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/008_italie-pouilles.jpg",
        "/images/projets/carnet-de-voyage/009_italie-pouilles.jpg"
      ]
    },
    {
      "slug": "chateaux-de-la-loire",
      "location": "Châteaux de la Loire",
      "date": "2024-06-18",
      "year": 2024,
      "postCount": 3,
      "images": [
        "/images/projets/carnet-de-voyage/010_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/011_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/012_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/013_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/014_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/015_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/016_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/017_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/018_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/019_chateaux-de-la-loire.jpg",
        "/images/projets/carnet-de-voyage/020_chateaux-de-la-loire.jpg"
      ]
    }
  ]
};

export const heroCandidates: string[] = [
  "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533772653114351.jpg",
  "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533774314079765.jpg",
  "/images/projets/brochetrose-architecture/instagram/3886533820526917875_3886533775563987035.jpg",
  "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987291257708677.jpg",
  "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987294739023841.jpg",
  "/images/projets/brochetrose-architecture/instagram/3883987450918136670_3883987299654750199.jpg"
];

export const allLocations: string[] = [
  "Bordeaux",
  "Cap-Ferret",
  "Castres-sur-Gironde",
  "Saint-Émilion"
];
