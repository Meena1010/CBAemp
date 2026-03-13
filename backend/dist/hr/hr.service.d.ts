import { OnModuleInit } from '@nestjs/common';
import { Announcement, Goal, Holiday, LeaveApplication, LeaveBalance, Notification, PerformanceReview, ReviewConfig, Employee } from './initial-data';
type LeaveType = 'CL' | 'SL' | 'PL';
export declare class HrService implements OnModuleInit {
    private store;
    private pool;
    onModuleInit(): Promise<void>;
    private clone;
    private initDb;
    private loadFromDbIfPresent;
    private persist;
    login(employeeIdOrEmail: string, password: string): Employee | null;
    changePassword(employeeId: string, currentPassword: string, newPassword: string): {
        success: boolean;
        message?: string;
    };
    getEmployees(): Employee[];
    getEmployee(id: string): Employee | null;
    addEmployee(data: Omit<Employee, 'id' | 'status' | 'avatar'>): Employee;
    updateEmployee(id: string, updates: Partial<Employee>): Employee | null;
    deactivateEmployee(id: string): Employee | null;
    reactivateEmployee(id: string): Employee | null;
    getTeamMembers(managerId: string): Employee[];
    getDepartments(): import("./initial-data").Department[];
    getDesignations(): import("./initial-data").Designation[];
    addDepartment(name: string): {
        id: string;
        name: string;
    };
    addDesignation(name: string, deptId: string): {
        id: string;
        name: string;
        deptId: string;
    };
    getLeaveBalance(employeeId: string): LeaveBalance;
    updateLeaveBalance(employeeId: string, type: LeaveType, delta: number): void;
    setLeaveBalance(employeeId: string, balances: LeaveBalance): void;
    getLeaveApplications(filters?: {
        employeeId?: string;
        status?: string;
        teamIds?: string[];
    }): LeaveApplication[];
    applyLeave(data: Omit<LeaveApplication, 'id' | 'status' | 'managerComment' | 'appliedOn'>): LeaveApplication;
    cancelLeave(leaveId: string, employeeId: string): boolean;
    reviewLeave(leaveId: string, status: 'approved' | 'rejected', comment: string): LeaveApplication | null;
    revokeLeave(leaveId: string, reason?: string): LeaveApplication | null;
    getHolidays(): Holiday[];
    addHoliday(data: Omit<Holiday, 'id'>): Holiday;
    removeHoliday(id: string): void;
    getPerformanceReviews(filters?: {
        employeeId?: string;
        year?: number;
        teamIds?: string[];
    }): PerformanceReview[];
    submitPerformanceReview(data: Omit<PerformanceReview, 'id' | 'status' | 'managerFeedback' | 'managerRating' | 'submittedOn' | 'reviewedOn'>): PerformanceReview;
    submitManagerReview(reviewId: string, feedback: string, rating: number): PerformanceReview | null;
    getGoals(filters?: {
        employeeId?: string;
        year?: number;
        teamIds?: string[];
    }): Goal[];
    addGoal(data: Omit<Goal, 'id' | 'status' | 'progress'>): Goal;
    updateGoal(id: string, updates: Partial<Goal>): Goal | null;
    deleteGoal(id: string): void;
    getNotifications(userId: string): Notification[];
    addNotification(userId: string, type: string, message: string): void;
    ensurePersonalCelebrationNotifications(employeeId: string): void;
    markNotificationRead(id: string): void;
    markAllNotificationsRead(userId: string): void;
    getAnnouncements(): Announcement[];
    addAnnouncement(data: Omit<Announcement, 'id'>): Announcement;
    removeAnnouncement(id: string): void;
    getReviewConfig(): ReviewConfig;
    setActiveReviewYear(year: number): ReviewConfig;
    resetData(): void;
}
export {};
