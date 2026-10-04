export type UserRole = 'STUDENT' | 'OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  nim?: string;
  employeeId?: string;
  role: UserRole;
  avatar: string;
  department?: string;
  phone?: string;
}

export type ItemType = 'LOST' | 'FOUND';

export type ItemStatus = 
  | 'LOST' 
  | 'FOUND' 
  | 'CLAIMED_PENDING' 
  | 'READY_FOR_PICKUP' 
  | 'RETURNED' 
  | 'ARCHIVED';

export type ItemCategory = 
  | 'Elektronik'
  | 'Tas'
  | 'Dompet'
  | 'Kunci'
  | 'KTM'
  | 'Buku'
  | 'Aksesoris'
  | 'Pakaian'
  | 'Lainnya';

export interface Item {
  id: string;
  itemCode: string;
  type: ItemType;
  title: string;
  category: ItemCategory;
  location: string;
  date: string;
  time?: string;
  description: string;
  images: string[];
  status: ItemStatus;
  bookmarked?: boolean;
  postedBy: string;
  handledByOfficerId?: string;
  condition?: string;
  storageLocation?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VerificationSecret {
  id: string;
  itemId: string;
  exactDiscoveryLocation: string;
  distinctiveMarks: string;
  concealedContents?: string;
  accessories?: string;
  serialFragment?: string;
  privateNotes?: string;
}

export type ClaimStatus = 
  | 'CLAIM_SUBMITTED'
  | 'STAGE_1_REVIEW'
  | 'STAGE_1_PASSED'
  | 'STAGE_2_REQUIRED'
  | 'STAGE_2_PASSED'
  | 'APPROVED'
  | 'READY_FOR_PICKUP'
  | 'RETURNED'
  | 'REJECTED'
  | 'CANCELLED';

export type CheckVerificationState = 'SESUAI' | 'TIDAK_SESUAI' | 'TIDAK_DAPAT_DIVERIFIKASI';

export interface Stage1Checklist {
  campusAccountValid: CheckVerificationState;
  lossLocationValid: CheckVerificationState;
  lossTimeValid: CheckVerificationState;
  distinctiveFeatureValid: CheckVerificationState;
  narrativeConsistent: CheckVerificationState;
  evidenceConsidered: CheckVerificationState;
}

export type Stage2MethodType = 
  | 'Buka/Kontrol Perangkat'
  | 'Cocokkan Serial Number'
  | 'Bukti Pembelian'
  | 'Device/Account Association'
  | 'Cocokkan Isi Tersembunyi'
  | 'Foto Kepemilikan'
  | 'Metode Lain';

export interface Stage2MethodItem {
  id: string;
  name: Stage2MethodType;
  result: 'PASS' | 'FAIL' | 'NOT_APPLICABLE';
  notes: string;
}

export interface ClaimEvidence {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  previewUrl?: string;
  size: string;
}

export interface Claim {
  id: string;
  claimCode: string;
  itemId: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  claimantNim: string;
  claimantAvatar: string;
  claimantDept: string;
  whyMine: string;
  lossLocation: string;
  lossTime: string;
  distinctiveFeature: string;
  additionalInfo?: string;
  evidence: ClaimEvidence[];
  status: ClaimStatus;
  stage1Checklist?: Stage1Checklist;
  stage1Notes?: string;
  stage2Methods?: Stage2MethodItem[];
  stage2Notes?: string;
  pickupCode?: string;
  pickupConfirmedAt?: string;
  pickupOfficerName?: string;
  rejectionReasonInternal?: string;
  rejectionReasonStudent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  roleTarget: 'ALL' | 'STUDENT' | 'OFFICER';
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  timestamp: string;
  dateGroup: 'Hari ini' | 'Kemarin' | 'Sebelumnya';
  isRead: boolean;
  actionScreen?: string;
  actionId?: string;
}

export interface InitialFoundReport {
  id: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  itemName: string;
  category: ItemCategory;
  discoveryLocation: string;
  discoveryDate: string;
  discoveryTime: string;
  description: string;
  images: string[];
  status: 'PENDING_HANDOFF' | 'RECEIVED_BY_OFFICER';
  createdAt: string;
}
