export const roles = ["Python Developer", "Problem Solver", "Automation Builder", "CS Student"]

export const projects: [string, string, string, string, string[]][] = [
  ["01", "Python · API utility", "Automated Weather Scraper", "A Python tool that fetches real-time weather data from web APIs, parses JSON payloads, and outputs formatted daily summaries.", ["Python", "Requests", "JSON", "Git"]],
  ["02", "Terminal application", "Interactive CLI Task Manager", "A terminal-based application using OOP principles to manage user tasks, persistent JSON/CSV storage, and application state.", ["Python", "File I/O", "OOP"]],
  ["03", "Data processing script", "Custom Web Scraper & Data Cleaner", "A script designed to extract structured data from non-API websites, clean raw text, and export usable data files.", ["Python", "BeautifulSoup", "Data parsing"]],
]

export const principles = [
  ["⌘", "Clean over clever", "Readable code beats smart code. If a future me can't follow it, it isn't finished."],
  ["◌", "Understand the machine", "I dig beneath abstractions - how memory, data structures, and the runtime actually behave."],
  ["⌁", "Version everything", "Small commits, honest messages, branches for ideas. Git is part of thinking, not a chore."],
  ["↗", "Ship, then refine", "A working v1 teaches more than a perfect plan. Build, measure, improve, repeat."],
]

export const toolkit = [
  ["01", "Languages", "Python · HTML5 · CSS3 · SQL basics · Bash/Shell"],
  ["02", "Tools & environment", "Git · GitHub · VS Code · Linux/Terminal · venv · Pip"],
  ["03", "Core practices", "OOP · API integration · Version control workflows · Big-O basics"],
  ["04", "Data structures", "Arrays · Hash Maps · Linked Lists · Algorithmic problem solving"],
]

export const roadmap = [
  ["01", "Now", "Full-stack foundations", "Building web applications with Flask or FastAPI, and becoming confident with relational databases such as PostgreSQL.", 68],
  ["02", "Next", "Systems & shipping", "Learning asyncio, cloud deployment fundamentals, AWS, Docker, and how production Python applications come together.", 24],
  ["03", "Ahead", "Software engineering depth", "Growing into an engineer who can build robust APIs, scalable backends, and high-performance distributed systems.", 8],
] as const

export const interests = ["Python development", "Automation", "Problem solving", "Backend fundamentals", "Continuous learning", "Clean code", "Developer tooling"]

