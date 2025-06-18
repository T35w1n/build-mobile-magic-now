
// Enhanced security utilities for input validation and sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*>/gi, '')
    .replace(/<meta\b[^<]*>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/expression\s*\(/gi, '')
    .trim()
    .slice(0, 1000); // Limit length to prevent abuse
};

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateAge = (age: number): boolean => {
  return Number.isInteger(age) && age >= 18 && age <= 120;
};

export const validateBio = (bio: string): boolean => {
  if (!bio || typeof bio !== 'string') return true; // Bio is optional
  return bio.length <= 500;
};

export const validateImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol) && url.length <= 2048;
  } catch {
    return false;
  }
};

export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  const nameRegex = /^[a-zA-Z\s\-'\.]{2,50}$/;
  return nameRegex.test(name.trim());
};

// Enhanced rate limiting utility with better security
export class RateLimiter {
  private static requests = new Map<string, number[]>();
  private static blocked = new Map<string, number>();
  
  static isAllowed(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    if (!identifier || typeof identifier !== 'string') return false;
    
    const now = Date.now();
    
    // Check if identifier is temporarily blocked
    const blockedUntil = this.blocked.get(identifier);
    if (blockedUntil && now < blockedUntil) {
      return false;
    }
    
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      // Block for extended period if repeatedly hitting limits
      if (validRequests.length >= maxRequests * 2) {
        this.blocked.set(identifier, now + (windowMs * 5)); // Block for 5x the window
      }
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }
    
    return true;
  }
  
  private static cleanup(): void {
    const now = Date.now();
    const maxAge = 3600000; // 1 hour
    
    // Clean up old request records
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < maxAge);
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
    
    // Clean up expired blocks
    for (const [key, blockedUntil] of this.blocked.entries()) {
      if (now >= blockedUntil) {
        this.blocked.delete(key);
      }
    }
  }
  
  static getRequestCount(identifier: string, windowMs: number = 60000): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    return userRequests.filter(time => now - time < windowMs).length;
  }
  
  static reset(identifier: string): void {
    this.requests.delete(identifier);
    this.blocked.delete(identifier);
  }
}

// Content filtering utility
export const containsInappropriateContent = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  
  const inappropriatePatterns = [
    /\b(fuck|shit|damn|bitch|asshole|bastard|cunt|piss)\b/gi,
    /\b(sex|nude|naked|porn|xxx)\b/gi,
    /\b(kill|murder|suicide|die|death)\b/gi,
    /\b(drug|cocaine|heroin|meth|weed|marijuana)\b/gi,
  ];
  
  return inappropriatePatterns.some(pattern => pattern.test(text));
};

// Privacy utility for masking sensitive data
export const maskEmail = (email: string): string => {
  if (!email || !validateEmail(email)) return '';
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;
  return `${username.slice(0, 2)}${'*'.repeat(username.length - 2)}@${domain}`;
};

export const maskPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 4) return phone;
  return `${'*'.repeat(cleaned.length - 4)}${cleaned.slice(-4)}`;
};
