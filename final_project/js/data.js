/*
 * Roadmap data used by the website.
 * Keeping this information in a separate file makes app.js easier to read.
 */

// Main course groups
const G = [
    "Computer & IT",
    "Electronics & Electrical",
    "Core Engineering",
    "Life Sciences"
];

// Icons used for the 32 roadmap cards
const IC = [
    "💻", "🤖", "📊", "🛡️", "☁️", "📡", "⛓️", "🌐",
    "📶", "⚡", "⚙️", "🏗️", "🧪", "🚗", "✈️", "🧬",
    "🔬", "💻", "🖥️", "📊", "🤖", "🏛️", "🗺️", "🎨",
    "💊", "⚛️", "🧪", "➗", "🧬", "💼", "📈", "📚"
];

// Colors used for groups, cards and year sections
const GC = [
    "#6366f1",
    "#f59e0b",
    "#10b981",
    "#ec4899",
    "#0ea5e9",
    "#d946ef",
    "#f97316"
];

const YC = [
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ec4899"
];

// Options shown after a student completes a roadmap
const E2 = [
    "Campus placement or off-campus jobs",
    "Higher studies (M.Sc, MCA, M.Des, M.Pharm, MBA...)",
    "Study abroad",
    "Competitive and government exams",
    "Startup or freelancing"
];

const T = [
    "Foundation",
    "Core basics",
    "Specialize & intern",
    "Placement ready"
];

const C = [
    "Join a club or community",
    "Create LinkedIn and GitHub profiles",
    "Prepare your resume and practice aptitude",
    "Decide: job, GATE, MS, MBA or government exams"
];

const E = [
    "Campus placement or off-campus jobs",
    "GATE, then M.Tech or PSU jobs",
    "MS abroad (GRE, IELTS/TOEFL)",
    "MBA (CAT, MAT)",
    "Government exams (SSC JE, UPSC, state PSC)",
    "Startup or freelancing"
];

// Degree selection cards
const CO = [
    ["B.Tech / B.E.", "⚙️", "Engineering", "#6366f1", -1],
    ["B.Sc", "🔬", "Science", "#10b981", -2, [16, 25, 26, 27, 28]],
    ["BCA", "💻", "Computer Applications", "#3b82f6", 17],
    ["B.Sc Computer Science", "🖥️", "Computer Science", "#8b5cf6", 18],
    ["B.Sc Data Science", "📊", "Data Science", "#f59e0b", 19],
    ["B.Sc AI & ML", "🤖", "Artificial Intelligence & ML", "#ec4899", 20],
    ["B.Arch", "🏛️", "Architecture", "#ef4444", 21],
    ["B.Plan", "🗺️", "Planning", "#14b8a6", 22],
    ["B.Des", "🎨", "Design", "#d946ef", 23],
    ["B.Pharm", "💊", "Pharmacy", "#0ea5e9", 24],
    ["B.Com", "💼", "Commerce", "#f97316", 29],
    ["BBA", "📈", "Business Administration", "#84cc16", 30],
    ["BA", "📚", "Arts & Humanities", "#a855f7", 31]
];

const SC = [16, 25, 26, 27, 28];

// Returns the heading shown for each year of a roadmap.
function getYearTitle(yearCount, yearIndex) {
    if (yearCount === 4) {
        return T[yearIndex];
    }

    if (yearCount === 3) {
        return ["Foundation", "Skills & projects", "Career ready"][yearIndex];
    }

    return [
        "Foundation",
        "Core basics",
        "Design studio",
        "Internship & practice",
        "Career ready"
    ][yearIndex];
}

// Short names kept for compatibility with the existing page code.
const TT = getYearTitle;

// Roadmap entries: each row contains the course name, group, roles and yearly steps.
const B = [
["CSE",0,"Software Developer · Backend Engineer · Full-Stack Engineer · SDET","Learn C and Python basics|Strengthen maths and logic|Set up GitHub","Master DSA (arrays to graphs)|Learn DBMS, OS and Networks|Build 2 mini projects with SQL","Learn web dev (React + Node or Java Spring)|Do a summer internship|Solve 150+ coding problems","Build a full-stack capstone|Revise CS fundamentals and system design basics|Attend mock interviews and campus drives"],
["CSE: AI & ML",0,"ML Engineer · AI Engineer · Data Scientist","Learn Python and maths basics|Refresh linear algebra and probability|Write small data scripts","NumPy, Pandas, Matplotlib|Learn DSA basics and SQL|Take an intro ML course","scikit-learn, then PyTorch or TensorFlow|Deep learning, NLP or computer vision|Internship and 2 Kaggle projects","Build and deploy an end-to-end ML project|Learn GenAI and LLM tools|Practice ML interview questions"],
["CSE: Data Science",0,"Data Analyst · Data Scientist · Data Engineer","Python and statistics basics|Get good at Excel|Follow data stories online","SQL, Pandas and visualization|Probability and statistics|Analyse public datasets","Power BI or Tableau|Machine learning basics|Analyst internship and portfolio","Capstone with a dashboard and a model|Learn Spark and cloud basics|Practice SQL and case-study interviews"],
["CSE: Cyber Security",0,"SOC Analyst · Security Analyst · Penetration Tester","Learn Python and C|Computer basics and Linux|Watch intro to security talks","Networking (TCP/IP, DNS, HTTP)|Linux command line in depth|Cryptography basics","Wireshark, Burp Suite, Kali Linux|Practice on TryHackMe or HackTheBox|CEH or Security+ and an internship","Build a security project or CTF record|SOC and incident response basics|Apply for analyst roles"],
["CSE: Cloud & DevOps",0,"Cloud Engineer · DevOps Engineer · Site Reliability Engineer","Python and Linux basics|Learn how the internet works|Git basics","Networking and OS concepts|Shell scripting|Deploy a simple app","AWS or Azure fundamentals and certification|Docker and Kubernetes|CI/CD with GitHub Actions","Terraform and monitoring|Build a full CI/CD project|Apply for cloud and DevOps roles"],
["CSE: IoT",0,"IoT Engineer · Embedded Developer","C programming basics|Basic electronics|Arduino starter projects","Embedded C and sensors|Raspberry Pi and Python|Networking basics","MQTT and cloud IoT platforms|Build a smart-device project|Internship or hackathon","Capstone IoT system with dashboard|Learn RTOS basics|Apply for IoT and embedded roles"],
["CSE: Blockchain",0,"Blockchain Developer · Smart Contract Developer","Programming basics (JS or Python)|Maths for cryptography|Learn how blockchain works","DSA and hashing|Web development basics|Ethereum concepts","Solidity and smart contracts|Hardhat and Web3.js|Hackathon and 2 dApps","Deploy a dApp on a testnet|Learn smart contract security|Apply for Web3 roles"],
["IT",0,"Web Developer · System Analyst · Network Engineer · Business Analyst","C or Python basics|Maths and logic|Set up GitHub","Java or Python with DSA|DBMS and SQL|Basic web development","Full-stack web development|Networking and cloud basics|Internship and 150 coding problems","Capstone web project|Business analysis and testing basics|Mock interviews and campus drives"],
["ECE",1,"VLSI Engineer · Embedded Engineer · Hardware Engineer · Telecom Engineer","Basic electronics and circuits|C programming|Maths (Laplace, Fourier intro)","Analog and digital electronics|Signals and systems|Arduino or Proteus projects","Choose: VLSI or Embedded|Verilog with Xilinx, or Embedded C with ARM|Internship and start GATE prep","Final-year hardware or embedded project|Interview prep: digital, analog, C|Apply to core firms or take GATE"],
["EEE",1,"Electrical Engineer · Power Systems Engineer · Automation Engineer","Circuits and maths basics|C or Python basics|Intro to MATLAB","Machines and power systems|Control systems basics|Simulate in MATLAB/Simulink","PLC/SCADA or power electronics|AutoCAD Electrical|Industry internship and GATE prep","Project on renewable energy or automation|Interview prep on core subjects|Apply to core firms, PSUs, or IT with coding"],
["Mechanical",2,"Design Engineer · Manufacturing Engineer · Maintenance Engineer · Quality Engineer","Engineering drawing basics|Learn AutoCAD|Maths and physics basics","Thermodynamics and mechanics|SolidWorks or CATIA|Workshop practice","ANSYS and CNC/CAM basics|Six Sigma or CAD/CAM certification|Industrial internship","Design or manufacturing capstone|Learn Python or MATLAB basics|Apply to core firms or PSUs via GATE"],
["Civil",2,"Site Engineer · Structural Designer · Quantity Surveyor · Planning Engineer","Engineering drawing and AutoCAD|Maths and mechanics basics|Visit a construction site","Surveying and structures|STAAD Pro or Revit|Concrete lab work","ETABS, Primavera or MS Project|Site internship|Start GATE or SSC JE prep","Structural or planning capstone|Practice quantity estimation|Apply to construction firms, PWD, government exams"],
["Chemical",2,"Process Engineer · Production Engineer · Safety Engineer","Chemistry and maths basics|Learn basic programming|Read about industrial plants","Fluid mechanics and heat transfer|MATLAB basics|Plant visit","Aspen HYSYS process simulation|Process safety basics|Industry internship","Process design capstone|GATE prep for PSUs|Apply to oil and gas, pharma, PSUs"],
["Automobile",2,"Design Engineer · EV Engineer · R&D Engineer","Drawing and CAD basics|Physics and maths|Follow EV news","Thermodynamics and vehicle mechanics|SolidWorks or CATIA|Join a Baja or Formula team","EV, battery and CAN basics|Embedded systems intro|Automotive internship","Vehicle or EV capstone|Interview prep on engines and design|Apply to OEMs and EV firms"],
["Aerospace",2,"Aerospace Design Engineer · CFD Analyst · Propulsion Engineer","Strong maths and physics basics|Learn CAD|Learn flight basics","Aerodynamics and propulsion|CATIA and MATLAB|Build a small drone or model","ANSYS Fluent (CFD)|Try internships at HAL, ISRO or DRDO|Start GATE prep","Aerospace design capstone|Prepare for GATE or M.Tech|Apply to HAL, ISRO, DRDO, aerospace firms"],
["Biotechnology",3,"Research Associate · Bioinformatics Analyst · QC Analyst · Clinical Research","Biology and chemistry basics|Learn Python basics|Read research articles","Biochemistry and molecular biology|Lab techniques|Learn biostatistics","Bioinformatics (Python or R)|Research or industry internship|Prepare for GATE BT or GRE","Research-based final project|Present or publish a paper|Apply to pharma, QC, or M.Tech/MS"],
["B.Sc General",4,"Lab Scientist · Research Assistant · Teacher · Data Analyst · Civil Services Aspirant","Pick your major (Physics, Chemistry, Maths or Biology)|Build strong fundamentals in your subjects|Learn Excel and basic Python","Learn lab skills and scientific writing|Do a mini research project|Start preparing for JAM or CUET-PG","Do a final-year project or lab internship|Apply for M.Sc, JAM or CSIR NET|Explore jobs in research, teaching, analytics or government exams"],
["BCA",0,"Software Developer · Web Developer · App Developer · Data Analyst · Support Engineer","Learn C and Python basics|Strengthen maths and logic|Set up GitHub","Learn DSA, DBMS and OOPs|Build web projects (HTML, CSS, JS)|Learn Java or Python in depth","Do an internship and a full-stack project|Prepare for MCA (NIMCET) or MBA|Practice coding and interviews for developer jobs"],
["B.Sc Computer Science",0,"Software Developer · Web Developer · System Analyst · Tester · Data Analyst","Learn C, Python and maths for computing|Digital logic and computer basics|Set up GitHub","DSA, DBMS, OS and Networks|Build 2 projects (web or Python)|Start solving coding problems","Internship and capstone project|Prepare for M.Sc CS, MCA or jobs|Mock interviews and applications"],
["B.Sc Data Science",0,"Data Analyst · Data Scientist · BI Developer · Data Engineer","Python, statistics and maths basics|Get good at Excel|Follow data blogs","SQL, Pandas and visualization|Probability and machine learning basics|Analyse 3 public datasets on Kaggle","Power BI or Tableau and a portfolio|Internship and a capstone ML project|Apply for analyst roles or M.Sc Data Science"],
["B.Sc AI & ML",0,"ML Engineer · AI Developer · Data Scientist · NLP Engineer","Python, linear algebra and probability|Programming logic and DSA basics|Small Python projects","NumPy, Pandas, scikit-learn|Machine learning and deep learning basics|2 Kaggle projects","PyTorch or TensorFlow, NLP or vision|Build and deploy an AI project (GenAI or LLM)|Internship, then jobs or M.Sc/M.Tech in AI"],
["B.Arch",5,"Architect · Urban Designer · Interior Designer · Landscape Architect · BIM Specialist","Learn sketching and basic drawing|Study design basics and architectural history|Start a design sketchbook","Learn AutoCAD and SketchUp|Building materials and construction|Build studio models","Learn Revit and Rhino|Structures and sustainable design|Join design competitions","Do the 6-month practical training under an architect|Build a strong portfolio|Learn visualization (Lumion, V-Ray)","Complete your thesis project|Register with the Council of Architecture (COA)|Apply to firms, or M.Arch, MBA or study abroad"],
["B.Plan",5,"Urban Planner · Town Planner · Transport Planner · GIS Analyst · Environmental Planner","Learn drawing basics and planning concepts|Read about cities and policies|Basic maths and statistics","Learn AutoCAD and basic GIS|Surveying and urban studies|Do a neighbourhood study","ArcGIS or QGIS and remote sensing|Transport and housing planning|Internship at a planning office or municipality","Final planning studio project|Prepare a portfolio and GATE (Planning) or M.Plan|Apply for town planning jobs or government exams"],
["B.Des",5,"UI/UX Designer · Product Designer · Graphic Designer · Animator · Design Researcher","Learn sketching and design basics|Color, typography and layout|Start a portfolio (Behance)","Learn Figma and Adobe tools|Design 3 small projects|Study user research basics","Choose a focus (UX, product, graphic or animation)|Internship at a studio|Join design contests","Build a strong portfolio with case studies|Final diploma project|Prepare for M.Des (CEED, UCEED) or apply for jobs"],
["B.Pharm",3,"Pharmacist · Drug Safety Associate · QC/QA Analyst · Clinical Research Associate · Medical Representative","Learn pharmaceutics, anatomy and chemistry basics|Practice lab safety|Make clear study notes","Pharmacology and medicinal chemistry|Lab techniques|Read about drug regulation","Choose: industry, hospital or research|Do industrial training or an internship|Start GPAT preparation","Final-year project|Register with the State Pharmacy Council|Apply to pharma companies, hospitals, or GPAT for M.Pharm"],
["B.Sc Physics",4,"Research Assistant · Lab Technician · Teacher · Data Analyst · Scientist (after M.Sc/PhD)","Build strong maths: calculus and vectors|Classical mechanics and electricity basics|Learn Python for physics","Quantum mechanics and optics|Lab experiments and error analysis|Simulations in Python or MATLAB","Final-year research project|Prepare for JAM, CSIR NET or GATE|Apply for M.Sc, research labs (ISRO, BARC) or teaching"],
["B.Sc Chemistry",4,"Lab Chemist · QC Analyst · Research Assistant · Teacher · Process Chemist","Basics of organic, inorganic and physical chemistry|Lab safety and titration skills|Maths refresh","Spectroscopy and analytical techniques|Advanced lab practicals|Learn ChemDraw and basic Python","Final-year project or industry training|Prepare for JAM or CSIR NET|Apply for M.Sc, pharma or chemical jobs, or research labs"],
["B.Sc Mathematics",4,"Data Analyst · Actuarial Analyst · Teacher · Research Scholar · Banking Officer","Calculus, algebra and logic|Learn Python or R|Solve problems daily","Real analysis, differential equations and statistics|Learn SQL and data analysis|Try actuarial or data science courses","Final-year project|Prepare for JAM, actuarial exams (IAI) or bank exams|Apply for M.Sc, analytics jobs or teaching"],
["B.Sc Life Sciences",4,"Research Assistant · Lab Technician · Clinical Research Associate · Bioinformatics Analyst · Teacher","Cell biology, botany and zoology basics|Chemistry basics|Learn lab safety","Genetics, microbiology and biochemistry|Lab techniques and biostatistics|Learn basic Python or R","Final-year research project|Prepare for JAM, GATE-BT or CSIR NET|Apply for M.Sc, pharma and biotech jobs, or research"],
["B.Com",6,"Accountant · Financial Analyst · Tax Consultant · Auditor · Banking Officer","Learn accounting and business basics|Get good at Excel|Improve English communication","Learn Tally and GST basics|Costing, taxation and business law|Do a small internship or finance project","Choose a path: CA, CMA, CFA, MBA or banking|Learn financial modelling and Power BI|Apply for jobs or start bank exam preparation"],
["BBA",6,"Business Analyst · Marketing Executive · HR Executive · Operations Executive · Management Trainee","Learn management and marketing basics|Improve communication and presentation skills|Learn Excel","Choose a focus: marketing, finance, HR or analytics|Do a live business project|Learn digital marketing or data basics","Complete a summer internship|Prepare for MBA (CAT, CMAT, GMAT) or jobs|Build a resume and practice group discussions and interviews"],
["BA",6,"Teacher · Civil Services Aspirant · Content Writer · Journalist · Social Worker","Choose your subjects (History, Political Science, English, Economics...)|Read widely and build writing skills|Follow current affairs","Go deeper into your major subject|Learn a skill (digital marketing, languages or data basics)|Join debates, clubs or volunteering","Prepare for UPSC, SSC, state exams or M.A. entrance|Build a writing portfolio or take an internship|Explore B.Ed, journalism, law or MBA options"]
];


// Free learning resources for each course group
const R=[[["roadmap.sh","https://roadmap.sh"],["freeCodeCamp","https://www.freecodecamp.org"],["LeetCode","https://leetcode.com"],["Kaggle","https://www.kaggle.com"]],[["NPTEL","https://nptel.ac.in"],["Arduino Docs","https://docs.arduino.cc"],["Tinkercad","https://www.tinkercad.com"]],[["NPTEL","https://nptel.ac.in"],["SWAYAM","https://swayam.gov.in"],["GrabCAD","https://grabcad.com"]],[["NPTEL","https://nptel.ac.in"],["NCBI","https://www.ncbi.nlm.nih.gov"],["Coursera","https://www.coursera.org"]],[["NPTEL","https://nptel.ac.in"],["SWAYAM","https://swayam.gov.in"],["Khan Academy","https://www.khanacademy.org"]],[["ArchDaily","https://www.archdaily.com"],["Behance","https://www.behance.net"],["SketchUp","https://www.sketchup.com"]],[["SWAYAM","https://swayam.gov.in"],["Coursera","https://www.coursera.org"],["Khan Academy","https://www.khanacademy.org"]]];
