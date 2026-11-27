export const profile = {
  name: "Zafarullah",
  title: "Undergraduate AI Researcher",
  subtitle: "Computer Vision · Conversational AI · Robotics & Embodied AI",
  location: "Multan, Pakistan",
  email: "zafarullaharshad2@gmail.com",
  phone: "+92 306 7872856",
  linkedin: "https://linkedin.com/in/zafar-ullahv",
  github: "https://github.com/zafaraieng",
  portfolioUrl: "https://zafaraieng.github.io/",
  cvUrl: "/Zafarullah_CV.pdf",
  photo: "/profile.jpeg",
  opportunityStatement: "Exploring funded graduate research opportunities — Fall 2027",
  lastUpdated: "November 26, 2026",
}

export const heroIntro =
  "I am an undergraduate Artificial Intelligence student at Emerson University Multan, Pakistan. My work so far spans AI-generated image detection research, research software engineering for conversational-memory evaluation (NOVA-Mem), and applied LLM systems. I am now building toward robotics and embodied AI: alongside my coursework, I am systematically studying current research on dexterous manipulation, learning from human demonstration, and vision-language-action systems — my research reading log is below."
export const researchInterestTiers = [
  {
    tier: "Primary Research Experience",
    tierNote: "Areas where I have designed and run my own experiments",
    icon: "Eye",
    title: "Computer Vision & Deep Learning",
    description:
      "My main research direction to date: detecting AI-generated images with lightweight CNN architectures, built on transfer learning and careful evaluation practice.",
    tags: [
      "AI-generated image detection",
      "CNN architectures",
      "Transfer learning",
      "Image classification",
      "Model optimization & evaluation",
    ],
  },
  {
    tier: "Applied Project Experience",
    tierNote: "Systems I have engineered end-to-end in the LLM applications space",
    icon: "MessageSquare",
    title: "Conversational AI & LLM Systems",
    description:
      "Practical engineering of retrieval-augmented, locally deployable conversational systems — the applied foundation I bring to LLM research questions.",
    tags: [
      "RAG",
      "FAISS & ChromaDB",
      "Local LLM inference (Ollama)",
      "Whisper ASR",
      "Coqui TTS",
      "Context-aware interaction",
    ],
  },
  {
    tier: "Developing Research Interests",
    tierNote: "Directions I intend to grow into during graduate research",
    icon: "Telescope",
    title: "Efficient AI & Intelligent Systems",
    description:
      "Where I want to go next: making AI systems efficient enough to run reliably in the real world, and studying how intelligence scales into physical, embodied settings.",
    tags: [
      "Efficient inference",
      "Scalable AI infrastructure",
      "Resource-efficient models",
      "Robotics & embodied intelligence",
    ],
  },
]

export const education = {
  institution: "Emerson University Multan",
  location: "Multan, Pakistan",
  degree: "B.S. in Artificial Intelligence",
  period: "Aug 2023 — Expected 2027",
  cgpa: "3.22 / 4.00",
  coursework: [
    "Data Structures & Algorithms",
    "Computer Vision",
    "Operating Systems",
    "Computer Organization",
    "Computer Networks",
    "Parallel & Distributed Computing",
    "Probability & Statistics",
    "Linear Algebra",
    "Robotics Simulation",
    "Swarm Intelligence",
    "Multivariable Calculus",
  ],
  notes: [
    "Coursework project: plant disease classification with ResNet-9 (PyTorch)",
    "Final Year Project (NOVA) supervised by Dr. Sohail Raza — see Research",
  ],
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Full professional proficiency — degree program taught in English" },
    { name: "Chinese (Mandarin)", level: "Studying as foreign-language coursework at university" },
  ],
}

export const onlineCoursework = {
  institution: "Stanford University (Online)",
  program: "Code in Place — CS106A: Programming Methodology · Probability of AI (PAI26)",
  status: "In progress",
  details: [
    "Code in Place: Stanford's online introductory programming course based on CS106A",
    "Probability of AI (PAI26): probability foundations tailored to artificial intelligence",
  ],
}

export const research = [
  {
    id: "nova-mem",
    title: "NOVA-Mem — Resource-Aware Evaluation Framework for Conversational Memory Strategies",
    role: "Research Software — creator and sole maintainer",
    period: "2026 — ongoing",
    status: "In Progress",
    tech: ["Python", "LongMemEval", "BM25 (rank-bm25)", "Sentence Transformers", "Cross-encoder reranking", "YAML config profiles", "pytest / GitHub Actions"],
    caseStudy: {
      motivation:
        "Conversational assistants accumulate long histories, and every memory strategy — none, full context, retrieval, reranking, structured memory — trades answer quality against inference cost, storage, and retrieval latency. These design choices are usually made anecdotally. NOVA-Mem exists to make them measurable, inspectable, and reproducible.",
      researchQuestion:
        "Under fixed resource constraints, how do conversational memory strategies compare on answer quality, inference cost, and retrieval latency on a standardized long-term memory benchmark?",
      systemDescription:
        "NOVA-Mem is a Python research framework built around a cleaned version of the LongMemEval benchmark. A modular package (data, models, memory, retrieval, reranking, evaluation, metrics, analysis) supports memory strategies A (no memory), B (full context), Oracle (evidence-only reference), C (retrieval-augmented: BM25, dense, hybrid score fusion, reciprocal-rank fusion), D (retrieval + cross-encoder reranking), and E (structured memory with fact extraction and supersession). Experiment configuration is declarative (YAML profiles), with generation caching, dataset fingerprints, and unit/regression/prompt-parity tests under continuous integration.",
      status: {
        implemented: [
          "Full modular package: data loading, inference clients, memory interfaces, retrieval, reranking, evaluation, metrics, analysis",
          "Retrieval stack: BM25, dense embeddings, hybrid score fusion, and reciprocal-rank fusion at session granularity",
          "Cross-encoder reranking adapters and structured-memory (E-v1) pilot implementation",
          "Scored dev-100 conditions: A baseline, Oracle, and C-BM25 (100/100 judged runs each)",
        ],
        inDevelopment: [
          "C-Dense dev runs (partially generated), C-Hybrid, C-RRF, and D-BM25 rerank conditions",
          "Structured memory E-v2 and the planned human-review gate",
          "Held-out Test-400 unlock (currently locked behind review criteria)",
        ],
      },
      statusCaveat:
        "Research status, as documented in the repository: the A, Oracle, and C-BM25 dev-100 conditions are scored so far, on the ZAI glm-4-plus backend; the frozen Ollama/Qwen protocol runs are recorded separately in the repository. CI verifies the full pipeline.",
      links: {
        github: "https://github.com/zafaraieng/nova-mem",
        demo: null as string | null,
        note: "Live repository — README, architecture and research-status docs are maintained alongside the code",
      },
    },
  },
  {
    id: "cifake",
    title: "AI-Generated Image Detection on CIFake",
    role: "Independent Research Project",
    period: "May 2026",
    status: "Completed — write-up in progress",
    tech: ["Python", "PyTorch", "MobileNetV2", "React", "Flask"],
    caseStudy: {
      motivation:
        "Synthetic images are becoming indistinguishable from photographs, eroding trust in visual media. Practical detection tools need to run on modest hardware, not just on server-class GPUs — which motivates studying lightweight detectors rather than only large ones.",
      researchQuestion:
        "Can a lightweight CNN, fine-tuned with a structured transfer-learning protocol, reach detection accuracy competitive with much heavier architectures on AI-generated image classification?",
      dataset:
        "CIFake — a public benchmark of 120,000 images (60,000 real CIFAR-10 photographs and 60,000 images generated with Stable Diffusion v1.4), with a published 100K/20K train-test split. All reported numbers are on the 20,000-image held-out test split.",
      architecture:
        "MobileNetV2 (~3.5M parameters, standard published size) selected as the detection backbone — an efficiency-oriented CNN using inverted residuals and linear bottlenecks, chosen so that a positive result would imply deployability on constrained devices.",
      methodology:
        "Two-phase transfer learning: first fine-tuning the classification head with the backbone frozen, then unfreezing for full-network fine-tuning. Mixup augmentation during training to improve robustness, and test-time augmentation (TTA) at inference.",
      experimentalSetup:
        "Implemented in PyTorch. Evaluation metrics: accuracy, precision, recall, F1, and ROC-AUC, computed on the held-out test split. Published results for CNNDetect (93.1%) and UnivFD (93.8%) are cited as reference points; evaluation protocols differ across these studies, so they are context — not direct, like-for-like comparisons.",
      resultsQualification:
        "Preliminary internal results — not peer-reviewed or externally validated.",
      results: [
        { value: "~98%", label: "Accuracy", note: "20K held-out test images" },
        { value: "0.997", label: "ROC-AUC", note: "with precision, recall, F1 reported" },
      ],
      efficiency:
        "≈7× fewer parameters than ResNet-50 (~3.5M vs ~25.6M, standard published architecture sizes; 25.56M / 3.50M = 7.29×). Parameter count is the comparison measure; file-size and FLOPs were not measured in this study.",
      limitations: [
        "CIFake images are CIFAR-resolution (32×32); extension to high-resolution imagery is planned future work",
        "Single dataset and generator family (Stable Diffusion v1.4); cross-generator generalization is the planned next evaluation",
        "Results are from the internal evaluation protocol; peer-review and third-party reproduction are future steps",
      ],
      futureWork: [
        "Cross-dataset and cross-generator evaluation",
        "Extension to higher-resolution imagery and newer generators",
        "Formal write-up and open-sourcing of the evaluation protocol",
      ],
      links: {
        github: "https://github.com/zafaraieng",
        demo: null as string | null,
        note: "Repository and live demo links will be added when the write-up is released",
      },
    },
  },
  {
    id: "nova",
    title: "NOVA — AI Companion Intelligence Framework",
    role: "Final Year Project — 3-person team, supervised",
    period: "Ongoing (22-week experimental roadmap)",
    status: "In Progress",
    supervisor: "Dr. Sohail Raza, Emerson University Multan",
    tech: ["Ollama (Phi-3.5)", "ChromaDB / FAISS", "PostgreSQL", "Whisper", "Coqui TTS", "Qwen (local)"],
    caseStudy: {
      motivation:
        "Most conversational AI products depend on cloud services, which limits privacy, adds latency and cost, and makes research experimentation dependent on external APIs. A locally deployable companion demonstrates that the full pipeline — retrieval, generation, speech, and affect signals — can run on consumer hardware.",
      researchQuestion:
        "How far can a retrieval-augmented, locally hosted conversational companion go on consumer-grade hardware, and what quality/latency trade-offs arise at each stage of the pipeline?",
      systemDescription:
        "NOVA is a locally deployable conversational AI companion. It integrates retrieval-augmented generation (ChromaDB/FAISS vector stores), local LLM inference via Ollama (Phi-3.5), speech interfaces (Whisper ASR for input, Coqui TTS for output), and affect-aware interaction through local emotion detection (Qwen). Data persistence uses PostgreSQL.",
      status: {
        implemented: [
          "RAG pipeline with ChromaDB/FAISS vector retrieval",
          "Local LLM inference via Ollama (Phi-3.5) — offline-capable",
          "Speech interfaces: Whisper ASR input and Coqui TTS output",
        ],
        inDevelopment: [
          "Affect-aware interaction layer with local emotion detection (Qwen)",
          "Evaluation suite for response quality and end-to-end latency",
        ],
      },
      team: "Three-person team under the supervision of Dr. Sohail Raza, following a structured 22-week experimental roadmap. Individual contribution split is being documented for the final report.",
      plannedEvaluation:
        "Planned measurable evaluation covers retrieval grounding (citation correctness), response quality under a defined rubric, end-to-end latency per pipeline stage, and resource usage on the target hardware.",
      links: {
        github: null as string | null,
        demo: null as string | null,
        note: "Project is under active development; links will be published with the final report",
      },
    },
  },
]

export const industry = {
  company: "Bucha-Soft",
  role: "Software Developer",
  period: "Jun 2025 — Mar 2026",
  location: "Multan, Pakistan",
  responsibilities: [
    {
      title: "PRA tax compliance integration",
      detail:
        "Integrated Punjab Revenue Authority tax compliance into a restaurant management system: automated tax calculation for cash and credit transactions and generated QR-coded, print-ready invoices. UI and bug-fix work reduced reported issues by roughly 40% over the engagement.",
    },
    {
      title: "Smart parking system (end-to-end)",
      detail:
        "Designed and built a smart parking system from the ground up — OpenCV-based real-time vehicle capture, automated ticketing, and RFID entry/exit control — reducing manual gate processing time by more than half.",
    },
    {
      title: "Linux server hosting & deployment",
      detail:
        "Owned hosting and deployment: server configuration, SSL setup, and database maintenance, sustaining 99.5% uptime over the employment period (Jun 2025 – Mar 2026).",
    },
  ],
}

export const projects = [
  {
    title: "Smart Parking System",
    context: "Industry · Bucha-Soft",
    period: "2025 – 2026",
    tech: ["OpenCV", "Python", "RFID hardware", "Linux"],
    problem:
      "Manual vehicle entry/exit processing at parking gates was slow and error-prone, requiring staff on-site for every vehicle.",
    role: "Sole developer of the end-to-end system within the company's product line.",
    contribution:
      "Built the computer-vision capture pipeline, the automated ticketing flow, and the RFID entry/exit control integration.",
    architecture:
      "OpenCV real-time vehicle capture feeding an automated ticketing backend; RFID readers gate physical entry/exit; deployed on the company's Linux servers.",
    challenges: [
      "Reliable vehicle capture under varying lighting and camera angles",
      "Keeping the CV loop fast enough to avoid delaying gate operation",
      "Integrating physical RFID hardware with the software ticketing state machine",
    ],
    outcome:
      "Deployed as a working system; manual gate processing time reduced by more than half.",
    link: null as string | null,
  },
  {
    title: "ARIA — AI Recruitment Intelligence Agent",
    context: "Google AI Hackathon",
    period: "2026",
    tech: ["React", "Gemini 2.0 Flash Live API", "WebSocket", "Web Speech"],
    problem:
      "Recruitment screening conversations are repetitive for candidates and screeners alike; a voice-first agent can make structured screening conversational.",
    role: "Built the application as a hackathon entry.",
    contribution:
      "Implemented the real-time voice pipeline end-to-end, migrated the LLM backend from Claude to Gemini 2.0 Flash, and added Google Search grounding plus a self-serve API-key setup flow for new users.",
    architecture:
      "React frontend connected to the Gemini 2.0 Flash Live API over WebSocket for bidirectional audio streaming, with grounding queries and a key-onboarding flow built into the client.",
    challenges: [
      "Managing bidirectional WebSocket audio streaming state in the browser",
      "Keeping conversational latency low while streaming responses",
      "Designing an API-key setup flow so testers could onboard without manual setup",
    ],
    outcome:
      "A working real-time voice agent with grounded answers and a smooth first-run experience.",
    link: null as string | null,
  },
  {
    title: "Aurixon — Multi-Platform Publishing & AI Optimization",
    context: "Independent project",
    period: "Feb 2025 — Jul 2025",
    tech: ["MERN stack", "OpenAI API", "Gemini API", "Platform APIs"],
    problem:
      "Creators publishing across YouTube, Instagram, Facebook, and TikTok must reformat and re-write metadata manually for each platform.",
    role: "Designed and built the full-stack product.",
    contribution:
      "Built the creator dashboard and the four platform integrations, plus the AI metadata pipeline (title/description generation informed by a live news & trends API).",
    architecture:
      "MERN dashboard orchestrating official platform APIs — YouTube, Instagram, and Facebook via their publishing APIs, and TikTok through its draft/sandbox workflow (TikTok's API does not support direct automated publishing). OpenAI/Gemini generate keyword-aware, trend-informed metadata.",
    challenges: [
      "Four different platform API auth flows and publishing models in one product",
      "TikTok's draft/sandbox constraints vs. direct publishing on other platforms",
      "Making AI-generated metadata trend-aware without breaking platform content rules",
    ],
    outcome:
      "A single dashboard publishing to all four platforms, with AI-optimized, trend-aware metadata.",
    link: null as string | null,
  },
  {
    title: "Clarity Cove — AI-Assisted Learning Platform",
    context: "Independent project",
    period: "Jun 2024 — Feb 2025",
    tech: ["MERN stack", "LLM API"],
    problem:
      "In my university I watched introverted friends hesitate to ask professors questions in person — shyness left real confusion unresolved. Students need both an authoritative answer and an immediately available explanation, while teachers cannot respond in real time.",
    role: "Full-stack developer.",
    contribution:
      "Built the MERN learning platform and integrated the AI answer pipeline alongside the teacher answer flow.",
    architecture:
      "MERN application where each student question can receive paired answers — one from a teacher and one from an AI assistant — presented side by side.",
    challenges: [
      "Designing the dual-answer UX so AI complements rather than replaces teachers",
      "Keeping AI responses appropriate for the learning context",
    ],
    outcome: "A working learning platform pairing teacher and AI answers for students.",
    link: null as string | null,
  },
  {
    title: "Plant Disease Classification",
    context: "Computer Vision coursework",
    period: "2024",
    tech: ["PyTorch", "ResNet-9"],
    problem:
      "Plant disease identification from leaf images requires consistent expert judgment that smallholder growers do not always have access to.",
    role: "Coursework project, individually implemented.",
    contribution:
      "Implemented the ResNet-9 classifier in PyTorch with a data augmentation pipeline focused on generalization.",
    architecture: "ResNet-9 CNN trained on plant leaf disease images with augmentation.",
    challenges: [
      "Preventing overfitting on a modest image set",
      "Choosing augmentations that preserve disease-relevant visual features",
    ],
    outcome:
      "Completed coursework classifier; the project seeded the transfer-learning practices later used in the CIFake research.",
    link: null as string | null,
  },
  {
    title: "Website Blocker — Chrome Extension",
    context: "Independent project",
    period: "Oct 2025",
    tech: ["Chrome Extension APIs", "JavaScript"],
    problem:
      "Existing site blockers rarely combine scheduled blocking with insight into where browsing time actually goes.",
    role: "Built the extension individually.",
    contribution:
      "Implemented scheduled website blocking and usage analytics in a Chrome extension.",
    architecture:
      "Chrome extension using blocking APIs on a user-defined schedule, with a local analytics view of browsing patterns.",
    challenges: [
      "Reliable enforcement across tabs within browser API constraints",
      "Presenting usage analytics without itself becoming a distraction",
    ],
    outcome: "A working extension with scheduled blocking and usage analytics.",
    link: null as string | null,
  },
]

export const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "C/C++", "JavaScript", "SQL", "Java"],
  },
  {
    title: "Machine Learning & Computer Vision",
    skills: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "OpenCV", "CNNs", "Transfer learning", "Albumentations", "Test-time augmentation", "NumPy", "pandas", "Matplotlib"],
  },
  {
    title: "LLM Applications",
    skills: ["RAG (FAISS, ChromaDB)", "Ollama", "OpenAI API", "Gemini API", "Whisper ASR", "Coqui TTS"],
  },
  {
    title: "Software Engineering",
    skills: ["React", "Node.js", "Express.js", "Flask", "REST APIs", "MongoDB", "PostgreSQL", "WebSocket"],
  },
  {
    title: "Systems & Tools",
    skills: ["Linux server administration", "Docker", "Git/GitHub", "Google Cloud Platform", "MATLAB", "Google Colab"],
  },
  {
    title: "Robotics",
    skills: ["ROS/ROS2", "Webots"],
  },
]

export const matlabCourseGroups = [
  {
    category: 'AI & Machine Learning',
    courses: [
      { name: 'Machine Learning Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=4f0e41e9-b53d-4232-9dea-be5c9a37694c', highlight: true },
      { name: 'Deep Learning Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=0fd8347c-103c-4d1e-ba5d-744f5f58fb53', highlight: true },
      { name: 'Reinforcement Learning Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=697d81f4-4eab-4188-97b3-3a901608be75', highlight: true },
    ],
  },
  {
    category: 'Vision & Image Processing',
    courses: [
      { name: 'Computer Vision Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=2bb068e8-fcf1-4581-a701-0b109293c9c5', highlight: true },
      { name: 'Image Processing Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=7c01d0f1-55f9-47c7-b330-3651c0999492' },
    ],
  },
  {
    category: 'Mathematics & Data',
    courses: [
      { name: 'Optimization Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=b417c230-c19d-47a3-912d-cac35b6fea87', highlight: true },
      { name: 'Curve Fitting Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=54d74c28-7442-4fce-89b6-5bb0b34a6e54' },
      { name: 'Statistics Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=2d6bb1c9-09ee-4fb7-9272-6cc49f79b1f7' },
    ],
  },
  {
    category: 'Programming & Development',
    courses: [
      { name: 'MATLAB Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=157a89df-ff79-4c84-a649-6aac5d35e522' },
      { name: 'Object-Oriented Programming Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=4127c455-897c-4b8d-900e-af1878bde92b' },
      { name: 'MATLAB Coder Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=e3405402-c402-4a96-b66e-229b7140817b' },
      { name: 'App Building Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=223a16d0-43a7-4596-b840-9bfe6b8ee361' },
    ],
  },
  {
    category: 'Simulation & Modeling',
    courses: [
      { name: 'Simulink Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=9d592712-0390-4dd2-a425-726ac5a9a82f' },
      { name: 'Simscape Onramp', url: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=465e5747-c454-48c5-ae0e-52cb71eac378' },
    ],
  },
]

export const matlabCount = 14

export const certificationCategories = [
  {
    category: "Online Coursework — In Progress",
    note: "Online coursework",
    items: [
      {
        title: "Stanford Code in Place — CS106A: Programming Methodology",
        issuer: "Stanford University (online)",
        period: "In progress",
        status: "in-progress" as const,
        certificateImage: null,
      },
      {
        title: "Probability of AI (PAI26)",
        issuer: "Stanford University (online)",
        period: "In progress",
        status: "in-progress" as const,
        certificateImage: null,
      },
    ],
  },
  {
    category: "Completed Certifications",
    items: [
      {
        title: "NAVTTC Certified AI Course (Machine Learning & Deep Learning)",
        issuer: "Skill Castle Institute",
        period: "May 2026",
        status: "completed" as const,
        certificateImage: null,
      },
      {
        title: "Model Context Protocol · Building with Claude API · AI Fluency for Builders",
        issuer: "Claude Academy",
        period: "2026",
        status: "completed" as const,
        certificateImage: null,
      },
    ],
  },
  {
    category: "Workshops & Webinars",
    items: [
      {
        title: "AI Tools For Smarter Research",
        issuer: "Qubit Dynamics · webinar",
        period: "Sep 2025",
        status: "completed" as const,
        certificateImage: "/certificates/qubit-research-tools.jpg",
      },
      {
        title: "No Code Power Tools and Agentic AI",
        issuer: "Qubit Dynamics · webinar",
        period: "Sep 2025",
        status: "completed" as const,
        certificateImage: "/certificates/qubit-agentic-ai.jpg",
      },
    ],
  },
]

export const leetcode = {
  username: "62LcPNG8hC",
  profileUrl: "https://leetcode.com/62LcPNG8hC/",
  totalSolved: 139,
  beatsPercent: 87,
  totalSubmissions: 189,
  acceptanceRate: 78.8,
  currentStreak: 90,
  verifiedOn: "November 20, 2026",
  progressImage: "/certificates/leetcode-progress-2026-11.png",
  badge: {
    title: "50 Days Badge 2026",
    description: "Solving problems 50+ days in 2026",
    image: "/certificates/leetcode-badge.jpg",
  },
  difficulties: [
    { level: "Easy", solved: 39, total: 900, color: "#00B8A9" },
    { level: "Medium", solved: 67, total: 2100, color: "#FFC01E" },
    { level: "Hard", solved: 33, total: 900, color: "#FF375F" },
  ],
}

export const calico = {
  name: "CALICO — California Informatics Competition",
  hostLine: "Biannual team programming contest hosted by students at UC Berkeley",
  website: "https://calico.cs.berkeley.edu/",
  description:
    "CALICO is a biannual, team-based programming contest hosted by students at UC Berkeley (a student group acting independently of the university), with problems designed to teach algorithms and build problem-solving skills. College teams compete alongside pre-college and independent teams.",
  cvWording:
    "Participant — CALICO (California Informatics Competition), a biannual team programming contest organized by students at UC Berkeley; solved algorithmic problems during the contest.",
  participation: {
    year: "2026",
    summary:
      "I competed with my team, solving algorithmic problems during the contest. The scoreboard below shows my team's row highlighted, with three problems solved for 13 points.",
    screenshot: "/certificates/calico-scoreboard.png",
    screenshotAlt:
      "CALICO contest scoreboard: my team's row (highlighted) shows three solved problems — at 33, 65, and 116 minutes — for 13 points.",
    caption:
      "Screenshot of the official CALICO scoreboard — my team's row highlighted, with three problems solved for 13 points.",
    note:
      "Recorded as contest participation. Edition: Fall 2026, held November 8, 2026 (awaiting final owner confirmation of the edition date).",
  },
}

export const researchReadings = {
  intro:
    "Papers and technical reports I have independently read and studied, focused on robotic manipulation, dexterous hands, human-to-robot motion transfer, computer vision, tactile sensing, and learning from human demonstrations. These are my reading notes with my own takeaways; titles, authors, and venues were verified against primary sources (arXiv and official project pages).",
  verifiedOn: "November 20, 2026",
  disclaimer:
    "Independent reading notes with personal takeaways, written to sharpen my own understanding of current robotics research.",
  papers: [
    {
      id: "hand-shadowing",
      title: "Vision-Based Hand Shadowing for Robotic Manipulation via Inverse Kinematics",
      authors: "Hendrik Chiche, Antoine Jamme, T. Rigoberto Martinez, Gabriel Gomes",
      affiliation: "UC Berkeley Fung Institute capstone with OMGrab Inc.",
      year: "2026",
      venue: "arXiv:2603.11383 · accepted to IEEE Access (2026)",
      link: "https://arxiv.org/abs/2603.11383",
      problem:
        "Teleoperating low-cost robot arms normally requires leader-arm hardware or trained policies. The authors ask whether a cheap, marker-free vision pipeline can instead shadow the human hand for data collection and deployment.",
      contribution:
        "An offline, zero-training hand-shadowing pipeline: an egocentric RGB-D camera mounted on 3D-printed glasses feeds MediaPipe 21-landmark hand detection; landmarks are deprojected to 3D and transformed into the robot frame, and a damped-least-squares IK solves the joints of a low-cost SO-ARM101 arm, with actions previewed in physics simulation before replay on the physical robot.",
      takeaway:
        "On a structured pick-and-place benchmark (150 episodes) the pipeline reached 86.7% ± 4.2% success, beating trained VLAs (SmolVLA 50%, pi0.5 40%, GR00T N1.5 35%) though ACT remained higher at 92%; mean IK position error was 36.4 mm, and EMA smoothing reduced hand jerk by 57–68%.",
      limitation:
        "Hand occlusion collapsed real-world (grocery/pharmacy) success to 9.3%, and the offline pipeline runs at only about 5 FPS.",
      relevance:
        "The reading closest to my current toolkit: it shows how off-the-shelf perception plus classical IK can replace expensive teleoperation hardware — and how sharply the sim-to-real gap bites when visibility degrades.",
    },
    {
      id: "oat",
      title: "Pose Retargeting from a Single RGB Camera: Optimization-Based Hand Pose Retargeting and Wrist Pose Estimation",
      authors: "Longrui Chen, Lipeng Chen, Kunpeng Yao, Mehmet Dogar",
      affiliation: "University of Leeds",
      year: "2026",
      venue: "IEEE ICRA 2026",
      link: "https://eprints.whiterose.ac.uk/id/eprint/238695/",
      problem:
        "Vision-based teleoperation needs the operator's hand pose, but existing systems either train extra neural networks or add hardware to recover the wrist — there was no open, general toolkit retargeting both hand and wrist pose from a single RGB camera.",
      contribution:
        "OAT combines off-the-shelf MediaPipe hand estimation with an optimization that infers wrist pose by matching 2D/3D hand joints, adds a hand-based camera-calibration refinement, and includes a grasp-stabilization mode that keeps the wrist static during grasp and release.",
      takeaway:
        "It is the fastest among compared vision-based teleoperation systems (~30 Hz on a standard laptop, ~50 Hz on desktop GPUs) and performs on par with a SpaceMouse on real pick-and-place, knife-handling, and stacking tasks; the calibration optimization reduced MediaPipe wrist-position error from 7.65 cm to 4.28 cm on Freihand.",
      limitation:
        "Accuracy inherits MediaPipe's failure modes — hands are detected in only ~15% of point-sparse Freihand views — and depth–focal-length ambiguity remains.",
      relevance:
        "A clean example of the perception-plus-classical-optimization pattern, and of treating camera calibration as a first-class system concern rather than an afterthought.",
    },
    {
      id: "dexemg",
      title: "DexEMG: Towards Dexterous Teleoperation System via EMG2Pose Generalization",
      authors: "Qianyou Zhao, Wenqiao Li, Chiyu Wang, Kaifeng Zhang",
      affiliation: "",
      year: "2026",
      venue: "arXiv:2603.05861",
      link: "https://arxiv.org/abs/2603.05861",
      problem:
        "Camera-based dexterous teleoperation needs line-of-sight and dedicated hardware, while exoskeleton rigs are bulky and restrict the operator. The paper explores muscle signals as a portable, vision-independent control channel for dexterous hands.",
      contribution:
        "The authors collected synchronized surface-EMG signals (8-channel gForce armband) and hand poses (Manus mocap glove), trained an EMG2Pose network that continuously regresses hand kinematics from muscle activity, and retarget the predictions in real time to a 22-DoF Sharpa Wave dexterous hand.",
      takeaway:
        "Pose estimation reached 0.09 rad MAE on grasping and 0.15 rad on in-hand rotation; teleoperation succeeded on 76% of trained-object, 66% of unseen-object, and 56% of cluttered-scene trials; long-horizon packaging reached 60% one-shot (80% with retry) and wiping 40% (70% with retry).",
      limitation:
        "Requires per-user calibration and provides no force feedback — the authors note sEMG lacks the signal-to-noise ratio for extreme tactile precision on fragile objects.",
      relevance:
        "An alternative sensing modality for the data-collection layer that dexterous-learning systems depend on, with a detailed trained/unseen/cluttered breakdown that is a model for how I want to report my own results.",
    },
    {
      id: "t-rex",
      title: "T-Rex: Tactile-Reactive Dexterous Manipulation",
      authors: "Dantong Niu, Zhuoyang Liu, Zekai Wang, et al. (34 authors)",
      affiliation: "UC Berkeley, NVIDIA, Stanford, and collaborators",
      year: "2026",
      venue: "arXiv:2606.17055 · open dataset and code",
      link: "https://arxiv.org/abs/2606.17055",
      problem:
        "Vision-language-action models for manipulation largely ignore touch or encode it statically, because diverse touch data is scarce, evaluation is unstandardized, and VLA architectures are not built for high-rate force signals — blocking agile, force-aware dexterity.",
      contribution:
        "A 100-hour touch-rich dataset (7,700+ trajectories, 200+ objects, 22 motor primitives, ~50 hours open-sourced) collected on a bimanual Dexmate Vega-1 robot with Sharpa Wave hands using reusable motor primitives, plus an asynchronous slow-fast Mixture-of-Transformers policy on a Qwen3-VL-2B backbone: slow action denoising (~5 Hz) with fast tactile refinement (~20 Hz) via cascaded flow matching, and a temporal tactile VQ-VAE encoder.",
      takeaway:
        "Across 12 tasks requiring delicate force control and deformable-object manipulation, tactile-reactive policies achieve over 30% higher average success than the strongest baseline.",
      limitation:
        "Deployment still requires a three-stage pipeline ending in task-specific post-training, and only about half of the dataset has been released, so generalization beyond the evaluated platform remains open.",
      relevance:
        "Directly shapes my view of vision-language-action systems: touch as a first-class, high-rate input, and asynchronous slow-fast architectures as a way to reconcile VLA reasoning with reactive control.",
    },
    {
      id: "gr-dexter",
      title: "GR-Dexter Technical Report",
      authors: "Ruoshi Wen, Guangzeng Chen, Zhongren Cui, et al. (ByteDance Seed)",
      affiliation: "ByteDance Seed",
      year: "2025",
      venue: "arXiv:2512.24210 · technical report",
      link: "https://arxiv.org/abs/2512.24210",
      problem:
        "Scaling VLA models from simple grippers to bimanual robots with high-DoF dexterous hands multiplies the action space, causes frequent hand–object occlusions, and sharply raises real-robot data collection cost.",
      contribution:
        "An integrated hardware–data–model framework: the compact 21-DoF ByteDexter V2 hand (linkage-driven, with tactile fingertip arrays) on a bimanual Franka rig; VR/glove teleoperation for data collection; and a 4B-parameter Mixture-of-Transformer VLA co-trained on teleoperated trajectories, reused GR-3 vision-language data, cross-embodiment datasets, and human VR trajectories.",
      takeaway:
        "Strong robustness to distribution shift: out-of-distribution-layout decluttering success of 0.89 versus 0.64 for a plain VLA; generalizable pick-and-place 0.93, holding 0.85 on unseen objects and 0.83 on unseen instructions.",
      limitation:
        "Ablations show the model without cross-embodiment data still grasps inaccurately on unseen objects, and the report does not include an explicit limitations section.",
      relevance:
        "A systems-level template for how hardware design, teleoperation data, and cross-embodiment pretraining compose into generalization — the perspective I want to bring to graduate research.",
    },
    {
      id: "egoscale",
      title: "EgoScale: Scaling Dexterous Manipulation with Diverse Egocentric Human Data",
      authors: "Ruijie Zheng, Dantong Niu, Yuqi Xie, et al. (NVIDIA GEAR)",
      affiliation: "NVIDIA GEAR lab",
      year: "2026",
      venue: "arXiv:2602.16710 · research.nvidia.com/labs/gear/egoscale",
      link: "https://arxiv.org/abs/2602.16710",
      problem:
        "Human behavior is the most scalable data source for physical intelligence, but it was unproven whether large-scale egocentric human video could support fine-grained, high-DoF dexterous manipulation rather than only constrained settings.",
      contribution:
        "A human-to-dexterous-manipulation transfer framework: a flow-based VLA (VLM backbone with a DiT action expert) using a shared wrist-level action representation and lightweight embodiment-specific adapters, trained in three stages — pre-training on egocentric human video, aligned human–robot mid-training, and task post-training.",
      takeaway:
        "Pre-training on 20,854 hours of action-labeled egocentric human video (over 20× prior efforts) yields a log-linear scaling law between human data scale and validation loss (R² = 0.9983) that tracks real-robot performance, a +54% average success gain over no pre-training across five 22-DoF dexterous tasks, one-shot task adaptation, and transfer to a lower-DoF Unitree G1 hand.",
      limitation:
        "Whether the scaling trend and one-shot adaptation hold beyond the evaluated tasks and embodiments is left open.",
      relevance:
        "The clearest evidence I have read that the human-video direction scales — and a concrete example of staged pre-training / mid-training / post-training design.",
    },
    {
      id: "egoaero",
      title: "EgoAERO: Learning Dexterous Manipulation from a Single Egocentric Video without Object Assets",
      authors: "Yichen Niu, Haoran Lv, Xinrui Zhang, et al.",
      affiliation: "",
      year: "2026",
      venue: "arXiv:2606.08057",
      link: "https://arxiv.org/abs/2606.08057",
      problem:
        "Egocentric RGB-D videos easily capture human dexterous demonstrations, but using them for robot learning normally requires object pose, geometry, and contact information that is missing — or assumes pre-scanned object assets (CAD models).",
      contribution:
        "Presented as the first framework that learns dexterous manipulation from a single egocentric RGB-D human demonstration without object assets: asset-free object tracking and reconstruction, ego-motion compensation, and adaptive contact optimization reconstruct contact-consistent hand–object trajectories, which two-stage residual learning converts into robot policies (simulation training, real-world execution). It also contributes an online quality-assessment mechanism and the EgoDex-R dataset of 4.3M RGB-D frames.",
      takeaway:
        "Simulation and real-world experiments show that single-demonstration dexterous manipulation is feasible, achieving downstream performance close to CAD-based reconstructions on HOI4D.",
      limitation:
        "Imperfect asset-free reconstructions remain a handling challenge (hence the online quality assessment), and rigid objects are assumed.",
      relevance:
        "Demonstrates that careful contact modeling can substitute for expensive object assets — a key step toward learning from casual human recordings.",
    },
    {
      id: "egocpt",
      title: "EgoCPT: Learning Dexterous Manipulation from a Single Ego-Centric Video with Contact-Aware Optimization",
      authors: "Zhixin Sun, Kairui Shi, Tianao Ren, et al.",
      affiliation: "Ant Group, University at Buffalo, Stanford",
      year: "2026",
      venue: "arXiv:2610.17572 · ego-cpt.github.io",
      link: "https://arxiv.org/abs/2610.17572",
      problem:
        "Egocentric human videos are abundant, but converting them into physically grounded robot trajectories is hard: the human-to-robot embodiment gap and noise in reconstructed hand poses break naive motion retargeting.",
      contribution:
        "A paradigm needing only one egocentric RGB video plus a reference hand-pose trajectory: contact-aware optimization iteratively samples contact candidates on the object, refines a 56-DoF bimanual hand pose, and allocates contact forces through Newton–Euler wrench matching; a residual RL policy (PPO in Isaac Sim, with gravity curriculum and domain randomization) then makes the trajectories robot-executable on a dual-arm Franka with Sharpa hands. Design motto: object motion is the goal; hand motion is only the reference.",
      takeaway:
        "Across five task families, the method reaches 67.3% success on noisy EgoDex hand-pose reconstructions (best baseline CHORD: 55.8%) and 92.0% on high-quality TACO mocap (best baseline SPIDER: 68.0%).",
      limitation:
        "Contact search is local and budgeted, rigid objects are assumed, and the pipeline depends on reconstructed hand-pose trajectories.",
      relevance:
        "Its robustness under noisy human demonstrations sets the bar for learning from casual human video — exactly the data regime several of my other readings target.",
    },
    {
      id: "do-as-i-do",
      title: "Do as I Do: Dexterous Manipulation Data from Everyday Human Videos",
      authors: "Bhawna Paliwal, Haritheja Etukuru, William Liang, et al.",
      affiliation: "UC Berkeley",
      year: "2026",
      venue: "arXiv:2606.19333 · do-as-i-do.com",
      link: "https://arxiv.org/abs/2606.19333",
      problem:
        "Everyday monocular RGB human videos are abundant, but estimating hand–object interactions from them and bridging the human-to-robot embodiment gap has blocked their use as scalable manipulation data.",
      contribution:
        "A reconstruction-plus-retargeting pipeline: HaWoR hand tracking, SAM 3 segmentation, MoGe depth, and a guided-diffusion object tracker built on SAM 3D recover hand–object motion from in-the-wild video; sampling-based, dynamics-aware retargeting (extending SPIDER with warm-up steps, force perturbation, and transition rewards) verified in MuJoCo; and an efficacy playbook that filters unusable demonstrations.",
      takeaway:
        "Outperforms FoundationPose in object tracking (DexYCB F-5 of 0.71 vs 0.69; 67% vs 18% human preference on 150 wild videos) and retargets 71% of in-the-wild clips versus 25% for the baseline — while only 83 of 2,000 100DOH clips (~4%) survived filtering; 10 motions ran on real bimanual UR3e robots with Sharpa Wave hands.",
      limitation:
        "Assumes rigid objects and semi-accurate monocular depth, and reconstructs only hand and object — not the full scene with obstacles or articulations.",
      relevance:
        "The data-filtering lesson stays with me: internet-scale pipelines need principled quality gates, not just volume.",
    },
    {
      id: "egomimic",
      title: "EgoMimic: Scaling Imitation Learning via Egocentric Video",
      authors: "Simar Kareer, Dhruv Patel, Ryan Punamiya, et al.",
      affiliation: "",
      year: "2024",
      venue: "arXiv:2410.24221 · ICRA 2025 · egomimic.github.io",
      link: "https://arxiv.org/abs/2410.24221",
      problem:
        "Imitation learning needs diverse demonstrations, but teleoperated robot data is costly to collect; human egocentric video is scalable but embodiment-mismatched with robots.",
      contribution:
        "A full-stack framework: Project Aria smart glasses capture egocentric human video with 3D hand tracking; a low-cost bimanual manipulator is designed to minimize the kinematic gap to human data; masked-image alignment reduces the appearance gap; and a single policy is co-trained on human and robot data — treating human video as embodied demonstrations rather than just high-level intent.",
      takeaway:
        "Outperforms ACT and other imitation baselines on long-horizon real-world single-arm and bimanual tasks; one extra hour of human data helps more than one extra hour of robot data (2h robot + 1h human beats ACT trained on 3h of robot data), with zero-shot generalization to new scenes.",
      limitation:
        "Extending to new robot embodiments and to behaviors demonstrated only in human data is left to future work.",
      relevance:
        "The paper that first convinced me that human and robot data can live in one policy — the thesis that my later readings (EgoScale, EgoAERO, EgoCPT) extend to dexterous hands.",
    },
  ],
}

export const service = [
  {
    title: "Welfare Intern — Volunteer Management Department",
    org: "Alkhidmat Foundation Pakistan",
    detail: "8-week internship (30 Jun – 30 Aug 2026) · Ref: AKFP/VM/3783",
    certificateImage: "/certificates/alkhidmat-internship.png",
  },
  {
    title: "Traffic Help Volunteer (Warden Program)",
    org: "Punjab Police — Chief Traffic Officer, Multan",
    detail: "Aug 2025",
    certificateImage: "/certificates/traffic-volunteer.jpg",
  },
  {
    title: "Youth Internship",
    org: "Government of Pakistan — Prime Minister's Youth Programme",
    detail: "2025",
    certificateImage: "/certificates/youth-internship.jpg",
  },
]

export const personalInterests = [
  "Competitive chess",
  "Algorithmic problem-solving (LeetCode — see above)",
]

export const beyondTech = {
  intro:
    "Some of the habits that keep me steady come from outside technology entirely. They shape how I think about problems, people, and patience.",
  items: [
    {
      title: "Competitive chess",
      text: "I play competitive chess — long games that reward preparation, pattern memory, and staying calm under time pressure. Chess trained the same discipline I later brought to debugging and experiment design: think in concrete variations, but always have a plan.",
    },
    {
      title: "Bird keeping",
      text: "I keep and care for birds. It is a quiet, patient hobby: daily attention, observation of small changes, and consistency over months. It keeps me grounded between long stretches of technical work.",
    },
    {
      title: "Learning and knowledge sharing",
      text: "I study Mandarin Chinese as my foreign-language coursework, and I regularly help my younger brothers through their academic problems. Both sharpen the same skill: taking something complex and explaining it in plain language — which I consider part of an engineer's job.",
    },
  ],
}

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#readings", label: "Readings" },
  { href: "#beyond", label: "Beyond Tech" },
  { href: "#contact", label: "Contact" },
]
