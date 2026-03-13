import { HrService } from './hr.service';
export declare class HrController {
    private readonly hr;
    constructor(hr: HrService);
    login(body: {
        employeeIdOrEmail: string;
        password: string;
    }): import("./initial-data").Employee | null;
    changePassword(body: {
        employeeId: string;
        currentPassword: string;
        newPassword: string;
    }): {
        success: boolean;
        message?: string;
    };
    getEmployees(): import("./initial-data").Employee[];
    getEmployee(id: string): import("./initial-data").Employee | null;
    addEmployee(body: any): import("./initial-data").Employee;
    updateEmployee(id: string, updates: any): import("./initial-data").Employee | null;
    deactivateEmployee(id: string): import("./initial-data").Employee | null;
    reactivateEmployee(id: string): import("./initial-data").Employee | null;
    getTeamMembers(id: string): import("./initial-data").Employee[];
    getDepartments(): import("./initial-data").Department[];
    getDesignations(): import("./initial-data").Designation[];
    addDepartment(body: {
        name: string;
    }): {
        id: string;
        name: string;
    };
    addDesignation(body: {
        name: string;
        deptId: string;
    }): {
        id: string;
        name: string;
        deptId: string;
    };
    getLeaveBalance(employeeId: string): import("./initial-data").LeaveBalance;
    updateLeaveBalance(employeeId: string, body: {
        type: 'CL' | 'SL' | 'PL';
        delta: number;
    }): {
        success: boolean;
    };
    setLeaveBalance(employeeId: string, body: {
        CL: number;
        SL: number;
        PL: number;
    }): {
        success: boolean;
    };
    getLeaveApplications(employeeId?: string, status?: string, teamIdsCsv?: string): import("./initial-data").LeaveApplication[];
    applyLeave(body: any): import("./initial-data").LeaveApplication;
    cancelLeave(id: string, body: {
        employeeId: string;
    }): {
        success: boolean;
    };
    reviewLeave(id: string, body: {
        status: 'approved' | 'rejected';
        comment: string;
    }): import("./initial-data").LeaveApplication | null;
    revokeLeave(id: string, body: {
        reason?: string;
    }): import("./initial-data").LeaveApplication | null;
    getHolidays(): import("./initial-data").Holiday[];
    addHoliday(body: any): import("./initial-data").Holiday;
    removeHoliday(id: string): {
        success: boolean;
    };
    getPerformanceReviews(employeeId?: string, yearStr?: string, teamIdsCsv?: string): import("./initial-data").PerformanceReview[];
    submitPerformanceReview(body: any): import("./initial-data").PerformanceReview;
    submitManagerReview(id: string, body: {
        feedback: string;
        rating: number;
    }): import("./initial-data").PerformanceReview | null;
    getGoals(employeeId?: string, yearStr?: string, teamIdsCsv?: string): import("./initial-data").Goal[];
    addGoal(body: any): import("./initial-data").Goal;
    updateGoal(id: string, body: any): import("./initial-data").Goal | null;
    deleteGoal(id: string): {
        success: boolean;
    };
    getNotifications(userId: string): import("./initial-data").Notification[];
    ensurePersonalCelebrationNotifications(userId: string): {
        success: boolean;
    };
    markNotificationRead(id: string): {
        success: boolean;
    };
    markAllNotificationsRead(userId: string): {
        success: boolean;
    };
    getAnnouncements(): import("./initial-data").Announcement[];
    addAnnouncement(body: any): import("./initial-data").Announcement;
    removeAnnouncement(id: string): {
        success: boolean;
    };
    getReviewConfig(): import("./initial-data").ReviewConfig;
    setActiveReviewYear(body: {
        year: number;
    }): import("./initial-data").ReviewConfig;
    resetData(): {
        success: boolean;
    };
}
