// BACKEND INTEGRATION REQUIRED
// Connect this service when backend AI / LLM conversational endpoint (/ai/chat) is available.
// Grounded in verified scheme data.

export const aiService = {
  sendMessage: async (userMessage, contextOpportunities = []) => {
    // Integration Placeholder for future LLM API backend endpoint
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('scholarship') || lowerMsg.includes('money') || lowerMsg.includes('stipend')) {
      return {
        reply: "Based on your verified profile, you qualify for several Post-Matric and Higher Education Scholarships offering up to ₹50,000/year. Ensure your Income Certificate (under ₹2.5 Lakh) and Aadhaar are uploaded for instant verification."
      };
    }
    
    if (lowerMsg.includes('document') || lowerMsg.includes('aadhaar') || lowerMsg.includes('proof')) {
      return {
        reply: "Standard government schemes usually require: 1. Aadhaar Card, 2. Domicile/Residence Certificate, 3. Income Proof (Income Certificate), 4. Educational Marksheets (Class X/XII/Degree), and 5. Category Certificate (if applicable)."
      };
    }

    if (lowerMsg.includes('eligibility') || lowerMsg.includes('match') || lowerMsg.includes('percent')) {
      return {
        reply: "SevaSetu matches your profile (Age, State, Annual Income, Course, Percentage) against official government notification criteria in real-time. If you meet 100% of criteria, you are tagged as 'Eligible'. If missing 1 requirement (e.g. year of study), you are tagged 'Near Eligible'."
      };
    }

    return {
      reply: "Greetings from SevaSetu Assistant! I can help explain scheme benefits, required documents, eligibility criteria, or step-by-step official application procedures. How can I assist you today?"
    };
  }
};

export default aiService;
