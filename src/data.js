// Keep portfolio content here so updates don't require editing layout components.
export const experience = [
  {
    role: 'Engineer — Products (dZSuite)', company: 'Digi Edze Soft Solutions', location: 'Hyderabad, India', period: 'JAN 2026 — PRESENT', current: true,
    highlights: [
      'Built an agent-based automation platform and centralized MCP server from scratch for cloud infrastructure workflows, covering 60% of L1/L2 operations and reducing manual incident triage time by 40%, with human approval for high-impact actions.',
      'Pioneered a Token Economics platform for Claude AI, Claude API and Microsoft Foundry, enabling token consumption tracking, model-level cost attribution, usage analytics, budget/quota controls and policy-driven governance.',
      'Architected backend services for authentication, authorization, multi-tenant organization management and policy-driven resource governance, accelerating platform onboarding by 65%.'
    ], tags: ['Python', 'FastAPI', 'MCP', 'Agentic AI', 'LLM Governance']
  },
  {
    role: 'Software Engineer', company: 'Infolob Solutions India', location: 'Hyderabad, India', period: 'AUG 2025 — JAN 2026',
    highlights: [
      'Implemented a LangGraph-based Intent & Context Resolution workflow using application tools to produce grounded LLM responses.',
      'Experimented with human-in-the-loop approaches for high-risk tasks to support safe automation.'
    ], tags: ['LangGraph', 'Python', 'LLM Workflows', 'Human-in-the-loop']
  },
  {
    role: 'Software Engineer', company: 'Heeddata India (Multi-Cloud FinOps Product)', location: 'Hyderabad, India', period: 'JUL 2023 — JUL 2025',
    highlights: [
      'Reduced cloud costs by 25% through anomaly detection, predictive analytics and automated thresholds for cost spikes, security risks and idle resources.',
      'Improved MongoDB performance by 30% under high write loads through replica-set optimisation, indexing, query tuning and workload balancing.',
      'Improved large-scale Parquet/CSV processing: 40% higher CPU efficiency and 25% lower memory footprint.',
      'Built a real-time partner dashboard with scheduler–worker architecture, RBAC and audit logging for 50+ users.',
      'Implemented OTP and OAuth 2.0 authentication (Microsoft, Google) for 1,000+ users, reducing unauthorised access incidents by 80%.'
    ], tags: ['Python', 'MongoDB', 'Cloud FinOps', 'OAuth 2.0', 'Data Processing']
  },
  {
    role: 'Software Developer Intern', company: 'Pro Stack Academy', location: 'Bengaluru, India', period: 'OCT 2022 — APR 2023',
    highlights: [
      'Standardised multi-cloud metadata for 50+ accounts using SDKs, improving resource governance and compliance.',
      'Optimised backend workflows and API performance for high concurrency and large-scale data processing.',
      'Engineered 20+ REST APIs with Spring Boot MVC.'
    ], tags: ['Java', 'Spring Boot', 'REST APIs', 'Cloud SDKs']
  }
];

export const skillGroups = [
  { name: 'Languages', items: ['Python 3', 'Java'] },
  { name: 'Backend & APIs', items: ['FastAPI', 'SQLAlchemy', 'REST APIs', 'PyMongo'] },
  { name: 'Agentic AI & LLM', items: ['LangChain', 'LangGraph', 'FastMCP', 'MCP', 'Microsoft Foundry', 'OpenAI'] },
  { name: 'Cloud & DevOps', items: ['AWS / boto3', 'Azure SDK', 'Docker', 'Docker Compose', 'Kubernetes'] },
  { name: 'Data & Messaging', items: ['MySQL', 'MongoDB', 'ClickHouse', 'Redis', 'RabbitMQ'] },
  { name: 'Observability & Tools', items: ['OpenTelemetry', 'Git', 'GitHub', 'Postman', 'Kombu', 'aio-pika'] }
];

// Add projects here. Keep links empty until a public demo or source repository is available.
export const projects = [
  {
    title: 'Agentic Cloud Operations Assistant',
    type: 'REFERENCE PROJECT · ENTERPRISE AUTOMATION',
    summary: 'An agent-based workflow concept for investigating cloud operations requests, selecting relevant tools and routing high-impact actions through human approval.',
    highlights: ['Intent-led task routing', 'MCP tool integration', 'Human approval for risky actions'],
    stack: ['Python', 'LangGraph', 'FastMCP', 'MCP'],
    status: 'Experience highlight',
    link: ''
  }
];

// Add published posts here. The sample is a short starter note, not a claim of a published article.
export const blogs = [
  {
    title: 'Why agentic workflows need clear tool boundaries',
    date: 'STARTER NOTE',
    category: 'Agentic AI',
    excerpt: 'A useful agent is not one that can call every tool. It is one that knows which tool is appropriate, what context it needs and when a person should approve the next step.',
    readTime: '2 min read',
    link: ''
  }
];

// Curated resource examples; replace or extend with links you personally recommend.
export const resources = [
  {
    title: 'Model Context Protocol',
    kind: 'DOCUMENTATION',
    description: 'A reference point for understanding how AI applications connect to external tools and context.',
    url: 'https://modelcontextprotocol.io/'
  },
  {
    title: 'LangGraph documentation',
    kind: 'LEARNING',
    description: 'Explore stateful, controllable agent workflows and orchestration patterns.',
    url: 'https://docs.langchain.com/oss/python/langgraph/overview'
  }
];
