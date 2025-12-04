// AMATYA Political Consulting Platform - Enhanced JavaScript

// ====================== GLOBAL STATE ======================
const state = {
  // Authentication
  isAuthenticated: false,
  currentUser: null,
  authStep: 'email',
  
  // News and content
  currentNewsFilter: 'all',
  forumSort: 'latest',
  searchQuery: '',
  
  // User interactions
  userReactions: new Set(),
  userVotes: new Map(),
  
  // Active states
  activeNewsId: null,
  activeDiscussionId: null,
  
  // Data
  newsData: [],
  discussionData: [],
  
  // Loading states
  isLoading: false,
  newsLoading: false
};

// ====================== ENHANCED SERVICES DATA WITH SOPHISTICATED ICONS ======================
const servicesData = [
  {
    id: 1,
    title: "Electoral Strategy & Campaigns",
    description: "Booth-level war rooms, voter profiling, and micro-targeting strategies for winning elections.",
    iconType: "sophisticated-target",
    details: "Advanced electoral analysis and campaign management"
  },
  {
    id: 2,
    title: "Public Affairs & Reputation Management",
    description: "Narrative development, media relations, and crisis control for public image management.",
    iconType: "elegant-communication",
    details: "Strategic communication and brand management"
  },
  {
    id: 3,
    title: "Policy Research & Insights",
    description: "Data-driven advisory for governments, think-tanks, and NGOs with actionable insights.",
    iconType: "detailed-analytics",
    details: "Comprehensive policy analysis and research"
  },
  {
    id: 4,
    title: "Digital & Community Engagement",
    description: "Social media strategy, influencer networks, and civic technology innovation.",
    iconType: "modern-network",
    details: "Digital transformation and community building"
  }
];

// ====================== SOPHISTICATED SVG ICONS ======================
const serviceIcons = {
  "sophisticated-target": `
    <svg width="48" height="48" viewBox="0 0 48 48" class="service-icon-electoral">
      <defs>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#223355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF9933;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" stroke="url(#targetGrad)" stroke-width="2" fill="none"/>
      <circle cx="24" cy="24" r="15" stroke="url(#targetGrad)" stroke-width="2" fill="none" opacity="0.8"/>
      <circle cx="24" cy="24" r="10" stroke="url(#targetGrad)" stroke-width="2" fill="none" opacity="0.6"/>
      <circle cx="24" cy="24" r="5" stroke="url(#targetGrad)" stroke-width="2" fill="rgba(255,153,51,0.2)"/>
      <circle cx="24" cy="24" r="2" fill="url(#targetGrad)"/>
      <path d="M14 14 L34 34 M34 14 L14 34" stroke="url(#targetGrad)" stroke-width="1.5" opacity="0.4"/>
      <polygon points="24,6 26,12 22,12" fill="url(#targetGrad)" opacity="0.7"/>
      <polygon points="42,24 36,22 36,26" fill="url(#targetGrad)" opacity="0.7"/>
      <polygon points="24,42 22,36 26,36" fill="url(#targetGrad)" opacity="0.7"/>
      <polygon points="6,24 12,26 12,22" fill="url(#targetGrad)" opacity="0.7"/>
    </svg>
  `,
  
  "elegant-communication": `
    <svg width="48" height="48" viewBox="0 0 48 48" class="service-icon-public">
      <defs>
        <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#223355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF9933;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M8 32 L8 36 C8 38.2 9.8 40 12 40 L20 40 L24 44 L28 40 L36 40 C38.2 40 40 38.2 40 36 L40 16 C40 13.8 38.2 12 36 12 L12 12 C9.8 12 8 13.8 8 16 L8 32 Z" fill="url(#commGrad)" opacity="0.1" stroke="url(#commGrad)" stroke-width="2"/>
      <path d="M14 32 L14 34 C14 35.1 14.9 36 16 36 L22 36 L24 38 L26 36 L32 36 C33.1 36 34 35.1 34 34 L34 20 C34 18.9 33.1 18 32 18 L16 18 C14.9 18 14 18.9 14 20 L14 32 Z" fill="rgba(255,153,51,0.15)" stroke="url(#commGrad)" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="1.5" fill="url(#commGrad)"/>
      <circle cx="24" cy="25" r="1.5" fill="url(#commGrad)"/>
      <circle cx="28" cy="25" r="1.5" fill="url(#commGrad)"/>
      <path d="M2 8 L8 14 M8 8 L2 14" stroke="url(#commGrad)" stroke-width="1.5" opacity="0.6"/>
      <path d="M40 8 L46 14 M46 8 L40 14" stroke="url(#commGrad)" stroke-width="1.5" opacity="0.6"/>
      <circle cx="6" cy="6" r="2" fill="rgba(255,153,51,0.3)" stroke="url(#commGrad)" stroke-width="1"/>
      <circle cx="42" cy="6" r="2" fill="rgba(255,153,51,0.3)" stroke="url(#commGrad)" stroke-width="1"/>
    </svg>
  `,
  
  "detailed-analytics": `
    <svg width="48" height="48" viewBox="0 0 48 48" class="service-icon-research">
      <defs>
        <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#223355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF9933;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="40" height="32" rx="4" fill="rgba(34,51,85,0.05)" stroke="url(#analyticsGrad)" stroke-width="2"/>
      <rect x="8" y="32" width="4" height="6" fill="url(#analyticsGrad)" opacity="0.8"/>
      <rect x="14" y="28" width="4" height="10" fill="url(#analyticsGrad)" opacity="0.9"/>
      <rect x="20" y="24" width="4" height="14" fill="url(#analyticsGrad)"/>
      <rect x="26" y="20" width="4" height="18" fill="url(#analyticsGrad)" opacity="0.9"/>
      <rect x="32" y="26" width="4" height="12" fill="url(#analyticsGrad)" opacity="0.8"/>
      <rect x="38" y="30" width="4" height="8" fill="url(#analyticsGrad)" opacity="0.7"/>
      <path d="M10 22 L16 18 L22 16 L28 12 L34 16 L40 14" stroke="url(#analyticsGrad)" stroke-width="2" fill="none"/>
      <circle cx="10" cy="22" r="2" fill="rgba(255,153,51,0.8)"/>
      <circle cx="16" cy="18" r="2" fill="rgba(255,153,51,0.8)"/>
      <circle cx="22" cy="16" r="2" fill="rgba(255,153,51,0.8)"/>
      <circle cx="28" cy="12" r="2" fill="rgba(255,153,51,0.8)"/>
      <circle cx="34" cy="16" r="2" fill="rgba(255,153,51,0.8)"/>
      <circle cx="40" cy="14" r="2" fill="rgba(255,153,51,0.8)"/>
      <path d="M6 4 L10 4 M6 44 L10 44 M44 4 L40 4 M44 44 L40 44" stroke="url(#analyticsGrad)" stroke-width="2"/>
    </svg>
  `,
  
  "modern-network": `
    <svg width="48" height="48" viewBox="0 0 48 48" class="service-icon-digital">
      <defs>
        <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#223355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF9933;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="12" r="4" fill="rgba(255,153,51,0.2)" stroke="url(#networkGrad)" stroke-width="2"/>
      <circle cx="12" cy="24" r="4" fill="rgba(255,153,51,0.2)" stroke="url(#networkGrad)" stroke-width="2"/>
      <circle cx="36" cy="24" r="4" fill="rgba(255,153,51,0.2)" stroke="url(#networkGrad)" stroke-width="2"/>
      <circle cx="18" cy="36" r="4" fill="rgba(255,153,51,0.2)" stroke="url(#networkGrad)" stroke-width="2"/>
      <circle cx="30" cy="36" r="4" fill="rgba(255,153,51,0.2)" stroke="url(#networkGrad)" stroke-width="2"/>
      
      <line x1="24" y1="16" x2="15" y2="21" stroke="url(#networkGrad)" stroke-width="2" opacity="0.7"/>
      <line x1="24" y1="16" x2="33" y2="21" stroke="url(#networkGrad)" stroke-width="2" opacity="0.7"/>
      <line x1="16" y1="24" x2="20" y2="32" stroke="url(#networkGrad)" stroke-width="2" opacity="0.7"/>
      <line x1="32" y1="24" x2="28" y2="32" stroke="url(#networkGrad)" stroke-width="2" opacity="0.7"/>
      <line x1="22" y1="36" x2="26" y2="36" stroke="url(#networkGrad)" stroke-width="2" opacity="0.7"/>
      <line x1="16" y1="28" x2="32" y2="28" stroke="url(#networkGrad)" stroke-width="1.5" opacity="0.5"/>
      
      <circle cx="6" cy="6" r="2" fill="rgba(34,51,85,0.3)" stroke="url(#networkGrad)" stroke-width="1"/>
      <circle cx="42" cy="6" r="2" fill="rgba(34,51,85,0.3)" stroke="url(#networkGrad)" stroke-width="1"/>
      <circle cx="6" cy="42" r="2" fill="rgba(34,51,85,0.3)" stroke="url(#networkGrad)" stroke-width="1"/>
      <circle cx="42" cy="42" r="2" fill="rgba(34,51,85,0.3)" stroke="url(#networkGrad)" stroke-width="1"/>
      
      <path d="M6 6 L12 12 M42 6 L36 12 M6 42 L12 36 M42 42 L36 36" stroke="url(#networkGrad)" stroke-width="1" opacity="0.4"/>
      
      <circle cx="24" cy="12" r="1.5" fill="url(#networkGrad)"/>
      <circle cx="12" cy="24" r="1.5" fill="url(#networkGrad)"/>
      <circle cx="36" cy="24" r="1.5" fill="url(#networkGrad)"/>
      <circle cx="18" cy="36" r="1.5" fill="url(#networkGrad)"/>
      <circle cx="30" cy="36" r="1.5" fill="url(#networkGrad)"/>
    </svg>
  `
};

// ====================== OTHER DATA CONSTANTS ======================
const politicalSpectrumData = [
  {
    position: "Left Wing",
    parties: ["CPI", "CPI(M)"],
    ideology: "Socialism, secularism, workers' rights",
    focus: "Agricultural reforms, labor unions, social justice"
  },
  {
    position: "Centre-Left",
    parties: ["INC", "SP", "RJD"],
    ideology: "Social welfare, minority rights, inclusive growth",
    focus: "Social justice, economic redistribution"
  },
  {
    position: "Centre",
    parties: ["Regional parties"],
    ideology: "Pragmatic governance, state-specific issues",
    focus: "Coalition building, issue-based politics"
  },
  {
    position: "Centre-Right",
    parties: ["BJP"],
    ideology: "Cultural nationalism, economic liberalization",
    focus: "Development with cultural identity"
  },
  {
    position: "Right Wing",
    parties: ["Hindu nationalist orgs"],
    ideology: "Cultural conservatism, religious nationalism",
    focus: "Traditional values, cultural preservation"
  }
];

const policyPrioritiesData = [
  {
    title: "Productivity and Resilience in Agriculture",
    target: "1 crore farmers in natural farming",
    description: "109 new crop varieties, 10,000 bio-input centers"
  },
  {
    title: "Employment & Skilling",
    target: "50 lakh new jobs through incentives",
    description: "210 lakh youth benefit, 30% female participation"
  },
  {
    title: "Inclusive Human Resource Development",
    target: "150,000 health centers expansion",
    description: "10,000 Atal Tinkering Labs, Aspirational Districts"
  },
  {
    title: "Manufacturing & Services",
    target: "Make in India expansion",
    description: "MSME support, startup ecosystem, export hubs"
  },
  {
    title: "Urban Development",
    target: "1 crore families housing",
    description: "Smart cities, transit development, GIS mapping"
  },
  {
    title: "Energy Security",
    target: "Net-zero emissions by 2070",
    description: "50% renewable energy by 2030, nuclear research"
  },
  {
    title: "Infrastructure",
    target: "₹11 lakh crore investment",
    description: "PM GatiShakti, Bharatnet, rural roads"
  },
  {
    title: "Innovation, Research & Development",
    target: "Top 50 Global Innovation Index",
    description: "2% GDP for R&D, space economy, AI centers"
  },
  {
    title: "Next Generation Reforms",
    target: "ULPIN land identification",
    description: "e-Shram integration, regulatory review, digital governance"
  }
];

const reactionTypes = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "dislike", emoji: "👎", label: "Dislike" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "angry", emoji: "😠", label: "Angry" },
  { type: "surprise", emoji: "😮", label: "Surprise" }
];

// Initial news data
const initialNewsData = [
  {
    id: 1,
    title: "Parliament Monsoon Session 2025: 8 New Bills Including Jan Vishwas Amendment",
    summary: "The Parliament's monsoon session introduces significant legislative reforms including the Jan Vishwas Amendment Bill aimed at decriminalizing minor offenses and improving ease of doing business.",
    category: "national",
    date: "2025-07-19",
    source: "Times of India",
    reactions: { "👍": 45, "👎": 12, "😮": 15, "❤️": 8, "😠": 5 },
    discussion_count: 67,
    trending_score: 8.2
  },
  {
    id: 2,
    title: "India-China Relations: Historic Diplomatic Visit Yields LAC Disengagement Agreement",
    summary: "External Affairs Minister's visit to Beijing results in breakthrough agreements on LAC disengagement and renewed diplomatic dialogue mechanisms.",
    category: "international",
    date: "2025-07-19",
    source: "Hindustan Times",
    reactions: { "👍": 67, "👎": 8, "😮": 34, "❤️": 23, "😠": 3 },
    discussion_count: 123,
    trending_score: 9.1
  },
  {
    id: 3,
    title: "Opposition Demands Debate on Operation Sindoor and China Policy",
    summary: "Parliamentary opposition seeks comprehensive discussion on recent military operations and diplomatic strategies regarding border management with neighboring countries.",
    category: "national",
    date: "2025-07-19",
    source: "Indian Express",
    reactions: { "👍": 34, "👎": 18, "😮": 9, "❤️": 5, "😠": 12 },
    discussion_count: 89,
    trending_score: 8.7
  }
];

// Initial discussion data
const initialDiscussionData = [
  {
    id: 1,
    title: "Impact of Coalition Politics on Policy Implementation",
    author: "PolicyExpert",
    content: "The 2024 election results have brought coalition politics back to center stage. How will this affect major policy decisions and implementation timelines?",
    date: "2025-07-19",
    upvotes: 45,
    downvotes: 8,
    replies: 23,
    category: "policy",
    comments: [
      {
        id: 1,
        author: "DemocracyWatcher",
        content: "Coalition governments often lead to more inclusive policy-making but can slow down decision processes. The key is finding the right balance.",
        date: "2025-07-19"
      },
      {
        id: 2,
        author: "PoliticalAnalyst",
        content: "Current coalition dynamics require careful balancing of regional and national interests. This could actually strengthen federal democracy.",
        date: "2025-07-19"
      }
    ]
  },
  {
    id: 2,
    title: "India's Foreign Policy in a Multipolar World Order",
    author: "DiplomaticAnalyst",
    content: "With changing global dynamics and rising tensions between major powers, how should India position itself while maintaining strategic autonomy?",
    date: "2025-07-18",
    upvotes: 67,
    downvotes: 12,
    replies: 31,
    category: "international",
    comments: [
      {
        id: 1,
        author: "GlobalObserver",
        content: "India's multi-alignment strategy has served well historically. We should continue balancing relationships with all major powers while protecting our interests.",
        date: "2025-07-18"
      }
    ]
  },
  {
    id: 3,
    title: "Regional Parties and Ideological Spectrum Analysis",
    author: "SpectrumAnalyst",
    content: "Regional parties often defy traditional left-right classifications. How should we analyze their ideological positions in contemporary Indian politics?",
    date: "2025-07-17",
    upvotes: 34,
    downvotes: 6,
    replies: 19,
    category: "general",
    comments: []
  },
  {
    id: 4,
    title: "Digital Governance: Opportunities and Challenges",
    author: "TechPolicyExpert",
    content: "As India accelerates digital transformation in governance, what are the key challenges and opportunities we should focus on?",
    date: "2025-07-17",
    upvotes: 52,
    downvotes: 7,
    replies: 25,
    category: "governance",
    comments: []
  }
];

// Initialize data
state.newsData = [...initialNewsData];
state.discussionData = [...initialDiscussionData];

// Comments storage
const newsComments = new Map();

// ====================== UTILITY FUNCTIONS ======================
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(dateString);
}

function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="padding-right: 2rem;">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// ====================== SMOOTH SCROLLING NAVIGATION ======================
function scrollToSection(sectionId) {
  console.log('Smooth scrolling to section:', sectionId);
  
  // Remove # if present
  const targetId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
  const targetSection = document.getElementById(targetId);
  
  if (targetSection) {
    // Calculate offset for fixed navbar
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    const elementPosition = targetSection.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
    
    // Update navbar active state
    updateNavbarActive(targetId);
    
    console.log('Smooth scroll completed to:', targetId);
  } else {
    console.error('Section not found:', targetId);
  }
}

function updateNavbarActive(activeSection) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${activeSection}`) {
      link.classList.add('active');
    }
  });
}

// ====================== API SIMULATION ======================
async function simulateApiCall(endpoint, method = 'GET', data = null) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  // Simulate API responses
  switch (endpoint) {
    case '/auth/send-otp':
      return { success: true, message: 'OTP sent successfully' };
    case '/auth/verify-otp':
      return { success: true, token: 'mock-jwt-token', user: { email: data.email } };
    case '/news':
      return { success: true, data: state.newsData };
    case '/forum/posts':
      return { success: true, data: state.discussionData };
    default:
      return { success: true, data: {} };
  }
}

// ====================== AUTHENTICATION ======================
function showAuthModal() {
  console.log('Showing auth modal');
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    state.authStep = 'email';
    updateAuthStep();
    
    // Clear inputs
    const emailInput = document.getElementById('authEmail');
    const otpInput = document.getElementById('authOtp');
    if (emailInput) emailInput.value = '';
    if (otpInput) otpInput.value = '';
  }
}

function hideAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function handleAuthClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  console.log('Auth button clicked, authenticated:', state.isAuthenticated);
  
  if (state.isAuthenticated) {
    // Sign out
    signOut();
  } else {
    // Show sign in modal
    showAuthModal();
  }
}

function signOut() {
  state.isAuthenticated = false;
  state.currentUser = null;
  
  updateAuthButton();
  showToast('Signed out successfully', 'info');
  
  // Clear user interactions
  state.userReactions.clear();
  state.userVotes.clear();
  
  // Refresh content
  renderNews();
  renderDiscussions();
}

function updateAuthButton() {
  const authBtn = document.getElementById('authBtn');
  const userProfile = document.getElementById('userProfile');
  const userName = document.getElementById('userName');
  
  if (state.isAuthenticated && state.currentUser) {
    if (authBtn) authBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'block';
    if (userName) {
      const username = state.currentUser.email.split('@')[0];
      userName.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
  } else {
    if (authBtn) {
      authBtn.style.display = 'inline-flex';
      authBtn.textContent = 'Sign In';
    }
    if (userProfile) userProfile.style.display = 'none';
  }
}

function updateAuthStep() {
  const emailStep = document.getElementById('emailStep');
  const otpStep = document.getElementById('otpStep');
  
  if (state.authStep === 'email') {
    emailStep?.classList.remove('hidden');
    otpStep?.classList.add('hidden');
  } else {
    emailStep?.classList.add('hidden');
    otpStep?.classList.remove('hidden');
  }
}

async function sendOTP(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const emailInput = document.getElementById('authEmail');
  const email = emailInput?.value?.trim();
  
  if (!email || !validateEmail(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  
  try {
    showLoading();
    console.log('Sending OTP to:', email);
    
    const response = await simulateApiCall('/auth/send-otp', 'POST', { email });
    
    if (response.success) {
      state.pendingEmail = email;
      state.authStep = 'otp';
      updateAuthStep();
      showToast('OTP sent to your email. Demo OTP: 123456', 'success');
    }
  } catch (error) {
    showToast('Failed to send OTP. Please try again.', 'error');
  } finally {
    hideLoading();
  }
}

async function verifyOTP(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const otpInput = document.getElementById('authOtp');
  const otp = otpInput?.value?.trim();
  
  if (!otp || otp.length !== 6) {
    showToast('Please enter a valid 6-digit OTP', 'error');
    return;
  }
  
  try {
    showLoading();
    console.log('Verifying OTP:', otp);
    
    // Accept any 6-digit OTP for demo purposes
    if (otp.length === 6) {
      state.isAuthenticated = true;
      state.currentUser = { email: state.pendingEmail };
      
      updateAuthButton();
      hideAuthModal();
      showToast(`Welcome to AMATYA, ${state.currentUser.email.split('@')[0]}!`, 'success');
      
      // Refresh content for authenticated user
      renderNews();
      renderDiscussions();
    } else {
      throw new Error('Invalid OTP');
    }
  } catch (error) {
    showToast('Invalid OTP. Please try again.', 'error');
  } finally {
    hideLoading();
  }
}

async function resendOTP(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (state.pendingEmail) {
    try {
      showLoading();
      await simulateApiCall('/auth/send-otp', 'POST', { email: state.pendingEmail });
      showToast('OTP resent successfully. Use: 123456', 'success');
    } catch (error) {
      showToast('Failed to resend OTP', 'error');
    } finally {
      hideLoading();
    }
  }
}

// ====================== ENHANCED SERVICES RENDERING ======================
function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = servicesData.map(service => `
    <div class="service-card fade-in">
      <div class="service-icon">
        ${serviceIcons[service.iconType]}
      </div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join('');
}

// ====================== POLITICAL SPECTRUM RENDERING ======================
function renderPoliticalSpectrum() {
  const spectrumDetails = document.getElementById('spectrumDetails');
  if (!spectrumDetails) return;
  
  spectrumDetails.innerHTML = politicalSpectrumData.map((wing, index) => `
    <div class="wing-card ${wing.position.toLowerCase().replace(' ', '-')}-card fade-in">
      <h3>${wing.position}</h3>
      <div class="wing-parties">
        ${wing.parties.map(party => `<span class="party-tag">${party}</span>`).join('')}
      </div>
      <p class="wing-ideology">${wing.ideology}</p>
      <p class="wing-focus">${wing.focus}</p>
    </div>
  `).join('');
}

// ====================== POLICY PRIORITIES RENDERING ======================
function renderPolicyPriorities() {
  const policyContainer = document.getElementById('policyPriorities');
  if (!policyContainer) return;
  
  policyContainer.innerHTML = policyPrioritiesData.map((priority, index) => `
    <div class="priority-card fade-in">
      <div class="priority-number">${String(index + 1).padStart(2, '0')}</div>
      <h3>${priority.title}</h3>
      <p class="priority-description">${priority.description}</p>
      <div class="priority-targets">
        <strong>Key Targets:</strong> ${priority.target}
      </div>
    </div>
  `).join('');
}

// ====================== NEWS FUNCTIONALITY ======================
function renderNews() {
  const container = document.getElementById('newsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  let filteredNews = state.newsData;
  
  // Apply category filter
  if (state.currentNewsFilter !== 'all') {
    filteredNews = filteredNews.filter(news => news.category === state.currentNewsFilter);
  }
  
  // Apply search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filteredNews = filteredNews.filter(news => 
      news.title.toLowerCase().includes(query) || 
      news.summary.toLowerCase().includes(query)
    );
  }
  
  // Sort by trending score and date
  filteredNews.sort((a, b) => {
    const scoreA = a.trending_score || 0;
    const scoreB = b.trending_score || 0;
    if (scoreA !== scoreB) return scoreB - scoreA;
    return new Date(b.date) - new Date(a.date);
  });
  
  if (filteredNews.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--color-text-secondary);">
        <p>No news articles found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  filteredNews.forEach(news => {
    const newsCard = createNewsCard(news);
    container.appendChild(newsCard);
  });
  
  // Render trending articles
  renderTrendingNews();
}

function createNewsCard(news) {
  const card = document.createElement('div');
  card.className = 'news-card fade-in';
  
  const reactionButtons = reactionTypes.map(reaction => {
    const count = news.reactions[reaction.emoji] || 0;
    const isActive = state.userReactions.has(`${news.id}-${reaction.emoji}`);
    
    return `
      <button class="reaction-btn ${isActive ? 'active' : ''}" 
              onclick="toggleReaction(${news.id}, '${reaction.emoji}')"
              title="${reaction.label}">
        ${reaction.emoji} <span class="reaction-count">${count}</span>
      </button>
    `;
  }).join('');
  
  card.innerHTML = `
    <div class="news-header">
      <div class="news-category">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</div>
      <h3 class="news-title">${news.title}</h3>
      <div class="news-meta">
        <span>${formatRelativeTime(news.date)} • ${news.source}</span>
        <span>🔥 ${news.trending_score}/10</span>
      </div>
    </div>
    <div class="news-body">
      <p class="news-summary">${news.summary}</p>
      <div class="news-actions">
        <div class="reactions">
          ${reactionButtons}
        </div>
        <button class="discuss-btn" onclick="showNewsDiscussion(${news.id})">
          💬 Discuss (${news.discussion_count || 0})
        </button>
      </div>
    </div>
  `;
  
  return card;
}

function renderTrendingNews() {
  const container = document.getElementById('trendingArticles');
  if (!container) return;
  
  // Get top 5 trending articles
  const trending = [...state.newsData]
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 5);
  
  container.innerHTML = trending.map(news => `
    <div class="trending-article" onclick="showNewsDiscussion(${news.id})">
      <div class="news-category">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</div>
      <h4 style="font-size: 0.9rem; margin: 0.5rem 0; line-height: 1.3;">${news.title}</h4>
      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">
        🔥 ${news.trending_score}/10 • ${news.discussion_count || 0} comments
      </div>
    </div>
  `).join('');
}

function filterNews(category) {
  state.currentNewsFilter = category;
  
  // Update active button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[data-category="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  renderNews();
}

function searchNews() {
  const searchInput = document.getElementById('newsSearch');
  if (searchInput) {
    state.searchQuery = searchInput.value.trim();
    renderNews();
  }
}

function toggleReaction(newsId, emoji) {
  if (!state.isAuthenticated) {
    showToast('Please sign in to react to news', 'info');
    showAuthModal();
    return;
  }
  
  const reactionKey = `${newsId}-${emoji}`;
  const news = state.newsData.find(n => n.id === newsId);
  
  if (!news) return;
  
  if (state.userReactions.has(reactionKey)) {
    state.userReactions.delete(reactionKey);
    news.reactions[emoji] = Math.max(0, (news.reactions[emoji] || 0) - 1);
  } else {
    state.userReactions.add(reactionKey);
    news.reactions[emoji] = (news.reactions[emoji] || 0) + 1;
  }
  
  renderNews();
  showToast(`Reacted with ${emoji}`, 'success', 2000);
}

// ====================== NEWS DISCUSSION MODAL ======================
function showNewsDiscussion(newsId) {
  const news = state.newsData.find(n => n.id === newsId);
  if (!news) return;
  
  state.activeNewsId = newsId;
  
  const modal = document.getElementById('newsModal');
  const title = document.getElementById('newsModalTitle');
  const content = document.getElementById('newsModalContent');
  
  if (title) title.textContent = news.title;
  
  if (content) {
    const reactionSummary = Object.entries(news.reactions)
      .map(([emoji, count]) => `${emoji} ${count}`)
      .join(' • ');
    
    content.innerHTML = `
      <div class="news-category">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</div>
      <div class="news-meta" style="margin: 1rem 0;">
        <span>${formatRelativeTime(news.date)} • ${news.source}</span>
        <span>🔥 ${news.trending_score}/10</span>
      </div>
      <p class="news-summary" style="font-size: 1rem; line-height: 1.6; margin-bottom: 1rem;">${news.summary}</p>
      <div style="font-size: 0.875rem; color: var(--color-text-secondary); padding: 1rem; background-color: var(--color-gray-50); border-radius: 8px;">
        <strong>Community Reactions:</strong> ${reactionSummary}
      </div>
    `;
  }
  
  renderNewsComments(newsId);
  
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function hideNewsModal() {
  const modal = document.getElementById('newsModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  state.activeNewsId = null;
  
  // Clear comment input
  const commentInput = document.getElementById('commentInput');
  if (commentInput) commentInput.value = '';
}

function renderNewsComments(newsId) {
  const container = document.getElementById('commentsContainer');
  if (!container) return;
  
  const comments = newsComments.get(newsId) || [];
  
  if (comments.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">No comments yet. Be the first to share your thoughts!</p>';
    return;
  }
  
  container.innerHTML = comments.map(comment => `
    <div class="comment fade-in">
      <div class="comment-author">${comment.author}</div>
      <div class="comment-content">${comment.content}</div>
      <div class="comment-meta">
        <small>${formatRelativeTime(comment.date)}</small>
      </div>
    </div>
  `).join('');
}

function addNewsComment(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (!state.isAuthenticated) {
    showToast('Please sign in to comment', 'info');
    showAuthModal();
    return;
  }
  
  const textarea = document.getElementById('commentInput');
  const content = textarea?.value?.trim();
  
  if (!content) {
    showToast('Please enter a comment', 'error');
    return;
  }
  
  const newsId = state.activeNewsId;
  if (!newsId) return;
  
  if (!newsComments.has(newsId)) {
    newsComments.set(newsId, []);
  }
  
  const comment = {
    id: Date.now(),
    author: state.currentUser.email.split('@')[0],
    content: content,
    date: new Date().toISOString()
  };
  
  newsComments.get(newsId).push(comment);
  
  // Update discussion count
  const news = state.newsData.find(n => n.id === newsId);
  if (news) {
    news.discussion_count = (news.discussion_count || 0) + 1;
  }
  
  textarea.value = '';
  renderNewsComments(newsId);
  renderNews(); // Update discussion count in news cards
  showToast('Comment added successfully', 'success');
}

// ====================== FORUM FUNCTIONALITY ======================
function renderDiscussions() {
  const container = document.getElementById('discussionContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  let sortedDiscussions = [...state.discussionData];
  
  switch (state.forumSort) {
    case 'trending':
      sortedDiscussions.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      break;
    case 'most-discussed':
      sortedDiscussions.sort((a, b) => b.replies - a.replies);
      break;
    default: // latest
      sortedDiscussions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  if (sortedDiscussions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--color-text-secondary);">
        <p>No discussions yet. Start the first one!</p>
      </div>
    `;
    return;
  }
  
  sortedDiscussions.forEach(discussion => {
    const discussionCard = createDiscussionCard(discussion);
    container.appendChild(discussionCard);
  });
}

function createDiscussionCard(discussion) {
  const card = document.createElement('div');
  card.className = 'discussion-item fade-in';
  
  const userUpvoted = state.userVotes.get(`${discussion.id}-upvote`) || false;
  const userDownvoted = state.userVotes.get(`${discussion.id}-downvote`) || false;
  const netVotes = discussion.upvotes - discussion.downvotes;
  
  card.innerHTML = `
    <div class="discussion-header">
      <div class="discussion-content">
        <h3 class="discussion-title">${discussion.title}</h3>
        <div class="discussion-meta">
          By ${discussion.author} • ${formatRelativeTime(discussion.date)} • ${discussion.category}
        </div>
        ${discussion.content ? `<p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);">${discussion.content.substring(0, 150)}${discussion.content.length > 150 ? '...' : ''}</p>` : ''}
      </div>
      <div class="discussion-votes">
        <button class="vote-btn ${userUpvoted ? 'active' : ''}" 
                onclick="voteDiscussion(${discussion.id}, 'upvote')"
                title="Upvote">▲</button>
        <span class="vote-count">${netVotes}</span>
        <button class="vote-btn ${userDownvoted ? 'active' : ''}" 
                onclick="voteDiscussion(${discussion.id}, 'downvote')"
                title="Downvote">▼</button>
      </div>
    </div>
    <div class="discussion-stats">
      <span>💬 ${discussion.replies} replies</span>
      <span>👍 ${discussion.upvotes} upvotes</span>
      <span>📊 ${netVotes} net score</span>
    </div>
  `;
  
  return card;
}

function sortDiscussions(sortType) {
  state.forumSort = sortType;
  
  // Update active button
  document.querySelectorAll('.forum-section .filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-sort="${sortType}"]`)?.classList.add('active');
  
  renderDiscussions();
}

function voteDiscussion(discussionId, voteType) {
  if (!state.isAuthenticated) {
    showToast('Please sign in to vote', 'info');
    showAuthModal();
    return;
  }
  
  const discussion = state.discussionData.find(d => d.id === discussionId);
  if (!discussion) return;
  
  const voteKey = `${discussionId}-${voteType}`;
  const oppositeVoteKey = `${discussionId}-${voteType === 'upvote' ? 'downvote' : 'upvote'}`;
  
  // Remove opposite vote if exists
  if (state.userVotes.get(oppositeVoteKey)) {
    state.userVotes.delete(oppositeVoteKey);
    if (voteType === 'upvote') {
      discussion.downvotes = Math.max(0, discussion.downvotes - 1);
    } else {
      discussion.upvotes = Math.max(0, discussion.upvotes - 1);
    }
  }
  
  // Toggle current vote
  if (state.userVotes.get(voteKey)) {
    state.userVotes.delete(voteKey);
    if (voteType === 'upvote') {
      discussion.upvotes = Math.max(0, discussion.upvotes - 1);
    } else {
      discussion.downvotes = Math.max(0, discussion.downvotes - 1);
    }
    showToast(`${voteType === 'upvote' ? 'Upvote' : 'Downvote'} removed`, 'info', 2000);
  } else {
    state.userVotes.set(voteKey, true);
    if (voteType === 'upvote') {
      discussion.upvotes++;
    } else {
      discussion.downvotes++;
    }
    showToast(`${voteType === 'upvote' ? 'Upvoted' : 'Downvoted'} successfully`, 'success', 2000);
  }
  
  renderDiscussions();
}

function createDiscussion(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (!state.isAuthenticated) {
    showToast('Please sign in to create a discussion', 'info');
    showAuthModal();
    return;
  }
  
  const titleInput = document.getElementById('newDiscussionTitle');
  const title = titleInput?.value?.trim();
  
  if (!title) {
    showToast('Please enter a discussion title', 'error');
    return;
  }
  
  // Show forum post modal for detailed creation
  showForumPostModal(title);
  titleInput.value = '';
}

function showForumPostModal(initialTitle = '') {
  const modal = document.getElementById('forumPostModal');
  const titleInput = document.getElementById('postTitle');
  
  if (titleInput) titleInput.value = initialTitle;
  
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function hideForumPostModal() {
  const modal = document.getElementById('forumPostModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Clear form
    document.getElementById('forumPostForm')?.reset();
  }
}

function submitForumPost(e) {
  e.preventDefault();
  
  const title = document.getElementById('postTitle')?.value?.trim();
  const content = document.getElementById('postContent')?.value?.trim();
  const category = document.getElementById('postCategory')?.value;
  
  if (!title) {
    showToast('Please enter a discussion title', 'error');
    return;
  }
  
  const newDiscussion = {
    id: Date.now(),
    title: title,
    author: state.currentUser.email.split('@')[0],
    content: content || '',
    date: new Date().toISOString(),
    upvotes: 1, // Auto-upvote by creator
    downvotes: 0,
    replies: 0,
    category: category,
    comments: []
  };
  
  // Add creator's upvote
  state.userVotes.set(`${newDiscussion.id}-upvote`, true);
  
  state.discussionData.unshift(newDiscussion);
  hideForumPostModal();
  renderDiscussions();
  showToast('Discussion created successfully!', 'success');
  
  // Navigate to forum section
  scrollToSection('#forum');
}

// ====================== CONTACT FORM ======================
function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    organization: formData.get('organization'),
    phone: formData.get('phone'),
    message: formData.get('message')
  };
  
  // Validate form
  if (!data.name || !data.email || !data.message) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (!validateEmail(data.email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  
  showLoading();
  console.log('Contact form submission:', data);
  
  // Simulate form submission
  setTimeout(() => {
    hideLoading();
    event.target.reset();
    showToast('Thank you for your message! Our team will get back to you within 24 hours.', 'success');
  }, 1500);
}

// ====================== EVENT LISTENERS ======================
function initializeEventListeners() {
  console.log('Setting up event listeners...');
  
  // Navigation links with smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      scrollToSection(href);
    });
  });
  
  // Authentication - make sure to attach to the actual auth button
  const authBtn = document.getElementById('authBtn');
  if (authBtn) {
    authBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Auth button clicked');
      showAuthModal();
    });
    console.log('Added auth listener to sign in button');
  }
  
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  if (sendOtpBtn) sendOtpBtn.addEventListener('click', sendOTP);
  
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  if (verifyOtpBtn) verifyOtpBtn.addEventListener('click', verifyOTP);
  
  const resendOtpBtn = document.getElementById('resendOtpBtn');
  if (resendOtpBtn) resendOtpBtn.addEventListener('click', resendOTP);
  
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) signOutBtn.addEventListener('click', signOut);
  
  // Modal closes
  const closeAuthModal = document.getElementById('closeAuthModal');
  if (closeAuthModal) closeAuthModal.addEventListener('click', hideAuthModal);
  
  const closeNewsModal = document.getElementById('closeNewsModal');
  if (closeNewsModal) closeNewsModal.addEventListener('click', hideNewsModal);
  
  const closeForumModal = document.getElementById('closeForumModal');
  if (closeForumModal) closeForumModal.addEventListener('click', hideForumPostModal);
  
  // News functionality
  const addCommentBtn = document.getElementById('addCommentBtn');
  if (addCommentBtn) addCommentBtn.addEventListener('click', addNewsComment);
  
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) searchBtn.addEventListener('click', searchNews);
  
  const newsSearchInput = document.getElementById('newsSearch');
  if (newsSearchInput) {
    newsSearchInput.addEventListener('input', debounce(searchNews, 300));
    newsSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchNews();
      }
    });
  }
  
  // Forum functionality
  const createDiscussionBtn = document.getElementById('createDiscussionBtn');
  if (createDiscussionBtn) createDiscussionBtn.addEventListener('click', createDiscussion);
  
  const forumPostForm = document.getElementById('forumPostForm');
  if (forumPostForm) forumPostForm.addEventListener('submit', submitForumPost);
  
  const cancelPostBtn = document.getElementById('cancelPostBtn');
  if (cancelPostBtn) cancelPostBtn.addEventListener('click', hideForumPostModal);
  
  // Category filters
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-category');
      filterNews(category);
    });
  });
  
  // Forum sort filters
  document.querySelectorAll('.forum-section .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sortType = btn.getAttribute('data-sort');
      sortDiscussions(sortType);
    });
  });
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
    console.log('Added contact form listener');
  }
  
  // Modal backdrop clicks
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Enter key handlers
  const newDiscussionInput = document.getElementById('newDiscussionTitle');
  if (newDiscussionInput) {
    newDiscussionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        createDiscussion(e);
      }
    });
  }
  
  const commentInput = document.getElementById('commentInput');
  if (commentInput) {
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addNewsComment(e);
      }
    });
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
      hideAuthModal();
      hideNewsModal();
      hideForumPostModal();
    }
    
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('newsSearch');
      if (searchInput) {
        searchInput.focus();
        scrollToSection('#news');
      }
    }
  });
  
  console.log('Event listeners setup complete');
}

// ====================== UTILITY FUNCTIONS ======================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function checkAuthState() {
  // For demo purposes, don't restore session
  state.isAuthenticated = false;
  state.currentUser = null;
}

// ====================== INITIALIZATION ======================
function initializeApp() {
  console.log('🚀 Initializing AMATYA Political Consulting Platform...');
  
  // Check authentication state
  checkAuthState();
  
  // Initialize UI components
  renderServices();
  renderPoliticalSpectrum();
  renderPolicyPriorities();
  renderNews();
  renderDiscussions();
  updateAuthButton();
  
  // Initialize event listeners
  initializeEventListeners();
  
  // Make global functions available
  window.scrollToSection = scrollToSection;
  window.showNewsDiscussion = showNewsDiscussion;
  window.toggleReaction = toggleReaction;
  window.voteDiscussion = voteDiscussion;
  
  console.log('✅ AMATYA Platform initialized successfully!');
  console.log(`📊 Loaded: ${servicesData.length} services, ${state.newsData.length} news articles, ${state.discussionData.length} discussions`);
  
  // Show welcome message
  setTimeout(() => {
    showToast('Welcome to AMATYA - Your Political Intelligence Platform! 🇮🇳', 'success', 5000);
  }, 1000);
}

// ====================== APP STARTUP ======================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showNewsDiscussion = showNewsDiscussion;
window.toggleReaction = toggleReaction;
window.voteDiscussion = voteDiscussion;