import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, setDoc, deleteDoc, onSnapshot, query, orderBy, getDocFromServer, Timestamp } from 'firebase/firestore';
import { Lead, AuditLog } from './types';
import firebaseConfig from './firebase-applet-config.json';

// Detect if this is the placeholder configuration
export const isFirebaseMock = 
  !firebaseConfig || 
  firebaseConfig.projectId === 'mock-project-id' || 
  firebaseConfig.apiKey.includes('mock-api-key');

let app: any = null;
export let db: any = null;
export let auth: any = null;

if (!isFirebaseMock) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Quick validation check from skill guidelines
    getDocFromServer(doc(db, 'test', 'connection')).catch((error) => {
      if (error && error.message && error.message.includes('the client is offline')) {
        console.warn("Firebase Firestore client is offline.");
      }
    });
  } catch (error) {
    console.error("Failed to initialize Firebase SDK:", error);
  }
}

// Error handlers as explicitly mandated in the Firebase Integration Skill (Section 3)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.currentUser?.uid,
      email: currentAuth?.currentUser?.email,
      emailVerified: currentAuth?.currentUser?.emailVerified,
      isAnonymous: currentAuth?.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Object: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// LOCAL HARD STORAGE ENGINES (LOCAL FALLBACK STATE FOR IMMEDIATE EVALUATION)
const LOCAL_LEADS_KEY = 'vbc_leads';
const LOCAL_LOGS_KEY = 'vbc_audit_logs';

const SEEDED_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Sarah Connor',
    email: 'sarah.c@cyberdyne.org',
    projectDescription: 'Need a fast headles CMS (WordPress decoupled) with strong SEO and automated form intake to handle global traffic spikes.',
    budget: '$15,000 - $25,000',
    chosenStack: 'Decoupled headless WordPress + React Vite styling standard',
    dateTime: 'Tuesday 10:00 AM (EST)',
    selectedTags: ['Headless CMS', 'SEO & Strategy'],
    status: 'new',
    createdAt: new Date(Date.now() - 36 * 3600000).toISOString()
  },
  {
    id: 'lead-02',
    name: 'Bruce Wayne',
    email: 'bruce@wayneinc.corp',
    projectDescription: 'We require a custom Kotlin/Compose mobile framework coupled with multi-cloud serverless Lambdas to track assets securely.',
    budget: '$50,000+',
    chosenStack: 'Kotlin Jetpack Compose + AWS Lambda Node Bridge',
    dateTime: 'Friday 01:00 PM (EST)',
    selectedTags: ['High-Performance Mobile', 'Enterprise Infrastructure'],
    status: 'analyzing',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString()
  }
];

const SEEDED_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    action: 'Lead Intake Created',
    details: 'Sarah Connor submitted a high-ticket headless CMS proposal form.',
    timestamp: new Date(Date.now() - 36 * 3600000).toISOString()
  },
  {
    id: 'log-02',
    action: 'Status Transition',
    details: 'Bruce Wayne status changed to analyzing state.',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString()
  },
  {
    id: 'log-03',
    action: 'System Bootstrapped',
    details: 'Virtual Bridge Connect viewport loaded.',
    timestamp: new Date(Date.now() - 50 * 3600000).toISOString()
  }
];

function getLocalData<T>(key: string, seed: T[]): T[] {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return seed;
  }
}

function setLocalData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// APIS: UNIFIED HOOK ENGINE (SWITCHES DYNAMICALLY FROM REAL TO LOCAL ENGINE)

export async function submitLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const id = 'lead-' + Math.random().toString(36).substring(2, 11);
  const newLead: Lead = {
    ...leadData,
    id,
    status: 'new',
    createdAt: isFirebaseMock ? new Date().toISOString() : new Date()
  };

  if (!isFirebaseMock && db) {
    const p = `leads/${id}`;
    try {
      await setDoc(doc(db, 'leads', id), {
        ...newLead,
        createdAt: Timestamp.now()
      });
      await addAuditLog('Intake Submission Created', `Lead for ${newLead.name} (${newLead.email}) created successfully.`);
      return id;
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, p);
    }
  }

  // Fallback engine
  const curLeads = getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS);
  curLeads.unshift(newLead);
  setLocalData(LOCAL_LEADS_KEY, curLeads);
  await addAuditLog('Intake Submission Created (Local)', `Lead for ${newLead.name} (${newLead.email}) saved to local store.`);
  return id;
}

export async function fetchLeads(): Promise<Lead[]> {
  if (!isFirebaseMock && db) {
    const p = 'leads';
    try {
      const q = query(collection(db, p));
      const s = await getDocs(q);
      const list: Lead[] = [];
      s.forEach((docSnap) => {
        const d = docSnap.data();
        let cAt = d.createdAt;
        if (cAt && typeof cAt.toDate === 'function') {
          cAt = cAt.toDate().toISOString();
        }
        list.push({ ...d, id: docSnap.id, createdAt: cAt } as Lead);
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, p);
    }
  }
  return getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS);
}

export async function updateLeadStatus(leadId: string, status: Lead['status']): Promise<void> {
  if (!isFirebaseMock && db) {
    const p = `leads/${leadId}`;
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status,
        updatedAt: Timestamp.now()
      });
      await addAuditLog('Status Updated', `Lead ID ${leadId} transition status to '${status}'.`);
      return;
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, p);
    }
  }

  // Fallback
  const curLeads = getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS);
  const updated = curLeads.map(l => l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l);
  setLocalData(LOCAL_LEADS_KEY, updated);
  await addAuditLog('Status Updated (Local)', `Lead ID ${leadId} status set to '${status}'.`);
}

export async function deleteLead(leadId: string): Promise<void> {
  if (!isFirebaseMock && db) {
    const p = `leads/${leadId}`;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      await addAuditLog('Lead Deleted', `Lead ID ${leadId} scrubbed from records.`);
      return;
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, p);
    }
  }

  const curLeads = getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS);
  const filtered = curLeads.filter(l => l.id !== leadId);
  setLocalData(LOCAL_LEADS_KEY, filtered);
  await addAuditLog('Lead Deleted (Local)', `Lead ID ${leadId} deleted locally.`);
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  if (!isFirebaseMock && db) {
    const p = 'audit_logs';
    try {
      const q = query(collection(db, p));
      const s = await getDocs(q);
      const list: AuditLog[] = [];
      s.forEach((docSnap) => {
        const d = docSnap.data();
        let ts = d.timestamp;
        if (ts && typeof ts.toDate === 'function') {
          ts = ts.toDate().toISOString();
        }
        list.push({ ...d, id: docSnap.id, timestamp: ts } as AuditLog);
      });
      return list.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, p);
    }
  }
  return getLocalData<AuditLog>(LOCAL_LOGS_KEY, SEEDED_LOGS).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function addAuditLog(action: string, details?: string): Promise<void> {
  const id = 'log-' + Math.random().toString(36).substring(2, 11);
  const newLog: AuditLog = {
    id,
    action,
    details,
    timestamp: isFirebaseMock ? new Date().toISOString() : new Date()
  };

  if (!isFirebaseMock && db) {
    const p = `audit_logs/${id}`;
    try {
      await setDoc(doc(db, 'audit_logs', id), {
        ...newLog,
        timestamp: Timestamp.now()
      });
      return;
    } catch (e) {
      // Don't crash but report errors
      console.error("Audit log write failed on server:", e);
    }
  }

  const curLogs = getLocalData<AuditLog>(LOCAL_LOGS_KEY, SEEDED_LOGS);
  curLogs.unshift(newLog);
  setLocalData(LOCAL_LOGS_KEY, curLogs);
}

// REALTIME LISTENER PLUGS AS MANDATED

export function subscribeLeads(callback: (leads: Lead[]) => void, onError: (error: any) => void) {
  if (!isFirebaseMock && db) {
    const p = 'leads';
    const q = query(collection(db, p));
    return onSnapshot(q, (snap) => {
      const list: Lead[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        let cAt = d.createdAt;
        if (cAt && typeof cAt.toDate === 'function') {
          cAt = cAt.toDate().toISOString();
        }
        list.push({ ...d, id: docSnap.id, createdAt: cAt } as Lead);
      });
      callback(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, p);
      onError(err);
    });
  }

  // Check state periodically
  const interval = setInterval(() => {
    callback(getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS));
  }, 2000);
  callback(getLocalData<Lead>(LOCAL_LEADS_KEY, SEEDED_LEADS));
  return () => clearInterval(interval);
}

export function subscribeAuditLogs(callback: (logs: AuditLog[]) => void, onError: (error: any) => void) {
  if (!isFirebaseMock && db) {
    const p = 'audit_logs';
    const q = query(collection(db, p));
    return onSnapshot(q, (snap) => {
      const list: AuditLog[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        let ts = d.timestamp;
        if (ts && typeof ts.toDate === 'function') {
          ts = ts.toDate().toISOString();
        }
        list.push({ ...d, id: docSnap.id, timestamp: ts } as AuditLog);
      });
      callback(list.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, p);
      onError(err);
    });
  }

  const interval = setInterval(() => {
    callback(getLocalData<AuditLog>(LOCAL_LOGS_KEY, SEEDED_LOGS).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }, 2000);
  callback(getLocalData<AuditLog>(LOCAL_LOGS_KEY, SEEDED_LOGS).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  return () => clearInterval(interval);
}

// SIMPLE AUTHENTICATION STUBS
export interface MockAdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export async function loginWithGoogle(): Promise<MockAdminUser | null> {
  if (!isFirebaseMock && auth) {
    try {
      const provider = new GoogleAuthProvider();
      const r = await signInWithPopup(auth, provider);
      await addAuditLog('Admin Login Success', `Email ${r.user.email} signed into console.`);
      return r.user;
    } catch (e) {
      console.error(e);
      await addAuditLog('Admin Login Failed', `Failed standard auth sequence.`);
      return null;
    }
  }

  // Mock standard auth bypass for rapid client testing
  const mockAdmin: MockAdminUser = {
    uid: 'admin-super-solopreneur',
    email: 'solopreneur@virtualbridge.connect',
    displayName: 'Elite Solopreneur (Mock Mode)',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  };
  localStorage.setItem('vbc_auth_user', JSON.stringify(mockAdmin));
  await addAuditLog('Admin Override Activated', `Super admin logged in via local fallback mode.`);
  return mockAdmin;
}

export async function logout(): Promise<void> {
  if (!isFirebaseMock && auth) {
    await signOut(auth);
    await addAuditLog('Admin Logout', `Session ended.`);
    return;
  }
  localStorage.removeItem('vbc_auth_user');
  await addAuditLog('Admin Local Session Cleared', `Local session terminated.`);
}

export function getCurrentUserSync(): MockAdminUser | null {
  if (!isFirebaseMock && auth?.currentUser) {
    return auth.currentUser;
  }
  const local = localStorage.getItem('vbc_auth_user');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      return null;
    }
  }
  return null;
}
