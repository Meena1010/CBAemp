"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrController = void 0;
const common_1 = require("@nestjs/common");
const hr_service_1 = require("./hr.service");
let HrController = class HrController {
    hr;
    constructor(hr) {
        this.hr = hr;
    }
    login(body) {
        return this.hr.login(body.employeeIdOrEmail, body.password);
    }
    changePassword(body) {
        return this.hr.changePassword(body.employeeId, body.currentPassword, body.newPassword);
    }
    getEmployees() {
        return this.hr.getEmployees();
    }
    getEmployee(id) {
        return this.hr.getEmployee(id);
    }
    addEmployee(body) {
        return this.hr.addEmployee(body);
    }
    updateEmployee(id, updates) {
        return this.hr.updateEmployee(id, updates);
    }
    deactivateEmployee(id) {
        return this.hr.deactivateEmployee(id);
    }
    reactivateEmployee(id) {
        return this.hr.reactivateEmployee(id);
    }
    getTeamMembers(id) {
        return this.hr.getTeamMembers(id);
    }
    getDepartments() {
        return this.hr.getDepartments();
    }
    getDesignations() {
        return this.hr.getDesignations();
    }
    addDepartment(body) {
        return this.hr.addDepartment(body.name);
    }
    addDesignation(body) {
        return this.hr.addDesignation(body.name, body.deptId);
    }
    getLeaveBalance(employeeId) {
        return this.hr.getLeaveBalance(employeeId);
    }
    updateLeaveBalance(employeeId, body) {
        this.hr.updateLeaveBalance(employeeId, body.type, body.delta);
        return { success: true };
    }
    setLeaveBalance(employeeId, body) {
        this.hr.setLeaveBalance(employeeId, body);
        return { success: true };
    }
    getLeaveApplications(employeeId, status, teamIdsCsv) {
        const teamIds = teamIdsCsv && teamIdsCsv.length > 0
            ? teamIdsCsv.split(',').map((s) => s.trim())
            : undefined;
        return this.hr.getLeaveApplications({ employeeId, status, teamIds });
    }
    applyLeave(body) {
        return this.hr.applyLeave(body);
    }
    cancelLeave(id, body) {
        return { success: this.hr.cancelLeave(id, body.employeeId) };
    }
    reviewLeave(id, body) {
        return this.hr.reviewLeave(id, body.status, body.comment);
    }
    revokeLeave(id, body) {
        return this.hr.revokeLeave(id, body.reason);
    }
    getHolidays() {
        return this.hr.getHolidays();
    }
    addHoliday(body) {
        return this.hr.addHoliday(body);
    }
    removeHoliday(id) {
        this.hr.removeHoliday(id);
        return { success: true };
    }
    getPerformanceReviews(employeeId, yearStr, teamIdsCsv) {
        const year = yearStr ? parseInt(yearStr, 10) : undefined;
        const teamIds = teamIdsCsv && teamIdsCsv.length > 0
            ? teamIdsCsv.split(',').map((s) => s.trim())
            : undefined;
        return this.hr.getPerformanceReviews({ employeeId, year, teamIds });
    }
    submitPerformanceReview(body) {
        return this.hr.submitPerformanceReview(body);
    }
    submitManagerReview(id, body) {
        return this.hr.submitManagerReview(id, body.feedback, body.rating);
    }
    getGoals(employeeId, yearStr, teamIdsCsv) {
        const year = yearStr ? parseInt(yearStr, 10) : undefined;
        const teamIds = teamIdsCsv && teamIdsCsv.length > 0
            ? teamIdsCsv.split(',').map((s) => s.trim())
            : undefined;
        return this.hr.getGoals({ employeeId, year, teamIds });
    }
    addGoal(body) {
        return this.hr.addGoal(body);
    }
    updateGoal(id, body) {
        return this.hr.updateGoal(id, body);
    }
    deleteGoal(id) {
        this.hr.deleteGoal(id);
        return { success: true };
    }
    getNotifications(userId) {
        return this.hr.getNotifications(userId);
    }
    ensurePersonalCelebrationNotifications(userId) {
        this.hr.ensurePersonalCelebrationNotifications(userId);
        return { success: true };
    }
    markNotificationRead(id) {
        this.hr.markNotificationRead(id);
        return { success: true };
    }
    markAllNotificationsRead(userId) {
        this.hr.markAllNotificationsRead(userId);
        return { success: true };
    }
    getAnnouncements() {
        return this.hr.getAnnouncements();
    }
    addAnnouncement(body) {
        return this.hr.addAnnouncement(body);
    }
    removeAnnouncement(id) {
        this.hr.removeAnnouncement(id);
        return { success: true };
    }
    getReviewConfig() {
        return this.hr.getReviewConfig();
    }
    setActiveReviewYear(body) {
        return this.hr.setActiveReviewYear(body.year);
    }
    resetData() {
        this.hr.resetData();
        return { success: true };
    }
};
exports.HrController = HrController;
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('employees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Post)('employees'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addEmployee", null);
__decorate([
    (0, common_1.Put)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Post)('employees/:id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "deactivateEmployee", null);
__decorate([
    (0, common_1.Post)('employees/:id/reactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "reactivateEmployee", null);
__decorate([
    (0, common_1.Get)('managers/:id/team'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getTeamMembers", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)('designations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getDesignations", null);
__decorate([
    (0, common_1.Post)('departments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addDepartment", null);
__decorate([
    (0, common_1.Post)('designations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addDesignation", null);
__decorate([
    (0, common_1.Get)('leave/balances/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getLeaveBalance", null);
__decorate([
    (0, common_1.Post)('leave/balances/:employeeId/update'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateLeaveBalance", null);
__decorate([
    (0, common_1.Post)('leave/balances/:employeeId/set'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "setLeaveBalance", null);
__decorate([
    (0, common_1.Get)('leave/applications'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('teamIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getLeaveApplications", null);
__decorate([
    (0, common_1.Post)('leave/applications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "applyLeave", null);
__decorate([
    (0, common_1.Post)('leave/applications/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "cancelLeave", null);
__decorate([
    (0, common_1.Post)('leave/applications/:id/review'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "reviewLeave", null);
__decorate([
    (0, common_1.Post)('leave/applications/:id/revoke'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "revokeLeave", null);
__decorate([
    (0, common_1.Get)('holidays'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getHolidays", null);
__decorate([
    (0, common_1.Post)('holidays'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addHoliday", null);
__decorate([
    (0, common_1.Delete)('holidays/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "removeHoliday", null);
__decorate([
    (0, common_1.Get)('reviews'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('teamIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getPerformanceReviews", null);
__decorate([
    (0, common_1.Post)('reviews/submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "submitPerformanceReview", null);
__decorate([
    (0, common_1.Post)('reviews/:id/manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "submitManagerReview", null);
__decorate([
    (0, common_1.Get)('goals'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('teamIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getGoals", null);
__decorate([
    (0, common_1.Post)('goals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addGoal", null);
__decorate([
    (0, common_1.Put)('goals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.Delete)('goals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "deleteGoal", null);
__decorate([
    (0, common_1.Get)('notifications/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)('notifications/:userId/ensure-celebrations'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "ensurePersonalCelebrationNotifications", null);
__decorate([
    (0, common_1.Post)('notifications/:id/read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "markNotificationRead", null);
__decorate([
    (0, common_1.Post)('notifications/:userId/read-all'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "markAllNotificationsRead", null);
__decorate([
    (0, common_1.Get)('announcements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getAnnouncements", null);
__decorate([
    (0, common_1.Post)('announcements'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addAnnouncement", null);
__decorate([
    (0, common_1.Delete)('announcements/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "removeAnnouncement", null);
__decorate([
    (0, common_1.Get)('review-config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getReviewConfig", null);
__decorate([
    (0, common_1.Post)('review-config/active-year'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "setActiveReviewYear", null);
__decorate([
    (0, common_1.Post)('admin/reset-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrController.prototype, "resetData", null);
exports.HrController = HrController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrController);
//# sourceMappingURL=hr.controller.js.map