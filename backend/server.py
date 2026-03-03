from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# LLM API Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    password: str  # In production, hash this
    created_at: datetime = Field(default_factory=datetime.utcnow)
    progress: dict = Field(default_factory=dict)

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    progress: dict
    created_at: datetime

class Subject(BaseModel):
    id: str
    name: str
    name_tr: str
    icon: str
    color: str
    units: List[dict]

class Simulation(BaseModel):
    id: str
    subject_id: str
    unit_id: str
    name: str
    name_tr: str
    description: str
    description_tr: str
    type: str  # "physics", "biology", "chemistry"
    parameters: List[dict]
    difficulty: str

class Progress(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    simulation_id: str
    completed: bool = False
    score: int = 0
    time_spent: int = 0
    completed_at: Optional[datetime] = None

class ProgressUpdate(BaseModel):
    simulation_id: str
    completed: bool
    score: int
    time_spent: int

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    role: str  # "user" or "assistant"
    content: str
    subject: Optional[str] = None
    simulation_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    user_id: str
    message: str
    subject: Optional[str] = None
    simulation_id: Optional[str] = None

# ==================== DATA ====================

SUBJECTS_DATA = [
    {
        "id": "physics",
        "name": "Physics",
        "name_tr": "Fizik",
        "icon": "atom",
        "color": "#3B82F6",
        "units": [
            {"id": "motion", "name": "Motion & Force", "name_tr": "Hareket ve Kuvvet"},
            {"id": "energy", "name": "Energy", "name_tr": "Enerji"},
            {"id": "waves", "name": "Waves", "name_tr": "Dalgalar"}
        ]
    },
    {
        "id": "biology",
        "name": "Biology",
        "name_tr": "Biyoloji",
        "icon": "leaf",
        "color": "#10B981",
        "units": [
            {"id": "cell", "name": "Cell Structure", "name_tr": "Hücre Yapısı"},
            {"id": "genetics", "name": "Genetics", "name_tr": "Genetik"},
            {"id": "ecosystem", "name": "Ecosystem", "name_tr": "Ekosistem"}
        ]
    },
    {
        "id": "chemistry",
        "name": "Chemistry",
        "name_tr": "Kimya",
        "icon": "flask",
        "color": "#8B5CF6",
        "units": [
            {"id": "atoms", "name": "Atomic Structure", "name_tr": "Atom Yapısı"},
            {"id": "reactions", "name": "Chemical Reactions", "name_tr": "Kimyasal Tepkimeler"},
            {"id": "periodic", "name": "Periodic Table", "name_tr": "Periyodik Tablo"}
        ]
    }
]

SIMULATIONS_DATA = [
    # Physics Simulations
    {
        "id": "projectile_motion",
        "subject_id": "physics",
        "unit_id": "motion",
        "name": "Projectile Motion",
        "name_tr": "Atış Hareketi",
        "description": "Explore how angle and initial velocity affect projectile trajectory",
        "description_tr": "Açı ve başlangıç hızının atış yörüngesini nasıl etkilediğini keşfedin",
        "type": "physics",
        "parameters": [
            {"name": "angle", "name_tr": "Açı", "min": 0, "max": 90, "default": 45, "unit": "°"},
            {"name": "velocity", "name_tr": "Hız", "min": 10, "max": 100, "default": 50, "unit": "m/s"},
            {"name": "gravity", "name_tr": "Yerçekimi", "min": 1, "max": 20, "default": 9.8, "unit": "m/s²"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "newton_laws",
        "subject_id": "physics",
        "unit_id": "motion",
        "name": "Newton's Laws",
        "name_tr": "Newton Yasaları",
        "description": "Observe force, mass, and acceleration relationships on an inclined plane",
        "description_tr": "Eğik düzlemde kuvvet, kütle ve ivme ilişkilerini gözlemleyin",
        "type": "physics",
        "parameters": [
            {"name": "mass", "name_tr": "Kütle", "min": 1, "max": 50, "default": 10, "unit": "kg"},
            {"name": "angle", "name_tr": "Eğim Açısı", "min": 0, "max": 60, "default": 30, "unit": "°"},
            {"name": "friction", "name_tr": "Sürtünme", "min": 0, "max": 1, "default": 0.3, "unit": "μ"}
        ],
        "difficulty": "medium"
    },
    # Biology Simulations
    {
        "id": "cell_structure",
        "subject_id": "biology",
        "unit_id": "cell",
        "name": "Cell Structure",
        "name_tr": "Hücre Yapısı",
        "description": "Explore the organelles and their functions in a eukaryotic cell",
        "description_tr": "Ökaryotik hücrede organelleri ve işlevlerini keşfedin",
        "type": "biology",
        "parameters": [
            {"name": "cell_type", "name_tr": "Hücre Tipi", "options": ["animal", "plant"], "default": "animal"},
            {"name": "zoom", "name_tr": "Yakınlaştırma", "min": 1, "max": 10, "default": 1, "unit": "x"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "mitosis",
        "subject_id": "biology",
        "unit_id": "cell",
        "name": "Mitosis Phases",
        "name_tr": "Mitoz Evreleri",
        "description": "Watch and control the phases of cell division",
        "description_tr": "Hücre bölünmesinin evrelerini izleyin ve kontrol edin",
        "type": "biology",
        "parameters": [
            {"name": "speed", "name_tr": "Hız", "min": 0.5, "max": 3, "default": 1, "unit": "x"},
            {"name": "phase", "name_tr": "Evre", "options": ["interphase", "prophase", "metaphase", "anaphase", "telophase"], "default": "interphase"}
        ],
        "difficulty": "medium"
    },
    # Chemistry Simulations
    {
        "id": "atom_models",
        "subject_id": "chemistry",
        "unit_id": "atoms",
        "name": "Atomic Models",
        "name_tr": "Atom Modelleri",
        "description": "Explore different atomic models from Dalton to Quantum",
        "description_tr": "Dalton'dan Kuantum'a farklı atom modellerini keşfedin",
        "type": "chemistry",
        "parameters": [
            {"name": "model", "name_tr": "Model", "options": ["dalton", "thomson", "rutherford", "bohr", "quantum"], "default": "bohr"},
            {"name": "element", "name_tr": "Element", "options": ["hydrogen", "helium", "carbon", "oxygen"], "default": "hydrogen"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "periodic_table",
        "subject_id": "chemistry",
        "unit_id": "periodic",
        "name": "Periodic Table Explorer",
        "name_tr": "Periyodik Tablo Gezgini",
        "description": "Interactive periodic table with element properties",
        "description_tr": "Element özellikleriyle interaktif periyodik tablo",
        "type": "chemistry",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["standard", "electron_config", "electronegativity"], "default": "standard"},
            {"name": "highlight", "name_tr": "Vurgula", "options": ["none", "metals", "nonmetals", "metalloids"], "default": "none"}
        ],
        "difficulty": "easy"
    }
]

# ==================== AUTH ROUTES ====================

@api_router.post("/auth/register", response_model=UserResponse)
async def register(user: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_obj = User(
        email=user.email,
        name=user.name,
        password=user.password,  # In production, hash this!
        progress={}
    )
    await db.users.insert_one(user_obj.dict())
    
    return UserResponse(
        id=user_obj.id,
        email=user_obj.email,
        name=user_obj.name,
        progress=user_obj.progress,
        created_at=user_obj.created_at
    )

@api_router.post("/auth/login", response_model=UserResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        progress=user.get("progress", {}),
        created_at=user["created_at"]
    )

@api_router.get("/auth/user/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        progress=user.get("progress", {}),
        created_at=user["created_at"]
    )

# ==================== SUBJECTS & SIMULATIONS ====================

@api_router.get("/subjects")
async def get_subjects():
    return SUBJECTS_DATA

@api_router.get("/subjects/{subject_id}")
async def get_subject(subject_id: str):
    for subject in SUBJECTS_DATA:
        if subject["id"] == subject_id:
            return subject
    raise HTTPException(status_code=404, detail="Subject not found")

@api_router.get("/simulations")
async def get_simulations(subject_id: Optional[str] = None):
    if subject_id:
        return [s for s in SIMULATIONS_DATA if s["subject_id"] == subject_id]
    return SIMULATIONS_DATA

@api_router.get("/simulations/{simulation_id}")
async def get_simulation(simulation_id: str):
    for sim in SIMULATIONS_DATA:
        if sim["id"] == simulation_id:
            return sim
    raise HTTPException(status_code=404, detail="Simulation not found")

# ==================== PROGRESS ====================

@api_router.post("/progress")
async def update_progress(user_id: str, progress: ProgressUpdate):
    progress_obj = Progress(
        user_id=user_id,
        simulation_id=progress.simulation_id,
        completed=progress.completed,
        score=progress.score,
        time_spent=progress.time_spent,
        completed_at=datetime.utcnow() if progress.completed else None
    )
    
    # Update or insert progress
    await db.progress.update_one(
        {"user_id": user_id, "simulation_id": progress.simulation_id},
        {"$set": progress_obj.dict()},
        upsert=True
    )
    
    # Update user's progress dict
    await db.users.update_one(
        {"id": user_id},
        {"$set": {f"progress.{progress.simulation_id}": {
            "completed": progress.completed,
            "score": progress.score,
            "time_spent": progress.time_spent
        }}}
    )
    
    return {"message": "Progress updated"}

@api_router.get("/progress/{user_id}")
async def get_user_progress(user_id: str):
    progress_list = await db.progress.find({"user_id": user_id}).to_list(100)
    return progress_list

@api_router.get("/progress/{user_id}/stats")
async def get_user_stats(user_id: str):
    progress_list = await db.progress.find({"user_id": user_id}).to_list(100)
    
    total_simulations = len(SIMULATIONS_DATA)
    completed = sum(1 for p in progress_list if p.get("completed"))
    total_score = sum(p.get("score", 0) for p in progress_list)
    total_time = sum(p.get("time_spent", 0) for p in progress_list)
    
    # Stats by subject
    subject_stats = {}
    for subject in SUBJECTS_DATA:
        subject_sims = [s["id"] for s in SIMULATIONS_DATA if s["subject_id"] == subject["id"]]
        completed_in_subject = sum(1 for p in progress_list if p.get("simulation_id") in subject_sims and p.get("completed"))
        subject_stats[subject["id"]] = {
            "total": len(subject_sims),
            "completed": completed_in_subject,
            "percentage": round(completed_in_subject / len(subject_sims) * 100) if subject_sims else 0
        }
    
    return {
        "total_simulations": total_simulations,
        "completed": completed,
        "completion_percentage": round(completed / total_simulations * 100) if total_simulations else 0,
        "total_score": total_score,
        "total_time_minutes": round(total_time / 60),
        "subject_stats": subject_stats
    }

# ==================== AI CHAT ====================

@api_router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        # Get chat history for context
        history = await db.chat_messages.find(
            {"user_id": request.user_id}
        ).sort("created_at", -1).limit(10).to_list(10)
        
        history.reverse()  # Oldest first
        
        # Build system message based on context
        subject_context = ""
        if request.subject:
            subject_context = f"The student is currently studying {request.subject}. "
        if request.simulation_id:
            sim = next((s for s in SIMULATIONS_DATA if s["id"] == request.simulation_id), None)
            if sim:
                subject_context += f"They are working on the '{sim['name_tr']}' simulation about {sim['description_tr']}. "
        
        system_message = f"""Sen AR Academy platformunda bir eğitim asistanısın. Türkçe yanıt ver.
Lise ve üniversite hazırlık seviyesindeki öğrencilere Fizik, Biyoloji ve Kimya konularında yardımcı oluyorsun.
{subject_context}
Yanıtların:
- Öğrenci seviyesine uygun olmalı
- Açık ve anlaşılır olmalı  
- Gerektiğinde formüller ve örnekler içermeli
- Motive edici ve destekleyici olmalı
Kısa ve öz yanıtlar ver, gereksiz uzatma."""

        # Initialize chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"ar_academy_{request.user_id}",
            system_message=system_message
        ).with_model("openai", "gpt-4o")
        
        # Add history to context
        for msg in history[-6:]:  # Last 6 messages for context
            if msg["role"] == "user":
                await chat.send_message(UserMessage(text=msg["content"]))
            # Assistant messages are already in context
        
        # Send current message
        response = await chat.send_message(UserMessage(text=request.message))
        
        # Save messages to database
        user_msg = ChatMessage(
            user_id=request.user_id,
            role="user",
            content=request.message,
            subject=request.subject,
            simulation_id=request.simulation_id
        )
        
        assistant_msg = ChatMessage(
            user_id=request.user_id,
            role="assistant",
            content=response,
            subject=request.subject,
            simulation_id=request.simulation_id
        )
        
        await db.chat_messages.insert_many([user_msg.dict(), assistant_msg.dict()])
        
        return {
            "response": response,
            "message_id": assistant_msg.id
        }
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI chat error: {str(e)}")

@api_router.get("/chat/history/{user_id}")
async def get_chat_history(user_id: str, limit: int = 50):
    messages = await db.chat_messages.find(
        {"user_id": user_id}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    messages.reverse()
    return messages

@api_router.delete("/chat/history/{user_id}")
async def clear_chat_history(user_id: str):
    await db.chat_messages.delete_many({"user_id": user_id})
    return {"message": "Chat history cleared"}

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "AR Academy API", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
