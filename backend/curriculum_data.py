# Müfredat Verileri - Fizik, Biyoloji, Kimya

SUBJECTS_DATA = [
    {
        "id": "physics",
        "name": "Physics",
        "name_tr": "Fizik",
        "icon": "planet-outline",
        "color": "#3B82F6",
        "units": [
            {"id": "physics_intro", "name": "Introduction to Physics", "name_tr": "Fizik Bilimine Giriş"},
            {"id": "matter", "name": "Matter and Properties", "name_tr": "Madde ve Özellikleri"},
            {"id": "motion_force", "name": "Motion and Force", "name_tr": "Hareket ve Kuvvet"},
            {"id": "energy", "name": "Energy", "name_tr": "Enerji"},
            {"id": "electrostatics", "name": "Electrostatics", "name_tr": "Elektrostatik"},
            {"id": "circuits", "name": "Electric Circuits", "name_tr": "Elektrik Devreleri"},
            {"id": "magnetism", "name": "Magnetism", "name_tr": "Manyetizma"},
            {"id": "induction", "name": "Electromagnetic Induction", "name_tr": "Elektromanyetik İndüksiyon"},
            {"id": "waves", "name": "Waves", "name_tr": "Dalgalar"},
            {"id": "optics", "name": "Optics", "name_tr": "Optik"},
            {"id": "circular_motion", "name": "Circular Motion", "name_tr": "Dairesel Hareket"},
            {"id": "momentum", "name": "Impulse and Momentum", "name_tr": "İtme ve Momentum"},
            {"id": "fluids", "name": "Fluid Mechanics", "name_tr": "Sıvıların Mekaniği"},
            {"id": "thermodynamics", "name": "Thermodynamics", "name_tr": "Termodinamik"},
            {"id": "modern_physics", "name": "Modern Physics", "name_tr": "Modern Fizik"},
        ]
    },
    {
        "id": "biology",
        "name": "Biology",
        "name_tr": "Biyoloji",
        "icon": "leaf-outline",
        "color": "#10B981",
        "units": [
            {"id": "bio_intro", "name": "Introduction to Biology", "name_tr": "Biyoloji Bilimine Giriş"},
            {"id": "cell_structure", "name": "Cell Structure", "name_tr": "Canlıların Yapısı"},
            {"id": "cell_division", "name": "Cell Division", "name_tr": "Hücre Bölünmesi"},
            {"id": "heredity", "name": "Heredity", "name_tr": "Kalıtım"},
            {"id": "ecosystem", "name": "Ecosystem", "name_tr": "Ekosistem"},
            {"id": "biochemistry", "name": "Biochemistry", "name_tr": "Kimyasal Yapı"},
            {"id": "growth", "name": "Growth and Development", "name_tr": "Büyüme ve Gelişme"},
            {"id": "tissues", "name": "Tissues and Organs", "name_tr": "Doku ve Organlar"},
            {"id": "nervous_system", "name": "Nervous System", "name_tr": "Sinir Sistemi"},
            {"id": "endocrine", "name": "Endocrine System", "name_tr": "Endokrin Sistem"},
            {"id": "circulatory", "name": "Circulatory System", "name_tr": "Dolaşım Sistemi"},
            {"id": "respiratory", "name": "Respiratory System", "name_tr": "Solunum Sistemi"},
            {"id": "digestive", "name": "Digestive System", "name_tr": "Sindirim Sistemi"},
            {"id": "excretory", "name": "Excretory System", "name_tr": "Boşaltım Sistemi"},
            {"id": "reproductive", "name": "Reproductive System", "name_tr": "Üreme Sistemi"},
            {"id": "genetics", "name": "Genetics", "name_tr": "Genetik"},
        ]
    },
    {
        "id": "chemistry",
        "name": "Chemistry",
        "name_tr": "Kimya",
        "icon": "flask-outline",
        "color": "#8B5CF6",
        "units": [
            {"id": "chem_intro", "name": "Introduction to Chemistry", "name_tr": "Kimya Bilimine Giriş"},
            {"id": "atomic_structure", "name": "Atomic Structure", "name_tr": "Atom ve Yapısı"},
            {"id": "periodic_table", "name": "Periodic System", "name_tr": "Periyodik Sistem"},
            {"id": "chemical_species", "name": "Chemical Species", "name_tr": "Kimyasal Türler"},
            {"id": "mole_concept", "name": "Mole Concept", "name_tr": "Mol Kavramı"},
            {"id": "reactions", "name": "Chemical Reactions", "name_tr": "Kimyasal Tepkimeler"},
            {"id": "equilibrium", "name": "Chemical Equilibrium", "name_tr": "Kimyasal Denge"},
            {"id": "solubility", "name": "Solubility Equilibrium", "name_tr": "Çözünürlük Dengesi"},
            {"id": "thermochemistry", "name": "Thermochemistry", "name_tr": "Termokimya"},
            {"id": "kinetics", "name": "Chemical Kinetics", "name_tr": "Kimyasal Kinetik"},
            {"id": "organic_basics", "name": "Organic Chemistry Basics", "name_tr": "Organik Kimya Temelleri"},
            {"id": "hydrocarbons", "name": "Hydrocarbons", "name_tr": "Hidrokarbonlar"},
            {"id": "functional_groups", "name": "Functional Groups", "name_tr": "Fonksiyonel Gruplar"},
            {"id": "biochem", "name": "Biochemistry", "name_tr": "Biyokimya"},
            {"id": "environmental", "name": "Environmental Chemistry", "name_tr": "Çevre Kimyası"},
        ]
    }
]

# Tüm Simülasyonlar - 138 adet
SIMULATIONS_DATA = [
    # ==================== FİZİK SİMÜLASYONLARI ====================
    
    # --- Fizik Bilimine Giriş ---
    {
        "id": "measurement_tools",
        "subject_id": "physics",
        "unit_id": "physics_intro",
        "name": "Measurement Tools",
        "name_tr": "Ölçüm Aletleri",
        "description": "Virtual laboratory table with measurement instruments",
        "description_tr": "Kumpas, mikrometre gibi ölçüm aletleriyle sanal laboratuvar",
        "type": "physics",
        "simulation_type": "lab",
        "parameters": [
            {"name": "tool", "name_tr": "Alet", "options": ["caliper", "micrometer", "ruler"], "default": "caliper"},
            {"name": "object_size", "name_tr": "Nesne Boyutu", "min": 1, "max": 100, "default": 25, "unit": "mm"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "scientific_method",
        "subject_id": "physics",
        "unit_id": "physics_intro",
        "name": "Scientific Method",
        "name_tr": "Bilimsel Yöntem",
        "description": "Hypothesis-experiment-conclusion flow chart",
        "description_tr": "Hipotez-deney-sonuç akış şeması ile interaktif süreç",
        "type": "physics",
        "simulation_type": "interactive",
        "parameters": [
            {"name": "step", "name_tr": "Adım", "options": ["observation", "hypothesis", "experiment", "conclusion"], "default": "observation"}
        ],
        "difficulty": "easy"
    },
    
    # --- Madde ve Özellikleri ---
    {
        "id": "states_of_matter",
        "subject_id": "physics",
        "unit_id": "matter",
        "name": "States of Matter",
        "name_tr": "Maddenin Halleri",
        "description": "Solid-liquid-gas molecular animation with temperature change",
        "description_tr": "Sıcaklık ile değişen katı-sıvı-gaz molekül animasyonu",
        "type": "physics",
        "simulation_type": "molecular",
        "parameters": [
            {"name": "temperature", "name_tr": "Sıcaklık", "min": -50, "max": 150, "default": 25, "unit": "°C"},
            {"name": "substance", "name_tr": "Madde", "options": ["water", "iron", "oxygen"], "default": "water"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "density_simulation",
        "subject_id": "physics",
        "unit_id": "matter",
        "name": "Density",
        "name_tr": "Yoğunluk",
        "description": "Sinking/floating simulation of different materials",
        "description_tr": "Farklı maddelerin batma/yüzme simülasyonu",
        "type": "physics",
        "simulation_type": "fluid",
        "parameters": [
            {"name": "material", "name_tr": "Malzeme", "options": ["wood", "iron", "ice", "oil"], "default": "wood"},
            {"name": "liquid", "name_tr": "Sıvı", "options": ["water", "oil", "mercury"], "default": "water"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "pressure_pascal",
        "subject_id": "physics",
        "unit_id": "matter",
        "name": "Pascal's Principle",
        "name_tr": "Pascal Prensibi",
        "description": "Hydraulic press and piston movement",
        "description_tr": "Hidrolik pres, piston hareketi ve kuvvet çarpanı",
        "type": "physics",
        "simulation_type": "mechanics",
        "parameters": [
            {"name": "force", "name_tr": "Kuvvet", "min": 10, "max": 500, "default": 100, "unit": "N"},
            {"name": "area_ratio", "name_tr": "Alan Oranı", "min": 1, "max": 20, "default": 5, "unit": "x"}
        ],
        "difficulty": "medium"
    },
    
    # --- Hareket ve Kuvvet ---
    {
        "id": "vectors_3d",
        "subject_id": "physics",
        "unit_id": "motion_force",
        "name": "3D Vectors",
        "name_tr": "3D Vektörler",
        "description": "3D vector addition and subtraction",
        "description_tr": "Dokunarak vektör çizme, toplama ve çıkarma",
        "type": "physics",
        "simulation_type": "vector",
        "parameters": [
            {"name": "vector1_x", "name_tr": "V1 X", "min": -10, "max": 10, "default": 3, "unit": ""},
            {"name": "vector1_y", "name_tr": "V1 Y", "min": -10, "max": 10, "default": 4, "unit": ""},
            {"name": "vector2_x", "name_tr": "V2 X", "min": -10, "max": 10, "default": -2, "unit": ""},
            {"name": "vector2_y", "name_tr": "V2 Y", "min": -10, "max": 10, "default": 5, "unit": ""}
        ],
        "difficulty": "medium"
    },
    {
        "id": "linear_motion",
        "subject_id": "physics",
        "unit_id": "motion_force",
        "name": "Linear Motion",
        "name_tr": "Doğrusal Hareket",
        "description": "Position-time and velocity-time graphs",
        "description_tr": "Konum-zaman, hız-zaman grafikleri ve animasyonlu araç",
        "type": "physics",
        "simulation_type": "kinematics",
        "parameters": [
            {"name": "initial_velocity", "name_tr": "Başlangıç Hızı", "min": 0, "max": 30, "default": 10, "unit": "m/s"},
            {"name": "acceleration", "name_tr": "İvme", "min": -5, "max": 5, "default": 2, "unit": "m/s²"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "projectile_motion",
        "subject_id": "physics",
        "unit_id": "motion_force",
        "name": "Projectile Motion",
        "name_tr": "Atış Hareketi",
        "description": "Horizontal and oblique projectile simulation",
        "description_tr": "Açı ve başlangıç hızının atış yörüngesini nasıl etkilediğini keşfedin",
        "type": "physics",
        "simulation_type": "projectile",
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
        "unit_id": "motion_force",
        "name": "Newton's Laws",
        "name_tr": "Newton Yasaları",
        "description": "Friction force and inclined plane simulation",
        "description_tr": "Eğik düzlemde kuvvet, kütle ve ivme ilişkilerini gözlemleyin",
        "type": "physics",
        "simulation_type": "newton",
        "parameters": [
            {"name": "mass", "name_tr": "Kütle", "min": 1, "max": 50, "default": 10, "unit": "kg"},
            {"name": "angle", "name_tr": "Eğim Açısı", "min": 0, "max": 60, "default": 30, "unit": "°"},
            {"name": "friction", "name_tr": "Sürtünme", "min": 0, "max": 1, "default": 0.3, "unit": "μ"}
        ],
        "difficulty": "medium"
    },
    
    # --- Enerji ---
    {
        "id": "work_energy",
        "subject_id": "physics",
        "unit_id": "energy",
        "name": "Work and Energy",
        "name_tr": "İş ve Enerji",
        "description": "Kinetic/potential energy transformation",
        "description_tr": "Sarkaç ve yuvarlanma ile kinetik/potansiyel enerji dönüşümü",
        "type": "physics",
        "simulation_type": "energy",
        "parameters": [
            {"name": "height", "name_tr": "Yükseklik", "min": 1, "max": 20, "default": 10, "unit": "m"},
            {"name": "mass", "name_tr": "Kütle", "min": 1, "max": 10, "default": 2, "unit": "kg"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "collision",
        "subject_id": "physics",
        "unit_id": "energy",
        "name": "Collisions",
        "name_tr": "Çarpışmalar",
        "description": "Elastic and inelastic collision simulation",
        "description_tr": "Esnek ve esnek olmayan çarpışma parametreleri",
        "type": "physics",
        "simulation_type": "collision",
        "parameters": [
            {"name": "mass1", "name_tr": "Kütle 1", "min": 1, "max": 10, "default": 2, "unit": "kg"},
            {"name": "mass2", "name_tr": "Kütle 2", "min": 1, "max": 10, "default": 3, "unit": "kg"},
            {"name": "velocity1", "name_tr": "Hız 1", "min": 1, "max": 20, "default": 10, "unit": "m/s"},
            {"name": "elastic", "name_tr": "Elastik", "options": ["elastic", "inelastic"], "default": "elastic"}
        ],
        "difficulty": "medium"
    },
    
    # --- Elektrostatik ---
    {
        "id": "coulomb_law",
        "subject_id": "physics",
        "unit_id": "electrostatics",
        "name": "Coulomb's Law",
        "name_tr": "Coulomb Yasası",
        "description": "Force vectors between point charges",
        "description_tr": "Nokta yükler arası kuvvet vektörleri",
        "type": "physics",
        "simulation_type": "electrostatics",
        "parameters": [
            {"name": "charge1", "name_tr": "Yük 1", "min": -10, "max": 10, "default": 5, "unit": "μC"},
            {"name": "charge2", "name_tr": "Yük 2", "min": -10, "max": 10, "default": -3, "unit": "μC"},
            {"name": "distance", "name_tr": "Mesafe", "min": 1, "max": 20, "default": 5, "unit": "cm"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "electric_field",
        "subject_id": "physics",
        "unit_id": "electrostatics",
        "name": "Electric Field",
        "name_tr": "Elektrik Alan",
        "description": "Field lines and charged particle motion",
        "description_tr": "3D alan çizgileri ve yüklü parçacık hareketi",
        "type": "physics",
        "simulation_type": "field",
        "parameters": [
            {"name": "charge", "name_tr": "Yük", "min": -10, "max": 10, "default": 5, "unit": "μC"},
            {"name": "show_lines", "name_tr": "Çizgiler", "options": ["on", "off"], "default": "on"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "electric_potential",
        "subject_id": "physics",
        "unit_id": "electrostatics",
        "name": "Electric Potential",
        "name_tr": "Elektrik Potansiyeli",
        "description": "Equipotential surfaces visualization",
        "description_tr": "Eşpotansiyel yüzeyler ve voltmetre ile ölçüm",
        "type": "physics",
        "simulation_type": "potential",
        "parameters": [
            {"name": "charge", "name_tr": "Yük", "min": 1, "max": 10, "default": 5, "unit": "μC"},
            {"name": "distance", "name_tr": "Mesafe", "min": 1, "max": 20, "default": 10, "unit": "cm"}
        ],
        "difficulty": "medium"
    },
    
    # --- Elektrik Devreleri ---
    {
        "id": "ohm_law",
        "subject_id": "physics",
        "unit_id": "circuits",
        "name": "Ohm's Law",
        "name_tr": "Ohm Yasası",
        "description": "Series and parallel circuit building",
        "description_tr": "Seri ve paralel devre kurma, direnç/akım/voltaj ayarı",
        "type": "physics",
        "simulation_type": "circuit",
        "parameters": [
            {"name": "voltage", "name_tr": "Voltaj", "min": 1, "max": 24, "default": 12, "unit": "V"},
            {"name": "resistance", "name_tr": "Direnç", "min": 1, "max": 100, "default": 10, "unit": "Ω"},
            {"name": "circuit_type", "name_tr": "Devre Tipi", "options": ["series", "parallel"], "default": "series"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "kirchhoff_rules",
        "subject_id": "physics",
        "unit_id": "circuits",
        "name": "Kirchhoff's Rules",
        "name_tr": "Kirchhoff Kuralları",
        "description": "Complex circuit solution",
        "description_tr": "Karmaşık devre çözümü, düğüm noktaları ve çevre seçimi",
        "type": "physics",
        "simulation_type": "circuit",
        "parameters": [
            {"name": "branches", "name_tr": "Dal Sayısı", "min": 2, "max": 5, "default": 3, "unit": ""}
        ],
        "difficulty": "hard"
    },
    
    # --- Manyetizma ---
    {
        "id": "magnetic_field",
        "subject_id": "physics",
        "unit_id": "magnetism",
        "name": "Magnetic Field",
        "name_tr": "Manyetik Alan",
        "description": "Wire coil, solenoid, and magnet",
        "description_tr": "Tel sargı, solenoid ve manyetik alan görselleştirme",
        "type": "physics",
        "simulation_type": "magnetism",
        "parameters": [
            {"name": "current", "name_tr": "Akım", "min": 1, "max": 10, "default": 5, "unit": "A"},
            {"name": "turns", "name_tr": "Sarım", "min": 10, "max": 100, "default": 50, "unit": ""}
        ],
        "difficulty": "medium"
    },
    {
        "id": "electromagnetic_force",
        "subject_id": "physics",
        "unit_id": "magnetism",
        "name": "Electromagnetic Force",
        "name_tr": "Elektromanyetik Kuvvet",
        "description": "Motor principle and force direction",
        "description_tr": "Motor prensibi ve manyetik kuvvet gözlemi",
        "type": "physics",
        "simulation_type": "motor",
        "parameters": [
            {"name": "current", "name_tr": "Akım", "min": 1, "max": 10, "default": 5, "unit": "A"},
            {"name": "field_strength", "name_tr": "Alan Şiddeti", "min": 0.1, "max": 2, "default": 1, "unit": "T"}
        ],
        "difficulty": "medium"
    },
    
    # --- Elektromanyetik İndüksiyon ---
    {
        "id": "faraday_law",
        "subject_id": "physics",
        "unit_id": "induction",
        "name": "Faraday's Law",
        "name_tr": "Faraday Yasası",
        "description": "Changing magnetic flux and induced EMF",
        "description_tr": "Değişen manyetik akı ve indüklenen EMK",
        "type": "physics",
        "simulation_type": "induction",
        "parameters": [
            {"name": "coil_speed", "name_tr": "Bobin Hızı", "min": 1, "max": 10, "default": 5, "unit": "m/s"},
            {"name": "field_strength", "name_tr": "Alan Şiddeti", "min": 0.1, "max": 2, "default": 1, "unit": "T"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "ac_generator",
        "subject_id": "physics",
        "unit_id": "induction",
        "name": "AC Generator",
        "name_tr": "Alternatif Akım Jeneratörü",
        "description": "Generator and transformer simulation",
        "description_tr": "Jeneratör ve transformatör, dönüş hızı ve sarım oranı",
        "type": "physics",
        "simulation_type": "generator",
        "parameters": [
            {"name": "rotation_speed", "name_tr": "Dönüş Hızı", "min": 100, "max": 3000, "default": 1000, "unit": "rpm"},
            {"name": "turns_ratio", "name_tr": "Sarım Oranı", "min": 1, "max": 10, "default": 2, "unit": ""}
        ],
        "difficulty": "medium"
    },
    
    # --- Dalgalar ---
    {
        "id": "mechanical_waves",
        "subject_id": "physics",
        "unit_id": "waves",
        "name": "Mechanical Waves",
        "name_tr": "Mekanik Dalgalar",
        "description": "Spring wave and water wave in AR",
        "description_tr": "Yay dalgası ve su dalgası, frekans/amplitüd ayarı",
        "type": "physics",
        "simulation_type": "wave",
        "parameters": [
            {"name": "frequency", "name_tr": "Frekans", "min": 0.5, "max": 5, "default": 2, "unit": "Hz"},
            {"name": "amplitude", "name_tr": "Genlik", "min": 1, "max": 10, "default": 5, "unit": "cm"},
            {"name": "wave_type", "name_tr": "Dalga Tipi", "options": ["transverse", "longitudinal"], "default": "transverse"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "sound_waves",
        "subject_id": "physics",
        "unit_id": "waves",
        "name": "Sound Waves",
        "name_tr": "Ses Dalgaları",
        "description": "Sound speed, echo, and resonance",
        "description_tr": "Ses hızı, yankı ve rezonans simülasyonu",
        "type": "physics",
        "simulation_type": "sound",
        "parameters": [
            {"name": "frequency", "name_tr": "Frekans", "min": 20, "max": 2000, "default": 440, "unit": "Hz"},
            {"name": "medium", "name_tr": "Ortam", "options": ["air", "water", "steel"], "default": "air"}
        ],
        "difficulty": "medium"
    },
    
    # --- Optik ---
    {
        "id": "reflection_refraction",
        "subject_id": "physics",
        "unit_id": "optics",
        "name": "Reflection and Refraction",
        "name_tr": "Yansıma ve Kırılma",
        "description": "Mirror and lens systems, refractive index",
        "description_tr": "Ayna ve lens sistemleri, ışın takibi ve odak uzaklığı",
        "type": "physics",
        "simulation_type": "optics",
        "parameters": [
            {"name": "angle", "name_tr": "Geliş Açısı", "min": 0, "max": 90, "default": 45, "unit": "°"},
            {"name": "n1", "name_tr": "n₁", "min": 1, "max": 2.5, "default": 1, "unit": ""},
            {"name": "n2", "name_tr": "n₂", "min": 1, "max": 2.5, "default": 1.5, "unit": ""}
        ],
        "difficulty": "medium"
    },
    {
        "id": "optical_instruments",
        "subject_id": "physics",
        "unit_id": "optics",
        "name": "Optical Instruments",
        "name_tr": "Optik Aletler",
        "description": "Eye structure, microscope, telescope",
        "description_tr": "Göz yapısı, mikroskop ve teleskop simülasyonu",
        "type": "physics",
        "simulation_type": "optics",
        "parameters": [
            {"name": "instrument", "name_tr": "Alet", "options": ["eye", "microscope", "telescope"], "default": "eye"},
            {"name": "magnification", "name_tr": "Büyütme", "min": 1, "max": 100, "default": 10, "unit": "x"}
        ],
        "difficulty": "medium"
    },
    
    # --- Dairesel Hareket ---
    {
        "id": "circular_motion",
        "subject_id": "physics",
        "unit_id": "circular_motion",
        "name": "Circular Motion",
        "name_tr": "Dairesel Hareket",
        "description": "Centripetal force and banked road",
        "description_tr": "Merkezcil kuvvet ve banklı yol simülasyonu",
        "type": "physics",
        "simulation_type": "circular",
        "parameters": [
            {"name": "velocity", "name_tr": "Hız", "min": 5, "max": 50, "default": 20, "unit": "m/s"},
            {"name": "radius", "name_tr": "Yarıçap", "min": 5, "max": 50, "default": 20, "unit": "m"},
            {"name": "bank_angle", "name_tr": "Bank Açısı", "min": 0, "max": 45, "default": 15, "unit": "°"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "kepler_laws",
        "subject_id": "physics",
        "unit_id": "circular_motion",
        "name": "Kepler's Laws",
        "name_tr": "Kepler Yasaları",
        "description": "Planetary motion and AR solar system",
        "description_tr": "Gezegen hareketleri ve AR güneş sistemi",
        "type": "physics",
        "simulation_type": "orbital",
        "parameters": [
            {"name": "planet", "name_tr": "Gezegen", "options": ["mercury", "venus", "earth", "mars", "jupiter"], "default": "earth"},
            {"name": "show_orbit", "name_tr": "Yörünge", "options": ["on", "off"], "default": "on"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "gravity",
        "subject_id": "physics",
        "unit_id": "circular_motion",
        "name": "Gravitational Force",
        "name_tr": "Kütle Çekimi",
        "description": "Gravitational force and acceleration",
        "description_tr": "Kütle çekimi kuvveti ve yerçekimi ivmesi",
        "type": "physics",
        "simulation_type": "gravity",
        "parameters": [
            {"name": "mass1", "name_tr": "Kütle 1", "min": 1, "max": 100, "default": 10, "unit": "kg"},
            {"name": "mass2", "name_tr": "Kütle 2", "min": 1, "max": 100, "default": 20, "unit": "kg"},
            {"name": "distance", "name_tr": "Mesafe", "min": 1, "max": 10, "default": 5, "unit": "m"}
        ],
        "difficulty": "medium"
    },
    
    # --- Momentum ---
    {
        "id": "impulse_momentum",
        "subject_id": "physics",
        "unit_id": "momentum",
        "name": "Impulse-Momentum",
        "name_tr": "İtme-Momentum",
        "description": "Collision and momentum conservation",
        "description_tr": "Çarpışma ve momentum korunumu simülasyonu",
        "type": "physics",
        "simulation_type": "momentum",
        "parameters": [
            {"name": "mass", "name_tr": "Kütle", "min": 1, "max": 20, "default": 5, "unit": "kg"},
            {"name": "velocity", "name_tr": "Hız", "min": 1, "max": 30, "default": 10, "unit": "m/s"},
            {"name": "collision_time", "name_tr": "Çarpışma Süresi", "min": 0.01, "max": 1, "default": 0.1, "unit": "s"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "rocket_motion",
        "subject_id": "physics",
        "unit_id": "momentum",
        "name": "Rocket Motion",
        "name_tr": "Roket Hareketi",
        "description": "Mass change and thrust force",
        "description_tr": "Kütle değişimi ve itme kuvveti simülasyonu",
        "type": "physics",
        "simulation_type": "rocket",
        "parameters": [
            {"name": "initial_mass", "name_tr": "Başlangıç Kütlesi", "min": 100, "max": 10000, "default": 1000, "unit": "kg"},
            {"name": "burn_rate", "name_tr": "Yanma Hızı", "min": 1, "max": 100, "default": 10, "unit": "kg/s"},
            {"name": "exhaust_velocity", "name_tr": "Egzoz Hızı", "min": 1000, "max": 5000, "default": 3000, "unit": "m/s"}
        ],
        "difficulty": "hard"
    },
    
    # --- Sıvıların Mekaniği ---
    {
        "id": "hydrostatic_pressure",
        "subject_id": "physics",
        "unit_id": "fluids",
        "name": "Hydrostatic Pressure",
        "name_tr": "Hidrostatik Basınç",
        "description": "Static fluids and Pascal's principle",
        "description_tr": "Hidrostatik basınç, derinlik ve yoğunluk ayarı",
        "type": "physics",
        "simulation_type": "fluid",
        "parameters": [
            {"name": "depth", "name_tr": "Derinlik", "min": 1, "max": 50, "default": 10, "unit": "m"},
            {"name": "density", "name_tr": "Yoğunluk", "min": 500, "max": 2000, "default": 1000, "unit": "kg/m³"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "bernoulli",
        "subject_id": "physics",
        "unit_id": "fluids",
        "name": "Bernoulli's Principle",
        "name_tr": "Bernoulli Prensibi",
        "description": "Flow velocity and pipe diameter",
        "description_tr": "Akış hızı ve boru çapı ilişkisi",
        "type": "physics",
        "simulation_type": "fluid",
        "parameters": [
            {"name": "flow_velocity", "name_tr": "Akış Hızı", "min": 1, "max": 20, "default": 5, "unit": "m/s"},
            {"name": "pipe_diameter", "name_tr": "Boru Çapı", "min": 1, "max": 10, "default": 5, "unit": "cm"}
        ],
        "difficulty": "medium"
    },
    
    # --- Termodinamik ---
    {
        "id": "heat_transfer",
        "subject_id": "physics",
        "unit_id": "thermodynamics",
        "name": "Heat Transfer",
        "name_tr": "Isı İletimi",
        "description": "Conduction, convection, and radiation",
        "description_tr": "İletim, taşınım ve ışınım simülasyonu",
        "type": "physics",
        "simulation_type": "thermal",
        "parameters": [
            {"name": "material", "name_tr": "Malzeme", "options": ["copper", "wood", "glass", "steel"], "default": "copper"},
            {"name": "temp_diff", "name_tr": "Sıcaklık Farkı", "min": 10, "max": 200, "default": 50, "unit": "°C"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "phase_change",
        "subject_id": "physics",
        "unit_id": "thermodynamics",
        "name": "Phase Change",
        "name_tr": "Hal Değişimi",
        "description": "Melting, evaporation, sublimation",
        "description_tr": "Erime, buharlaşma ve süblimleşme, ısıtma eğrisi",
        "type": "physics",
        "simulation_type": "phase",
        "parameters": [
            {"name": "substance", "name_tr": "Madde", "options": ["water", "ethanol", "iron"], "default": "water"},
            {"name": "heat_rate", "name_tr": "Isıtma Hızı", "min": 10, "max": 200, "default": 50, "unit": "J/s"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "carnot_cycle",
        "subject_id": "physics",
        "unit_id": "thermodynamics",
        "name": "Carnot Cycle",
        "name_tr": "Carnot Çevrimi",
        "description": "Thermodynamic laws and efficiency",
        "description_tr": "Termodinamik yasaları ve verim hesaplama",
        "type": "physics",
        "simulation_type": "cycle",
        "parameters": [
            {"name": "t_hot", "name_tr": "Sıcak Rezervuar", "min": 300, "max": 800, "default": 500, "unit": "K"},
            {"name": "t_cold", "name_tr": "Soğuk Rezervuar", "min": 200, "max": 400, "default": 300, "unit": "K"}
        ],
        "difficulty": "hard"
    },
    
    # --- Modern Fizik ---
    {
        "id": "photoelectric",
        "subject_id": "physics",
        "unit_id": "modern_physics",
        "name": "Photoelectric Effect",
        "name_tr": "Fotoelektrik Olay",
        "description": "Light frequency and work function",
        "description_tr": "Metal seçimi ve ışık şiddeti ile fotoelektrik olay",
        "type": "physics",
        "simulation_type": "quantum",
        "parameters": [
            {"name": "metal", "name_tr": "Metal", "options": ["sodium", "potassium", "zinc", "copper"], "default": "sodium"},
            {"name": "wavelength", "name_tr": "Dalga Boyu", "min": 200, "max": 700, "default": 400, "unit": "nm"},
            {"name": "intensity", "name_tr": "Şiddet", "min": 1, "max": 10, "default": 5, "unit": "W/m²"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "bohr_atom",
        "subject_id": "physics",
        "unit_id": "modern_physics",
        "name": "Bohr Atom Model",
        "name_tr": "Bohr Atom Modeli",
        "description": "Energy levels and spectral lines",
        "description_tr": "Enerji seviyeleri, elektron geçişleri ve foton emisyonu",
        "type": "physics",
        "simulation_type": "atomic",
        "parameters": [
            {"name": "element", "name_tr": "Element", "options": ["hydrogen", "helium", "lithium"], "default": "hydrogen"},
            {"name": "transition", "name_tr": "Geçiş", "options": ["emission", "absorption"], "default": "emission"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "radioactivity",
        "subject_id": "physics",
        "unit_id": "modern_physics",
        "name": "Radioactivity",
        "name_tr": "Radyoaktivite",
        "description": "Alpha, beta, gamma decay",
        "description_tr": "Alfa, beta, gama bozunması ve yarı ömür hesaplama",
        "type": "physics",
        "simulation_type": "nuclear",
        "parameters": [
            {"name": "isotope", "name_tr": "İzotop", "options": ["uranium-238", "carbon-14", "cobalt-60"], "default": "carbon-14"},
            {"name": "initial_amount", "name_tr": "Başlangıç Miktarı", "min": 100, "max": 10000, "default": 1000, "unit": "atoms"}
        ],
        "difficulty": "hard"
    },
    
    # ==================== BİYOLOJİ SİMÜLASYONLARI ====================
    
    # --- Hücre Yapısı ---
    {
        "id": "cell_structure",
        "subject_id": "biology",
        "unit_id": "cell_structure",
        "name": "Cell Structure",
        "name_tr": "Hücre Yapısı",
        "description": "Prokaryote-eukaryote comparison",
        "description_tr": "Ökaryotik hücrede organelleri ve işlevlerini keşfedin",
        "type": "biology",
        "simulation_type": "cell",
        "parameters": [
            {"name": "cell_type", "name_tr": "Hücre Tipi", "options": ["animal", "plant"], "default": "animal"},
            {"name": "zoom", "name_tr": "Yakınlaştırma", "min": 1, "max": 10, "default": 1, "unit": "x"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "organelles",
        "subject_id": "biology",
        "unit_id": "cell_structure",
        "name": "Cell Organelles",
        "name_tr": "Hücre Organelleri",
        "description": "Mitochondria, chloroplast, ribosome, Golgi, ER, lysosome, nucleus",
        "description_tr": "Her organeli dokunarak açın ve fonksiyonunu görün",
        "type": "biology",
        "simulation_type": "organelle",
        "parameters": [
            {"name": "organelle", "name_tr": "Organel", "options": ["nucleus", "mitochondria", "chloroplast", "ribosome", "golgi", "er", "lysosome"], "default": "nucleus"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "cell_membrane",
        "subject_id": "biology",
        "unit_id": "cell_structure",
        "name": "Cell Membrane",
        "name_tr": "Hücre Zarı",
        "description": "Fluid mosaic model, diffusion, osmosis",
        "description_tr": "Akışkan mozaik model, difüzyon ve osmoz simülasyonu",
        "type": "biology",
        "simulation_type": "membrane",
        "parameters": [
            {"name": "concentration", "name_tr": "Konsantrasyon Farkı", "min": 0, "max": 100, "default": 50, "unit": "%"},
            {"name": "transport_type", "name_tr": "Taşınım", "options": ["diffusion", "osmosis", "active"], "default": "diffusion"}
        ],
        "difficulty": "medium"
    },
    
    # --- Hücre Bölünmesi ---
    {
        "id": "mitosis",
        "subject_id": "biology",
        "unit_id": "cell_division",
        "name": "Mitosis",
        "name_tr": "Mitoz Bölünme",
        "description": "Prophase, metaphase, anaphase, telophase animation",
        "description_tr": "Profaz, metafaz, anafaz, telofaz aşamalarını izleyin",
        "type": "biology",
        "simulation_type": "division",
        "parameters": [
            {"name": "speed", "name_tr": "Hız", "min": 0.5, "max": 3, "default": 1, "unit": "x"},
            {"name": "phase", "name_tr": "Evre", "options": ["interphase", "prophase", "metaphase", "anaphase", "telophase"], "default": "interphase"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "meiosis",
        "subject_id": "biology",
        "unit_id": "cell_division",
        "name": "Meiosis",
        "name_tr": "Mayoz Bölünme",
        "description": "Meiosis I and II, crossing-over, genetic diversity",
        "description_tr": "Mayoz I ve II, crossing-over ve genetik çeşitlilik",
        "type": "biology",
        "simulation_type": "division",
        "parameters": [
            {"name": "speed", "name_tr": "Hız", "min": 0.5, "max": 3, "default": 1, "unit": "x"},
            {"name": "show_crossing", "name_tr": "Crossing-over", "options": ["on", "off"], "default": "on"}
        ],
        "difficulty": "medium"
    },
    
    # --- Kalıtım ---
    {
        "id": "mendel_genetics",
        "subject_id": "biology",
        "unit_id": "heredity",
        "name": "Mendel Genetics",
        "name_tr": "Mendel Genetiği",
        "description": "Dominant-recessive, Punnett square",
        "description_tr": "Dominant-resesif özellikler ve çaprazlama simülasyonu",
        "type": "biology",
        "simulation_type": "genetics",
        "parameters": [
            {"name": "trait", "name_tr": "Özellik", "options": ["flower_color", "seed_shape", "plant_height"], "default": "flower_color"},
            {"name": "parent1", "name_tr": "Ebeveyn 1", "options": ["AA", "Aa", "aa"], "default": "Aa"},
            {"name": "parent2", "name_tr": "Ebeveyn 2", "options": ["AA", "Aa", "aa"], "default": "Aa"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "blood_types",
        "subject_id": "biology",
        "unit_id": "heredity",
        "name": "Blood Types",
        "name_tr": "Kan Grupları",
        "description": "ABO system and Rh factor",
        "description_tr": "ABO sistemi, Rh faktörü ve kan uyumsuzluğu",
        "type": "biology",
        "simulation_type": "genetics",
        "parameters": [
            {"name": "parent1", "name_tr": "Ebeveyn 1", "options": ["A", "B", "AB", "O"], "default": "A"},
            {"name": "parent2", "name_tr": "Ebeveyn 2", "options": ["A", "B", "AB", "O"], "default": "B"},
            {"name": "rh1", "name_tr": "Rh 1", "options": ["+", "-"], "default": "+"},
            {"name": "rh2", "name_tr": "Rh 2", "options": ["+", "-"], "default": "-"}
        ],
        "difficulty": "medium"
    },
    
    # --- Ekosistem ---
    {
        "id": "food_chain",
        "subject_id": "biology",
        "unit_id": "ecosystem",
        "name": "Food Chain",
        "name_tr": "Besin Zinciri",
        "description": "Producer-consumer-decomposer",
        "description_tr": "Üretici-tüketici-ayrıştırıcı ve popülasyon değişimi",
        "type": "biology",
        "simulation_type": "ecosystem",
        "parameters": [
            {"name": "ecosystem", "name_tr": "Ekosistem", "options": ["forest", "ocean", "grassland"], "default": "forest"},
            {"name": "time_scale", "name_tr": "Zaman Ölçeği", "min": 1, "max": 100, "default": 10, "unit": "yıl"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "matter_cycles",
        "subject_id": "biology",
        "unit_id": "ecosystem",
        "name": "Matter Cycles",
        "name_tr": "Madde Döngüleri",
        "description": "Carbon, nitrogen, water cycle",
        "description_tr": "Karbon, azot ve su döngüsü simülasyonu",
        "type": "biology",
        "simulation_type": "cycle",
        "parameters": [
            {"name": "cycle", "name_tr": "Döngü", "options": ["carbon", "nitrogen", "water"], "default": "carbon"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "energy_pyramid",
        "subject_id": "biology",
        "unit_id": "ecosystem",
        "name": "Energy Pyramid",
        "name_tr": "Enerji Piramidi",
        "description": "Number, biomass, energy pyramids",
        "description_tr": "Sayı, biyokütle ve enerji piramitleri",
        "type": "biology",
        "simulation_type": "pyramid",
        "parameters": [
            {"name": "pyramid_type", "name_tr": "Piramit Tipi", "options": ["number", "biomass", "energy"], "default": "energy"},
            {"name": "efficiency", "name_tr": "Verimlilik", "min": 5, "max": 20, "default": 10, "unit": "%"}
        ],
        "difficulty": "medium"
    },
    
    # --- Biyokimya ---
    {
        "id": "biomolecules",
        "subject_id": "biology",
        "unit_id": "biochemistry",
        "name": "Biomolecules",
        "name_tr": "Biyomoleküller",
        "description": "Carbohydrate, lipid, protein, nucleic acid structures",
        "description_tr": "Karbonhidrat, lipit, protein ve nükleik asit yapıları",
        "type": "biology",
        "simulation_type": "molecule",
        "parameters": [
            {"name": "molecule", "name_tr": "Molekül", "options": ["glucose", "starch", "triglyceride", "protein", "dna"], "default": "glucose"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "enzymes",
        "subject_id": "biology",
        "unit_id": "biochemistry",
        "name": "Enzymes",
        "name_tr": "Enzimler",
        "description": "Active site, substrate fit, inhibition",
        "description_tr": "Aktif bölge, substrat uyumu ve inhibisyon",
        "type": "biology",
        "simulation_type": "enzyme",
        "parameters": [
            {"name": "enzyme", "name_tr": "Enzim", "options": ["amylase", "lipase", "protease"], "default": "amylase"},
            {"name": "inhibitor", "name_tr": "İnhibitör", "options": ["none", "competitive", "noncompetitive"], "default": "none"},
            {"name": "temperature", "name_tr": "Sıcaklık", "min": 0, "max": 100, "default": 37, "unit": "°C"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "cellular_respiration",
        "subject_id": "biology",
        "unit_id": "biochemistry",
        "name": "Cellular Respiration",
        "name_tr": "Hücre Solunumu",
        "description": "Glycolysis, Krebs, ETC, fermentation",
        "description_tr": "Glikoliz, Krebs, ETC ve fermantasyon - mitokondri içinde yolculuk",
        "type": "biology",
        "simulation_type": "metabolism",
        "parameters": [
            {"name": "stage", "name_tr": "Aşama", "options": ["glycolysis", "krebs", "etc", "fermentation"], "default": "glycolysis"},
            {"name": "oxygen", "name_tr": "Oksijen", "options": ["aerobic", "anaerobic"], "default": "aerobic"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "photosynthesis",
        "subject_id": "biology",
        "unit_id": "biochemistry",
        "name": "Photosynthesis",
        "name_tr": "Fotosentez",
        "description": "Light-dependent and independent reactions",
        "description_tr": "Işık bağımlı/bağımsız reaksiyonlar, kloroplast ve pigmentler",
        "type": "biology",
        "simulation_type": "metabolism",
        "parameters": [
            {"name": "stage", "name_tr": "Aşama", "options": ["light_dependent", "calvin_cycle"], "default": "light_dependent"},
            {"name": "light_intensity", "name_tr": "Işık Şiddeti", "min": 0, "max": 100, "default": 50, "unit": "%"}
        ],
        "difficulty": "hard"
    },
    
    # --- Sinir Sistemi ---
    {
        "id": "brain_structure",
        "subject_id": "biology",
        "unit_id": "nervous_system",
        "name": "Brain Structure",
        "name_tr": "Beyin Yapısı",
        "description": "Brain lobes, spinal cord, ventricles",
        "description_tr": "Beyin lobları, omurilik ve ventrikülleri keşfedin",
        "type": "biology",
        "simulation_type": "anatomy",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["sagittal", "coronal", "axial"], "default": "sagittal"},
            {"name": "region", "name_tr": "Bölge", "options": ["frontal", "parietal", "temporal", "occipital", "cerebellum"], "default": "frontal"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "neuron_impulse",
        "subject_id": "biology",
        "unit_id": "nervous_system",
        "name": "Neuron Impulse",
        "name_tr": "Sinir İmpulsu",
        "description": "Neuron structure, synapse, impulse transmission",
        "description_tr": "Nöron yapısı, sinaps ve aksiyon potansiyeli animasyonu",
        "type": "biology",
        "simulation_type": "neuron",
        "parameters": [
            {"name": "speed", "name_tr": "Hız", "min": 0.5, "max": 3, "default": 1, "unit": "x"},
            {"name": "show_ion_channels", "name_tr": "İyon Kanalları", "options": ["on", "off"], "default": "on"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "reflex_arc",
        "subject_id": "biology",
        "unit_id": "nervous_system",
        "name": "Reflex Arc",
        "name_tr": "Refleks Yayı",
        "description": "Sympathetic-parasympathetic and reflex arc",
        "description_tr": "Sempatik-parasempatik sistem ve refleks yayı",
        "type": "biology",
        "simulation_type": "reflex",
        "parameters": [
            {"name": "stimulus", "name_tr": "Uyaran", "options": ["heat", "pain", "light"], "default": "heat"}
        ],
        "difficulty": "medium"
    },
    
    # --- Dolaşım Sistemi ---
    {
        "id": "heart_structure",
        "subject_id": "biology",
        "unit_id": "circulatory",
        "name": "Heart Structure",
        "name_tr": "Kalp Yapısı",
        "description": "Heart chambers, valves, conduction system",
        "description_tr": "Kalp odacıkları, kapakçıklar ve ileti sistemi",
        "type": "biology",
        "simulation_type": "heart",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["external", "internal", "electrical"], "default": "internal"},
            {"name": "heart_rate", "name_tr": "Kalp Hızı", "min": 40, "max": 180, "default": 72, "unit": "bpm"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "blood_vessels",
        "subject_id": "biology",
        "unit_id": "circulatory",
        "name": "Blood Vessels",
        "name_tr": "Kan Damarları",
        "description": "Arteries, veins, capillaries",
        "description_tr": "Atardamar, toplardamar, kılcal damar ve kan akışı",
        "type": "biology",
        "simulation_type": "vessel",
        "parameters": [
            {"name": "vessel_type", "name_tr": "Damar Tipi", "options": ["artery", "vein", "capillary"], "default": "artery"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "blood_cells",
        "subject_id": "biology",
        "unit_id": "circulatory",
        "name": "Blood Cells",
        "name_tr": "Kan Hücreleri",
        "description": "Red blood cells, white blood cells, platelets, plasma",
        "description_tr": "Alyuvar, akyuvar, trombosit ve plazma - mikroskop altında",
        "type": "biology",
        "simulation_type": "blood",
        "parameters": [
            {"name": "zoom", "name_tr": "Büyütme", "min": 100, "max": 1000, "default": 400, "unit": "x"}
        ],
        "difficulty": "easy"
    },
    
    # --- Solunum Sistemi ---
    {
        "id": "lungs_structure",
        "subject_id": "biology",
        "unit_id": "respiratory",
        "name": "Lungs Structure",
        "name_tr": "Akciğer Yapısı",
        "description": "Bronchi, alveoli, gas exchange",
        "description_tr": "Bronşlar, alveoller ve gaz değişimi simülasyonu",
        "type": "biology",
        "simulation_type": "lungs",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["overview", "bronchi", "alveoli"], "default": "overview"},
            {"name": "breathing_rate", "name_tr": "Solunum Hızı", "min": 10, "max": 30, "default": 16, "unit": "/min"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "gas_exchange",
        "subject_id": "biology",
        "unit_id": "respiratory",
        "name": "Gas Exchange",
        "name_tr": "Gaz Değişimi",
        "description": "O2/CO2 diffusion, respiratory volume",
        "description_tr": "O2/CO2 difüzyonu ve solunum hacmi simülasyonu",
        "type": "biology",
        "simulation_type": "gas",
        "parameters": [
            {"name": "activity_level", "name_tr": "Aktivite", "options": ["rest", "light", "intense"], "default": "rest"}
        ],
        "difficulty": "medium"
    },
    
    # --- Sindirim Sistemi ---
    {
        "id": "digestive_tract",
        "subject_id": "biology",
        "unit_id": "digestive",
        "name": "Digestive Tract",
        "name_tr": "Sindirim Kanalı",
        "description": "Mouth, stomach, intestines, liver",
        "description_tr": "Ağız, mide, bağırsaklar ve karaciğer simülasyonu",
        "type": "biology",
        "simulation_type": "digestive",
        "parameters": [
            {"name": "organ", "name_tr": "Organ", "options": ["mouth", "stomach", "small_intestine", "large_intestine", "liver"], "default": "stomach"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "nutrient_digestion",
        "subject_id": "biology",
        "unit_id": "digestive",
        "name": "Nutrient Digestion",
        "name_tr": "Besin Sindirimi",
        "description": "Protein, fat, carbohydrate digestion",
        "description_tr": "Protein, yağ, karbonhidrat sindirimi ve emilimi",
        "type": "biology",
        "simulation_type": "digestion",
        "parameters": [
            {"name": "nutrient", "name_tr": "Besin", "options": ["carbohydrate", "protein", "fat"], "default": "carbohydrate"}
        ],
        "difficulty": "medium"
    },
    
    # --- Genetik ---
    {
        "id": "dna_structure",
        "subject_id": "biology",
        "unit_id": "genetics",
        "name": "DNA Structure",
        "name_tr": "DNA Yapısı",
        "description": "Double helix, base pairing, replication fork",
        "description_tr": "Çift sarmal, baz eşleşmesi ve replikasyon çatalı",
        "type": "biology",
        "simulation_type": "dna",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["structure", "replication", "base_pairing"], "default": "structure"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "protein_synthesis",
        "subject_id": "biology",
        "unit_id": "genetics",
        "name": "Protein Synthesis",
        "name_tr": "Protein Sentezi",
        "description": "Transcription and translation",
        "description_tr": "mRNA sentezi, ribozom ve protein sentezi simülasyonu",
        "type": "biology",
        "simulation_type": "synthesis",
        "parameters": [
            {"name": "stage", "name_tr": "Aşama", "options": ["transcription", "translation"], "default": "transcription"},
            {"name": "speed", "name_tr": "Hız", "min": 0.5, "max": 3, "default": 1, "unit": "x"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "genetic_engineering",
        "subject_id": "biology",
        "unit_id": "genetics",
        "name": "Genetic Engineering",
        "name_tr": "Gen Mühendisliği",
        "description": "Restriction enzymes, vectors, PCR",
        "description_tr": "Restriksiyon enzimleri, vektörler ve PCR simülasyonu",
        "type": "biology",
        "simulation_type": "engineering",
        "parameters": [
            {"name": "technique", "name_tr": "Teknik", "options": ["restriction", "ligation", "pcr", "transformation"], "default": "restriction"}
        ],
        "difficulty": "hard"
    },
    
    # ==================== KİMYA SİMÜLASYONLARI ====================
    
    # --- Atom Yapısı ---
    {
        "id": "atom_models",
        "subject_id": "chemistry",
        "unit_id": "atomic_structure",
        "name": "Atomic Models",
        "name_tr": "Atom Modelleri",
        "description": "Dalton, Thomson, Rutherford, Bohr, quantum models",
        "description_tr": "Dalton'dan Kuantum'a farklı atom modellerini keşfedin",
        "type": "chemistry",
        "simulation_type": "atom",
        "parameters": [
            {"name": "model", "name_tr": "Model", "options": ["dalton", "thomson", "rutherford", "bohr", "quantum"], "default": "bohr"},
            {"name": "element", "name_tr": "Element", "options": ["hydrogen", "helium", "carbon", "oxygen"], "default": "hydrogen"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "subatomic_particles",
        "subject_id": "chemistry",
        "unit_id": "atomic_structure",
        "name": "Subatomic Particles",
        "name_tr": "Atom Altı Parçacıklar",
        "description": "Proton, neutron, electron, isotope, ion",
        "description_tr": "Atom kurma ve kütle numarası hesaplama",
        "type": "chemistry",
        "simulation_type": "particle",
        "parameters": [
            {"name": "protons", "name_tr": "Proton", "min": 1, "max": 20, "default": 6, "unit": ""},
            {"name": "neutrons", "name_tr": "Nötron", "min": 0, "max": 20, "default": 6, "unit": ""},
            {"name": "electrons", "name_tr": "Elektron", "min": 0, "max": 20, "default": 6, "unit": ""}
        ],
        "difficulty": "easy"
    },
    {
        "id": "electron_config",
        "subject_id": "chemistry",
        "unit_id": "atomic_structure",
        "name": "Electron Configuration",
        "name_tr": "Elektron Dizilimi",
        "description": "Quantum numbers, orbital filling, Pauli, Hund",
        "description_tr": "Kuantum sayıları ve elektron yerleştirme oyunu",
        "type": "chemistry",
        "simulation_type": "orbital",
        "parameters": [
            {"name": "element", "name_tr": "Element", "options": ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"], "default": "C"}
        ],
        "difficulty": "medium"
    },
    
    # --- Periyodik Sistem ---
    {
        "id": "periodic_table",
        "subject_id": "chemistry",
        "unit_id": "periodic_table",
        "name": "Periodic Table",
        "name_tr": "Periyodik Tablo",
        "description": "Groups, periods, periodic properties",
        "description_tr": "Element özellikleriyle interaktif periyodik tablo",
        "type": "chemistry",
        "simulation_type": "periodic",
        "parameters": [
            {"name": "view", "name_tr": "Görünüm", "options": ["standard", "electron_config", "electronegativity"], "default": "standard"},
            {"name": "highlight", "name_tr": "Vurgula", "options": ["none", "metals", "nonmetals", "metalloids"], "default": "none"}
        ],
        "difficulty": "easy"
    },
    {
        "id": "periodic_trends",
        "subject_id": "chemistry",
        "unit_id": "periodic_table",
        "name": "Periodic Trends",
        "name_tr": "Periyodik Eğilimler",
        "description": "Conductivity, density, melting point comparison",
        "description_tr": "İletkenlik, yoğunluk ve erime noktası karşılaştırma",
        "type": "chemistry",
        "simulation_type": "trends",
        "parameters": [
            {"name": "property", "name_tr": "Özellik", "options": ["atomic_radius", "ionization_energy", "electronegativity", "melting_point"], "default": "atomic_radius"}
        ],
        "difficulty": "medium"
    },
    
    # --- Kimyasal Türler ---
    {
        "id": "chemical_bonds",
        "subject_id": "chemistry",
        "unit_id": "chemical_species",
        "name": "Chemical Bonds",
        "name_tr": "Kimyasal Bağlar",
        "description": "Ionic-covalent compounds, Lewis structures",
        "description_tr": "İyonik ve kovalent bağlar, Lewis yapıları",
        "type": "chemistry",
        "simulation_type": "bonding",
        "parameters": [
            {"name": "bond_type", "name_tr": "Bağ Tipi", "options": ["ionic", "covalent", "metallic"], "default": "covalent"},
            {"name": "compound", "name_tr": "Bileşik", "options": ["NaCl", "H2O", "CO2", "CH4", "NH3"], "default": "H2O"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "molecular_geometry",
        "subject_id": "chemistry",
        "unit_id": "chemical_species",
        "name": "Molecular Geometry",
        "name_tr": "Molekül Geometrisi",
        "description": "VSEPR theory and molecular shapes",
        "description_tr": "VSEPR teorisi ve molekül şekilleri",
        "type": "chemistry",
        "simulation_type": "geometry",
        "parameters": [
            {"name": "molecule", "name_tr": "Molekül", "options": ["H2O", "NH3", "CH4", "CO2", "BF3", "SF6"], "default": "H2O"}
        ],
        "difficulty": "medium"
    },
    
    # --- Mol Kavramı ---
    {
        "id": "avogadro_number",
        "subject_id": "chemistry",
        "unit_id": "mole_concept",
        "name": "Avogadro's Number",
        "name_tr": "Avogadro Sayısı",
        "description": "Mole, molar mass, molar volume",
        "description_tr": "Mol, molar kütle ve atom/molekül sayısı hesaplama",
        "type": "chemistry",
        "simulation_type": "mole",
        "parameters": [
            {"name": "substance", "name_tr": "Madde", "options": ["H2", "O2", "H2O", "NaCl", "CaCO3"], "default": "H2O"},
            {"name": "mass", "name_tr": "Kütle", "min": 1, "max": 100, "default": 18, "unit": "g"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "stoichiometry",
        "subject_id": "chemistry",
        "unit_id": "mole_concept",
        "name": "Stoichiometry",
        "name_tr": "Stokiyometri",
        "description": "Reaction equations, limiting reactant",
        "description_tr": "Tepkime denklemleri ve sınırlayıcı reaktif hesaplama",
        "type": "chemistry",
        "simulation_type": "stoichiometry",
        "parameters": [
            {"name": "reaction", "name_tr": "Tepkime", "options": ["combustion", "synthesis", "decomposition"], "default": "combustion"}
        ],
        "difficulty": "medium"
    },
    
    # --- Kimyasal Tepkimeler ---
    {
        "id": "reaction_types",
        "subject_id": "chemistry",
        "unit_id": "reactions",
        "name": "Reaction Types",
        "name_tr": "Tepkime Türleri",
        "description": "Synthesis, decomposition, single replacement, combustion",
        "description_tr": "Sentez, ayrışma, tek yer değiştirme ve yanma tepkimeleri",
        "type": "chemistry",
        "simulation_type": "reaction",
        "parameters": [
            {"name": "type", "name_tr": "Tür", "options": ["synthesis", "decomposition", "single_replacement", "double_replacement", "combustion"], "default": "synthesis"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "redox_reactions",
        "subject_id": "chemistry",
        "unit_id": "reactions",
        "name": "Redox Reactions",
        "name_tr": "Redoks Tepkimeleri",
        "description": "Oxidation states, half reactions",
        "description_tr": "Yükseltgenme basamakları ve yarı tepkimeler",
        "type": "chemistry",
        "simulation_type": "redox",
        "parameters": [
            {"name": "reaction", "name_tr": "Tepkime", "options": ["metal_acid", "combustion", "corrosion"], "default": "metal_acid"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "electrochemistry",
        "subject_id": "chemistry",
        "unit_id": "reactions",
        "name": "Electrochemistry",
        "name_tr": "Elektrokimya",
        "description": "Galvanic cells, standard reduction potentials",
        "description_tr": "Galvanik piller ve standart indirgenme potansiyelleri",
        "type": "chemistry",
        "simulation_type": "electrochemistry",
        "parameters": [
            {"name": "anode", "name_tr": "Anot", "options": ["Zn", "Cu", "Fe", "Ag"], "default": "Zn"},
            {"name": "cathode", "name_tr": "Katot", "options": ["Cu", "Ag", "Au", "Pt"], "default": "Cu"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "electrolysis",
        "subject_id": "chemistry",
        "unit_id": "reactions",
        "name": "Electrolysis",
        "name_tr": "Elektroliz",
        "description": "Faraday's laws, electrolytic cells",
        "description_tr": "Faraday yasaları ve elektroliz hücreleri",
        "type": "chemistry",
        "simulation_type": "electrolysis",
        "parameters": [
            {"name": "electrolyte", "name_tr": "Elektrolit", "options": ["NaCl_molten", "NaCl_aqueous", "CuSO4", "H2SO4"], "default": "NaCl_aqueous"},
            {"name": "current", "name_tr": "Akım", "min": 0.5, "max": 5, "default": 2, "unit": "A"}
        ],
        "difficulty": "hard"
    },
    
    # --- Kimyasal Denge ---
    {
        "id": "dynamic_equilibrium",
        "subject_id": "chemistry",
        "unit_id": "equilibrium",
        "name": "Dynamic Equilibrium",
        "name_tr": "Dinamik Denge",
        "description": "Forward-reverse reaction rates, equilibrium constant",
        "description_tr": "İleri-geri tepkime hızları ve denge sabiti",
        "type": "chemistry",
        "simulation_type": "equilibrium",
        "parameters": [
            {"name": "reaction", "name_tr": "Tepkime", "options": ["N2O4_NO2", "H2_I2_HI", "CO_H2O_CO2_H2"], "default": "N2O4_NO2"},
            {"name": "temperature", "name_tr": "Sıcaklık", "min": 200, "max": 500, "default": 300, "unit": "K"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "le_chatelier",
        "subject_id": "chemistry",
        "unit_id": "equilibrium",
        "name": "Le Chatelier's Principle",
        "name_tr": "Le Chatelier Prensibi",
        "description": "Temperature, pressure, concentration effects",
        "description_tr": "Sıcaklık, basınç ve konsantrasyon etkisiyle denge kayması",
        "type": "chemistry",
        "simulation_type": "le_chatelier",
        "parameters": [
            {"name": "change", "name_tr": "Değişiklik", "options": ["add_reactant", "remove_product", "increase_pressure", "increase_temperature"], "default": "add_reactant"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "acid_base_equilibrium",
        "subject_id": "chemistry",
        "unit_id": "equilibrium",
        "name": "Acid-Base Equilibrium",
        "name_tr": "Asit-Baz Dengesi",
        "description": "Water autoionization, Ka, Kb, Kw",
        "description_tr": "Su otoyonizasyonu, Ka, Kb, Kw ve pH hesaplama",
        "type": "chemistry",
        "simulation_type": "acid_base",
        "parameters": [
            {"name": "acid", "name_tr": "Asit", "options": ["HCl", "CH3COOH", "H2SO4", "HNO3"], "default": "CH3COOH"},
            {"name": "concentration", "name_tr": "Konsantrasyon", "min": 0.001, "max": 1, "default": 0.1, "unit": "M"}
        ],
        "difficulty": "medium"
    },
    
    # --- Termokimya ---
    {
        "id": "enthalpy",
        "subject_id": "chemistry",
        "unit_id": "thermochemistry",
        "name": "Enthalpy",
        "name_tr": "Entalpi",
        "description": "Exothermic-endothermic, formation enthalpy",
        "description_tr": "Ekzotermik-endotermik tepkimeler ve kalorimetre",
        "type": "chemistry",
        "simulation_type": "enthalpy",
        "parameters": [
            {"name": "reaction_type", "name_tr": "Tepkime Tipi", "options": ["exothermic", "endothermic"], "default": "exothermic"},
            {"name": "reaction", "name_tr": "Tepkime", "options": ["combustion", "neutralization", "dissolution"], "default": "combustion"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "hess_law",
        "subject_id": "chemistry",
        "unit_id": "thermochemistry",
        "name": "Hess's Law",
        "name_tr": "Hess Yasası",
        "description": "Enthalpy diagrams, bond energies",
        "description_tr": "Entalpi diyagramları ve bağ enerjileri",
        "type": "chemistry",
        "simulation_type": "hess",
        "parameters": [
            {"name": "pathway", "name_tr": "Yol", "options": ["direct", "indirect"], "default": "direct"}
        ],
        "difficulty": "hard"
    },
    {
        "id": "gibbs_energy",
        "subject_id": "chemistry",
        "unit_id": "thermochemistry",
        "name": "Gibbs Free Energy",
        "name_tr": "Gibbs Serbest Enerjisi",
        "description": "Spontaneous processes, entropy",
        "description_tr": "Spontan süreçler ve ΔG = ΔH - TΔS hesaplama",
        "type": "chemistry",
        "simulation_type": "gibbs",
        "parameters": [
            {"name": "delta_h", "name_tr": "ΔH", "min": -200, "max": 200, "default": -100, "unit": "kJ/mol"},
            {"name": "delta_s", "name_tr": "ΔS", "min": -500, "max": 500, "default": 100, "unit": "J/mol·K"},
            {"name": "temperature", "name_tr": "Sıcaklık", "min": 200, "max": 500, "default": 298, "unit": "K"}
        ],
        "difficulty": "hard"
    },
    
    # --- Kimyasal Kinetik ---
    {
        "id": "reaction_rates",
        "subject_id": "chemistry",
        "unit_id": "kinetics",
        "name": "Reaction Rates",
        "name_tr": "Tepkime Hızları",
        "description": "Rate expressions, rate constant",
        "description_tr": "Hız ifadeleri ve konsantrasyon-zaman grafikleri",
        "type": "chemistry",
        "simulation_type": "kinetics",
        "parameters": [
            {"name": "order", "name_tr": "Derece", "options": ["zero", "first", "second"], "default": "first"},
            {"name": "concentration", "name_tr": "Konsantrasyon", "min": 0.1, "max": 2, "default": 1, "unit": "M"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "collision_theory",
        "subject_id": "chemistry",
        "unit_id": "kinetics",
        "name": "Collision Theory",
        "name_tr": "Çarpışma Teorisi",
        "description": "Activation energy, Arrhenius equation",
        "description_tr": "Aktivasyon enerjisi, sıcaklık ve katalizör etkisi",
        "type": "chemistry",
        "simulation_type": "collision",
        "parameters": [
            {"name": "temperature", "name_tr": "Sıcaklık", "min": 200, "max": 500, "default": 300, "unit": "K"},
            {"name": "catalyst", "name_tr": "Katalizör", "options": ["none", "present"], "default": "none"},
            {"name": "activation_energy", "name_tr": "Ea", "min": 20, "max": 200, "default": 75, "unit": "kJ/mol"}
        ],
        "difficulty": "medium"
    },
    
    # --- Organik Kimya ---
    {
        "id": "hybridization",
        "subject_id": "chemistry",
        "unit_id": "organic_basics",
        "name": "Hybridization",
        "name_tr": "Hibritleşme",
        "description": "sp3, sp2, sp carbon, sigma-pi bonds",
        "description_tr": "sp3, sp2, sp karbon ve molekül geometrisi",
        "type": "chemistry",
        "simulation_type": "hybridization",
        "parameters": [
            {"name": "type", "name_tr": "Tür", "options": ["sp3", "sp2", "sp"], "default": "sp3"},
            {"name": "molecule", "name_tr": "Molekül", "options": ["methane", "ethene", "ethyne"], "default": "methane"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "isomers",
        "subject_id": "chemistry",
        "unit_id": "organic_basics",
        "name": "Isomers",
        "name_tr": "İzomerler",
        "description": "Structural, geometric, optical isomers",
        "description_tr": "Yapı, geometri ve optik izomeri - izomer eşleştirme",
        "type": "chemistry",
        "simulation_type": "isomers",
        "parameters": [
            {"name": "isomer_type", "name_tr": "İzomer Tipi", "options": ["structural", "geometric", "optical"], "default": "structural"},
            {"name": "compound", "name_tr": "Bileşik", "options": ["butane", "butene", "lactic_acid"], "default": "butane"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "functional_groups",
        "subject_id": "chemistry",
        "unit_id": "organic_basics",
        "name": "Functional Groups",
        "name_tr": "Fonksiyonel Gruplar",
        "description": "Alkane, alkene, alkyne, alcohol, ether, carbonyl",
        "description_tr": "Fonksiyonel grup tanıma ve adlandırma",
        "type": "chemistry",
        "simulation_type": "functional",
        "parameters": [
            {"name": "group", "name_tr": "Grup", "options": ["alkane", "alkene", "alkyne", "alcohol", "aldehyde", "ketone", "carboxylic_acid", "amine"], "default": "alcohol"}
        ],
        "difficulty": "medium"
    },
    
    # --- Hidrokarbonlar ---
    {
        "id": "alkanes",
        "subject_id": "chemistry",
        "unit_id": "hydrocarbons",
        "name": "Alkanes",
        "name_tr": "Alkanlar",
        "description": "Conformations, Newman projection, energy profile",
        "description_tr": "Konformasyonlar, Newman projeksiyonu ve enerji profili",
        "type": "chemistry",
        "simulation_type": "alkane",
        "parameters": [
            {"name": "alkane", "name_tr": "Alkan", "options": ["ethane", "propane", "butane"], "default": "ethane"},
            {"name": "conformation", "name_tr": "Konformasyon", "options": ["staggered", "eclipsed", "gauche", "anti"], "default": "staggered"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "alkenes",
        "subject_id": "chemistry",
        "unit_id": "hydrocarbons",
        "name": "Alkenes",
        "name_tr": "Alkenler",
        "description": "E/Z isomers, electrophilic addition mechanism",
        "description_tr": "E/Z izomeri ve elektrofilik katılma mekanizması",
        "type": "chemistry",
        "simulation_type": "alkene",
        "parameters": [
            {"name": "alkene", "name_tr": "Alken", "options": ["ethene", "propene", "butene"], "default": "ethene"},
            {"name": "reaction", "name_tr": "Tepkime", "options": ["hydrogenation", "halogenation", "hydration"], "default": "hydrogenation"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "aromatics",
        "subject_id": "chemistry",
        "unit_id": "hydrocarbons",
        "name": "Aromatic Compounds",
        "name_tr": "Aromatik Bileşikler",
        "description": "Benzene, resonance, Hückel rule",
        "description_tr": "Benzen, rezonans ve elektrofilik aromatik ikame",
        "type": "chemistry",
        "simulation_type": "aromatic",
        "parameters": [
            {"name": "compound", "name_tr": "Bileşik", "options": ["benzene", "toluene", "phenol", "aniline"], "default": "benzene"},
            {"name": "reaction", "name_tr": "Tepkime", "options": ["nitration", "halogenation", "sulfonation"], "default": "nitration"}
        ],
        "difficulty": "hard"
    },
    
    # --- Biyokimya ---
    {
        "id": "carbohydrates",
        "subject_id": "chemistry",
        "unit_id": "biochem",
        "name": "Carbohydrates",
        "name_tr": "Karbonhidratlar",
        "description": "Monosaccharides, glycosidic bond, polysaccharides",
        "description_tr": "Monosakkaritler, glikozidik bağ ve polisakkaritler",
        "type": "chemistry",
        "simulation_type": "carbohydrate",
        "parameters": [
            {"name": "sugar", "name_tr": "Şeker", "options": ["glucose", "fructose", "sucrose", "starch", "cellulose"], "default": "glucose"},
            {"name": "form", "name_tr": "Form", "options": ["open_chain", "ring"], "default": "ring"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "lipids",
        "subject_id": "chemistry",
        "unit_id": "biochem",
        "name": "Lipids",
        "name_tr": "Lipitler",
        "description": "Fatty acids, glycerol, phospholipid, membrane",
        "description_tr": "Yağ asitleri, gliserol, fosfolipit ve membran yapısı",
        "type": "chemistry",
        "simulation_type": "lipid",
        "parameters": [
            {"name": "lipid_type", "name_tr": "Lipit Tipi", "options": ["triglyceride", "phospholipid", "steroid"], "default": "phospholipid"},
            {"name": "saturation", "name_tr": "Doygunluk", "options": ["saturated", "unsaturated"], "default": "unsaturated"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "proteins",
        "subject_id": "chemistry",
        "unit_id": "biochem",
        "name": "Proteins",
        "name_tr": "Proteinler",
        "description": "Amino acids, peptide bond, protein structure levels",
        "description_tr": "Aminoasitler, peptit bağı ve protein yapı düzeyleri",
        "type": "chemistry",
        "simulation_type": "protein",
        "parameters": [
            {"name": "level", "name_tr": "Düzey", "options": ["primary", "secondary", "tertiary", "quaternary"], "default": "secondary"},
            {"name": "structure", "name_tr": "Yapı", "options": ["alpha_helix", "beta_sheet"], "default": "alpha_helix"}
        ],
        "difficulty": "medium"
    },
    
    # --- Çevre Kimyası ---
    {
        "id": "air_pollution",
        "subject_id": "chemistry",
        "unit_id": "environmental",
        "name": "Air Pollution",
        "name_tr": "Hava Kirliliği",
        "description": "CO, NOx, SO2, ozone, particulate matter",
        "description_tr": "Atmosferik reaksiyonlar ve asit yağmuru simülasyonu",
        "type": "chemistry",
        "simulation_type": "pollution",
        "parameters": [
            {"name": "pollutant", "name_tr": "Kirletici", "options": ["CO", "NO2", "SO2", "O3", "PM"], "default": "NO2"},
            {"name": "concentration", "name_tr": "Konsantrasyon", "min": 0, "max": 500, "default": 100, "unit": "ppm"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "water_pollution",
        "subject_id": "chemistry",
        "unit_id": "environmental",
        "name": "Water Pollution",
        "name_tr": "Su Kirliliği",
        "description": "BOD, COD, heavy metals, detergents",
        "description_tr": "Arıtma süreçleri ve filtrasyon simülasyonu",
        "type": "chemistry",
        "simulation_type": "water",
        "parameters": [
            {"name": "pollutant", "name_tr": "Kirletici", "options": ["organic", "heavy_metal", "nutrient"], "default": "organic"},
            {"name": "treatment", "name_tr": "Arıtma", "options": ["physical", "chemical", "biological"], "default": "biological"}
        ],
        "difficulty": "medium"
    },
    {
        "id": "soil_pollution",
        "subject_id": "chemistry",
        "unit_id": "environmental",
        "name": "Soil Pollution",
        "name_tr": "Toprak Kirliliği",
        "description": "Pesticides, plastics, bioaccumulation",
        "description_tr": "Besin zinciri ve biyomagnifikasyon simülasyonu",
        "type": "chemistry",
        "simulation_type": "soil",
        "parameters": [
            {"name": "pollutant", "name_tr": "Kirletici", "options": ["pesticide", "plastic", "heavy_metal"], "default": "pesticide"},
            {"name": "trophic_level", "name_tr": "Trofik Seviye", "min": 1, "max": 5, "default": 1, "unit": ""}
        ],
        "difficulty": "medium"
    },
]
