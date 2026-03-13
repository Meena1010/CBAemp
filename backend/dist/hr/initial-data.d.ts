export type Department = {
    id: string;
    name: string;
};
export type Designation = {
    id: string;
    name: string;
    deptId: string;
};
export type EmployeeRole = 'admin' | 'manager' | 'employee' | 'hr';
export type Employee = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    dob: string;
    joiningDate: string;
    departmentId: string;
    designationId: string;
    managerId: string | null;
    role: EmployeeRole;
    salary: number;
    status: 'active' | 'inactive';
    emergencyContact: string;
    avatar: string;
};
export type LeaveBalance = {
    CL: number;
    SL: number;
    PL: number;
};
export type LeaveApplicationStatus = 'pending' | 'approved' | 'rejected' | 'revoked';
export type LeaveApplication = {
    id: string;
    employeeId: string;
    type: 'CL' | 'SL' | 'PL';
    fromDate: string;
    toDate: string;
    reason: string;
    status: LeaveApplicationStatus;
    managerComment: string;
    appliedOn: string;
};
export type HolidayType = 'national' | 'festival';
export type Holiday = {
    id: string;
    name: string;
    date: string;
    type: HolidayType | string;
};
export type ReviewStatus = 'submitted' | 'reviewed';
export type PerformanceReview = {
    id: string;
    employeeId: string;
    year: number;
    status: ReviewStatus;
    deliverables: string;
    accomplishments: string;
    improvements: string;
    selfRating: number;
    managerFeedback: string;
    managerRating: number | null;
    submittedOn: string;
    reviewedOn: string | null;
};
export type GoalStatus = 'in_progress' | 'completed';
export type GoalPriority = 'high' | 'medium' | 'low';
export type Goal = {
    id: string;
    employeeId: string;
    description: string;
    deadline: string;
    priority: GoalPriority | string;
    successMetrics: string;
    progress: number;
    status: GoalStatus;
    year: number;
};
export type AttendanceStatus = 'present' | 'absent' | 'half_day';
export type AttendanceRecord = {
    id: string;
    employeeId: string;
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    status: AttendanceStatus;
};
export type Training = {
    id: string;
    title: string;
    category: string;
    mode: 'online' | 'offline' | 'hybrid' | string;
    startDate: string;
    endDate: string;
    mandatory: boolean;
    description: string;
};
export type TrainingEnrollmentStatus = 'enrolled' | 'in_progress' | 'completed' | 'cancelled';
export type TrainingEnrollment = {
    id: string;
    trainingId: string;
    employeeId: string;
    status: TrainingEnrollmentStatus;
    progress: number;
};
export type OnboardingTaskOwner = 'hr' | 'manager' | 'employee';
export type OnboardingTask = {
    id: string;
    label: string;
    owner: OnboardingTaskOwner;
};
export type OnboardingTemplate = {
    id: string;
    name: string;
    departmentId: string | null;
    tasks: OnboardingTask[];
};
export type OnboardingInstanceStatus = 'in_progress' | 'completed' | 'cancelled';
export type OnboardingInstanceTask = OnboardingTask & {
    completed: boolean;
    completedBy?: string;
    completedOn?: string;
};
export type OnboardingInstance = {
    id: string;
    employeeId: string;
    templateId: string;
    status: OnboardingInstanceStatus;
    startedOn: string;
    completedOn: string | null;
    tasks: OnboardingInstanceTask[];
};
export type OffboardingStatus = 'requested' | 'approved' | 'rejected' | 'completed';
export type OffboardingRequest = {
    id: string;
    employeeId: string;
    requestedLastDay: string;
    reason: string;
    status: OffboardingStatus;
    decisionComment: string;
    createdOn: string;
    updatedOn: string;
};
export type OffboardingChecklistTaskOwner = 'hr' | 'manager' | 'it' | 'finance' | 'employee';
export type OffboardingChecklistTask = {
    id: string;
    label: string;
    owner: OffboardingChecklistTaskOwner;
    completed: boolean;
    completedBy?: string;
    completedOn?: string;
};
export type OffboardingChecklist = {
    id: string;
    employeeId: string;
    requestId: string;
    tasks: OffboardingChecklistTask[];
};
export type NotificationType = 'leave_approved' | 'leave_applied' | 'review_submitted' | 'review_feedback' | 'leave_rejected' | 'leave_revoked' | 'birthday_reminder' | 'anniversary_reminder' | string;
export type Notification = {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    read: boolean;
    createdAt: string;
};
export type AnnouncementPriority = 'high' | 'medium' | 'low';
export type Announcement = {
    id: string;
    title: string;
    content: string;
    date: string;
    priority: AnnouncementPriority | string;
};
export type ReviewConfig = {
    activeYear: number;
    years: number[];
};
export type HrStore = {
    reviewConfig: ReviewConfig;
    departments: Department[];
    designations: Designation[];
    employees: Employee[];
    leaveBalances: Record<string, LeaveBalance>;
    leaveApplications: LeaveApplication[];
    holidays: Holiday[];
    performanceReviews: PerformanceReview[];
    goals: Goal[];
    notifications: Notification[];
    announcements: Announcement[];
    attendanceRecords: AttendanceRecord[];
    trainings: Training[];
    trainingEnrollments: TrainingEnrollment[];
    onboardingTemplates: OnboardingTemplate[];
    onboardingInstances: OnboardingInstance[];
    offboardingRequests: OffboardingRequest[];
    offboardingChecklists: OffboardingChecklist[];
};
export declare const initialData: HrStore;
