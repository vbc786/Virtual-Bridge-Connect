export interface Lead {
  id: string;
  name: string;
  email: string;
  projectDescription?: string;
  budget?: string;
  chosenStack?: string;
  dateTime?: string;
  selectedTags?: string[];
  status: 'new' | 'analyzing' | 'scheduled' | 'reviewed' | 'archived';
  createdAt: any; // Can be Date or Firestore Timestamp
  updatedAt?: any;
}

export interface AuditLog {
  id: string;
  action: string;
  details?: string;
  timestamp: any;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string; // lucide icon name
  description: string;
  features: string[];
  pricingRange: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'CMS' | 'Frontend' | 'Mobile' | 'Automation';
  icon: string;
  description: string;
  benefits: string[];
  popularity: string; // e.g. "9.8/10 Dev Choice"
}

export interface ConsultingDiagram {
  id: string;
  title: string;
  systemFlow: string[];
  integrations: string[];
  roiEstimate: string;
}

export interface CampaignFramework {
  id: string;
  name: string;
  channel: string;
  description: string;
  roiMultiplier: number;
  tactics: string[];
}
