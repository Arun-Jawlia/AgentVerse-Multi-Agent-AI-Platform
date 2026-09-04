# AgentVerse

> A production-oriented multi-agent GenAI platform for searching the web, generating images, creating PDFs and PowerPoint presentations, and writing code through intelligent AI agents.

## 🚀 Overview

**AgentVerse** is a multi-agent AI platform designed to bring multiple AI capabilities into a single workspace.

Instead of relying on one general-purpose agent, AgentVerse uses specialized agents and tools that can collaborate, delegate tasks, maintain workflow state, and execute multi-step operations.

The platform is built around **LangChain + LangGraph** for AI orchestration and a **Node.js microservices architecture** for scalability and modularity.

## ✨ Key Features

- 🤖 **Multi-Agent AI Architecture**
  - Specialized agents for different tasks
  - Agent-to-agent orchestration
  - Task delegation and multi-step reasoning
  - Tool calling and workflow execution

- 🔎 **AI-Powered Web Search**
  - Search the web from natural-language prompts
  - Collect and process external information
  - Use search tools as part of agent workflows

- 🎨 **Image Generation**
  - Generate images from natural-language prompts
  - Integrate image-generation models/services into agent workflows

- 📄 **PDF Generation**
  - Generate structured PDF documents
  - Convert AI-generated content into downloadable artifacts

- 📊 **PowerPoint Generation**
  - Generate presentation structures and slide content
  - Create complete PowerPoint presentations from prompts

- 💻 **Code Generation**
  - Generate code from natural-language requirements
  - Support multi-step coding workflows
  - Use AI agents for analysis, generation, and refinement

- 🧠 **Agent Orchestration**
  - LangGraph-based stateful workflows
  - Conditional routing
  - Specialized agent execution
  - Tool-based decision making

- ⚡ **Redis**
  - Response caching
  - Workflow/state management
  - Temporary data storage
  - Performance optimization

- 🧩 **Microservices**
  - Independently deployable services
  - Clear separation of responsibilities
  - Easier scaling and maintenance

- 🎯 **Modern Frontend**
  - React + TypeScript
  - Interactive AI workspace
  - Task execution and artifact management

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      React App       │
                         │  React + TypeScript  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     API Gateway      │
                         │      Node.js         │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ Agent Service│  │ Search       │  │ Generation   │
          │ LangGraph    │  │ Service      │  │ Services     │
          │ LangChain    │  │              │  │              │
          └──────┬───────┘  └──────────────┘  └──────┬───────┘
                 │                                    │
                 ▼                                    ▼
          ┌──────────────┐                    ┌──────────────┐
          │    Redis     │                    │ External AI  │
          │ Cache/State  │                    │ APIs/Models  │
          └──────────────┘                    └──────────────┘
```

### High-Level Flow

```text
User Prompt
    │
    ▼
React Frontend
    │
    ▼
API Gateway
    │
    ▼
Agent Orchestrator
    │
    ├──► Search Agent ─────► Web/Search Tools
    │
    ├──► Image Agent ──────► Image Generation
    │
    ├──► Document Agent ───► PDF Generation
    │
    ├──► Presentation Agent ► PPT Generation
    │
    └──► Code Agent ───────► Code Generation
             │
             ▼
       Result / Artifact
             │
             ▼
        React Workspace
```

---

## 🧠 Multi-Agent System

AgentVerse follows a **supervisor/orchestrator-based architecture**.

The orchestrator receives the user's request and determines which specialized agent or tool should handle the task.

### Example

```text
User:
"Research the latest trends in AI agents and create a PowerPoint."

                    │
                    ▼
             Supervisor Agent
                    │
             ┌──────┴──────┐
             ▼             ▼
       Search Agent   Presentation Agent
             │             │
             ▼             ▼
          Web Data      Slide Structure
             │             │
             └──────┬──────┘
                    ▼
              Final PPT
```

This allows complex requests to be broken down into smaller, specialized tasks.

---

## 🛠️ Technology Stack

### Frontend

- React.js
- TypeScript
- Modern CSS / UI framework
- API integration
- AI workspace interface

### Backend

- Node.js
- TypeScript
- REST APIs
- Microservices architecture
- API Gateway

### AI / GenAI

- LangChain
- LangGraph
- LLMs
- Prompt Engineering
- Tool Calling
- Agentic Workflows
- Structured Outputs

### Infrastructure

- Redis
- Docker
- Docker Compose
- AWS Deployment
- CI/CD

### Generated Artifacts

- Images
- PDFs
- PowerPoint presentations
- Source code
- Search/research results

---

## 📁 Suggested Project Structure

```text
agentverse/
│
├── frontend/
│   └── web/
│       ├── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/
│
├── services/
│   │
│   ├── api-gateway/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── agent-service/
│   │   ├── src/
│   │   │   ├── agents/
│   │   │   ├── graphs/
│   │   │   ├── tools/
│   │   │   ├── prompts/
│   │   │   └── workflows/
│   │   └── package.json
│   │
│   ├── search-service/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── image-service/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── document-service/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── presentation-service/
│   │   ├── src/
│   │   └── package.json
│   │
│   └── code-service/
│       ├── src/
│       └── package.json
│
├── shared/
│   ├── types/
│   ├── utils/
│   └── config/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── docker-compose.yml
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🔄 Example Workflow

A simple request:

```text
"Create a presentation about Generative AI."
```

can flow through the platform as:

```text
1. User submits prompt
        ↓
2. API Gateway receives request
        ↓
3. Supervisor Agent analyzes intent
        ↓
4. Presentation workflow is selected
        ↓
5. Search Agent collects relevant information
        ↓
6. Content Agent structures the information
        ↓
7. Presentation Agent creates slide content
        ↓
8. PPT service generates the presentation
        ↓
9. Artifact is stored/returned
        ↓
10. React UI displays the generated presentation
```

---

## ⚡ Redis Usage

Redis is used as a high-performance infrastructure layer.

Typical use cases include:

```text
                    Redis
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
      Cache        Agent State    Temporary Data
        │             │             │
        ▼             ▼             ▼
   API Results    Workflows      Generation Jobs
```

Benefits:

- Faster repeated requests
- Reduced unnecessary API/LLM calls
- Shared state between services
- Temporary workflow data
- Improved application responsiveness

---

## 🔐 Configuration

Create an environment file:

```bash
cp .env.example .env
```

Example configuration:

```env
NODE_ENV=development

PORT=5000

REDIS_URL=redis://localhost:6379

LLM_API_KEY=your_api_key
SEARCH_API_KEY=your_api_key
IMAGE_API_KEY=your_api_key
```

> Never commit real API keys or secrets to Git.

---

## 🐳 Running with Docker

Build the services:

```bash
docker compose build
```

Start the platform:

```bash
docker compose up
```

Run in detached mode:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

---

## 💻 Local Development

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start backend services according to their individual service configuration.

Make sure Redis and required external services are running.

---

## 🔌 API Design

Example high-level API structure:

```text
/api
│
├── /auth
│
├── /agents
│   ├── POST /execute
│   ├── GET  /:id
│   └── GET  /:id/status
│
├── /search
│   └── POST /query
│
├── /images
│   └── POST /generate
│
├── /documents
│   └── POST /generate
│
├── /presentations
│   └── POST /generate
│
└── /code
    └── POST /generate
```

---

## 🎯 Design Principles

AgentVerse is designed around the following principles:

### 1. Modular Agents

Each agent should have a clearly defined responsibility.

### 2. Tool-Based Architecture

Agents should interact with external capabilities through reusable tools.

### 3. Stateful Workflows

Complex workflows should maintain state across multiple execution steps.

### 4. Independent Services

Business capabilities should be isolated into independently deployable services.

### 5. Scalability

Services should be horizontally scalable where required.

### 6. Extensibility

Adding a new AI capability should require minimal changes to the existing architecture.

---

## 📈 Future Improvements

Potential future enhancements:

- [ ] Agent marketplace
- [ ] Custom user-created agents
- [ ] Long-term memory
- [ ] RAG pipelines
- [ ] Vector database integration
- [ ] Streaming responses
- [ ] Background job queues
- [ ] Agent observability
- [ ] LangSmith tracing
- [ ] Model routing
- [ ] Multi-model support
- [ ] Authentication and RBAC
- [ ] Usage and token analytics
- [ ] AI workflow builder
- [ ] Collaborative workspaces
- [ ] File upload and document Q&A

---

## 🔭 Observability

For production environments, AgentVerse can integrate observability across:

```text
User Request
     │
     ▼
API Gateway
     │
     ▼
Agent Graph
     │
     ├── Agent Execution
     ├── Tool Calls
     ├── LLM Calls
     ├── Redis Operations
     └── Artifact Generation
```

Tracing and monitoring can be used to understand:

- Agent execution time
- Tool usage
- LLM latency
- Token consumption
- Failed workflows
- Service health
- Cache performance

---

## 🧪 Testing Strategy

Recommended testing layers:

```text
Unit Tests
    ↓
Service Tests
    ↓
Integration Tests
    ↓
Agent Workflow Tests
    ↓
End-to-End Tests
```

Important areas to test:

- Agent routing
- Tool calling
- Graph transitions
- API contracts
- Redis operations
- Artifact generation
- Failure/retry handling

---

## 🔒 Security Considerations

AgentVerse should follow secure-by-default practices:

- Store secrets in environment variables or a secret manager
- Validate all user inputs
- Authenticate API requests
- Apply authorization/RBAC
- Rate-limit expensive AI operations
- Sanitize generated content where required
- Restrict tool permissions
- Avoid exposing internal service endpoints
- Monitor API and model usage

---

## 🌟 Why AgentVerse?

Traditional AI applications often expose a single chatbot with a limited set of capabilities.

AgentVerse takes a different approach:

```text
                    AgentVerse
                        │
        ┌───────────────┼────────────────┐
        │               │                │
     Agents           Tools          Workflows
        │               │                │
        ▼               ▼                ▼
    Reasoning       Execution       Orchestration
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                 Complex AI Tasks
```

The goal is to create a **unified AI execution platform** where specialized agents can work together to complete complex real-world tasks.

---

## 📌 Project Highlights

- Multi-agent AI architecture
- LangGraph-based agent orchestration
- LangChain tool integration
- Node.js microservices
- React + TypeScript frontend
- Redis caching and state management
- AI-powered web search
- Image generation
- PDF generation
- PowerPoint generation
- Code generation
- Modular and extensible architecture
- Dockerized services
- Production-oriented system design

---

## 👨‍💻 Author

**Arun Jawlia**

Full Stack Developer & GenAI Engineer

---

## ⭐ Support

If you find AgentVerse useful, consider giving the repository a ⭐ and sharing your feedback.
