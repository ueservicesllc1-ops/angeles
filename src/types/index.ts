export type UserRole = 'client' | 'staff' | 'admin';

export type CaseStatus =
    | 'submitted'
    | 'reviewing'
    | 'action_needed'
    | 'filing'
    | 'completed'
    | 'rejected';

export type ServiceType =
    | 'individual_tax'
    | 'self_employed'
    | 'business_tax'
    | 'itin'
    | 'amended_return'
    | 'bookkeeping'
    | 'incorporation';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: UserRole;
    phoneNumber?: string;
    createdAt: number; // Timestamp
    photoURL?: string;
}

export interface TaxCase {
    id: string;
    userId: string;
    userEmail: string;
    userName: string;
    serviceType: ServiceType;
    taxYear: string;
    status: CaseStatus;
    assignedStaffId?: string; // id of staff member
    assignedStaffName?: string;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
    notes?: string;
}

export interface CaseDocument {
    id: string;
    caseId?: string;
    name: string; // was fileName in some places, name in others. Uniform to name
    fileName?: string; // KEEP for backward compatibility if needed, but aim for 'name'
    url: string; // was fileUrl in interface but url in code
    fileUrl?: string;
    type?: string;
    fileType?: string;
    uploadedBy: string;
    createdAt: any; // was uploadedAt
    category?: 'client_upload' | 'final_return' | 'supporting_doc' | 'staff_upload';
}
