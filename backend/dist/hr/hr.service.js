"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const promise_1 = __importDefault(require("mysql2/promise"));
const initial_data_1 = require("./initial-data");
let HrService = class HrService {
    store = this.clone(initial_data_1.initialData);
    pool = null;
    async onModuleInit() {
        await this.initDb();
        await this.loadFromDbIfPresent();
    }
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    async initDb() {
        if (this.pool)
            return;
        const host = process.env.DB_HOST || 'localhost';
        const port = Number(process.env.DB_PORT || '3306');
        const user = process.env.DB_USER || 'root';
        const password = process.env.DB_PASSWORD || '';
        const database = process.env.DB_NAME || 'rev_workforce';
        const bootstrapConn = await promise_1.default.createConnection({
            host,
            port,
            user,
            password,
            multipleStatements: true,
        });
        await bootstrapConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await bootstrapConn.end();
        this.pool = promise_1.default.createPool({
            host,
            port,
            user,
            password,
            database,
            connectionLimit: 5,
        });
        await this.pool.query(`
      CREATE TABLE IF NOT EXISTS hr_store (
        id INT PRIMARY KEY,
        data LONGTEXT NOT NULL
      )
    `);
    }
    async loadFromDbIfPresent() {
        if (!this.pool)
            return;
        try {
            const [rows] = await this.pool.query('SELECT data FROM hr_store WHERE id = 1');
            if (rows.length > 0) {
                const raw = rows[0].data;
                const parsed = JSON.parse(raw);
                this.store = this.clone(parsed);
            }
            else {
                const json = JSON.stringify(this.store);
                await this.pool.query('INSERT INTO hr_store (id, data) VALUES (1, ?)', [json]);
            }
        }
        catch (e) {
            console.error('Failed to load HR store from MySQL, using in-memory only.', e);
        }
    }
    persist() {
        if (!this.pool)
            return;
        const json = JSON.stringify(this.store);
        this.pool
            .query('REPLACE INTO hr_store (id, data) VALUES (1, ?)', [json])
            .catch((e) => {
            console.error('Failed to persist HR store to MySQL', e);
        });
    }
    login(employeeIdOrEmail, password) {
        const emp = this.store.employees.find((e) => (e.id === employeeIdOrEmail || e.email === employeeIdOrEmail) &&
            e.password === password &&
            e.status === 'active');
        return emp ? this.clone(emp) : null;
    }
    changePassword(employeeId, currentPassword, newPassword) {
        const idx = this.store.employees.findIndex((e) => e.id === employeeId && e.password === currentPassword);
        if (idx === -1) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        this.store.employees[idx].password = newPassword;
        this.persist();
        return { success: true };
    }
    getEmployees() {
        return this.store.employees.map((e) => this.clone(e));
    }
    getEmployee(id) {
        const emp = this.store.employees.find((e) => e.id === id);
        return emp ? this.clone(emp) : null;
    }
    addEmployee(data) {
        const id = 'EMP' + String(Date.now()).slice(-6);
        const avatar = data.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
        const newEmp = {
            ...data,
            id,
            status: 'active',
            avatar,
        };
        this.store.employees.push(newEmp);
        this.store.leaveBalances[newEmp.id] = { CL: 12, SL: 10, PL: 15 };
        this.persist();
        return this.clone(newEmp);
    }
    updateEmployee(id, updates) {
        const idx = this.store.employees.findIndex((e) => e.id === id);
        if (idx === -1)
            return null;
        this.store.employees[idx] = { ...this.store.employees[idx], ...updates };
        this.persist();
        return this.clone(this.store.employees[idx]);
    }
    deactivateEmployee(id) {
        return this.updateEmployee(id, { status: 'inactive' });
    }
    reactivateEmployee(id) {
        return this.updateEmployee(id, { status: 'active' });
    }
    getTeamMembers(managerId) {
        return this.store.employees
            .filter((e) => e.managerId === managerId)
            .map((e) => this.clone(e));
    }
    getDepartments() {
        return [...this.store.departments];
    }
    getDesignations() {
        return [...this.store.designations];
    }
    addDepartment(name) {
        const dept = { id: 'dept-' + Date.now(), name };
        this.store.departments.push(dept);
        this.persist();
        return dept;
    }
    addDesignation(name, deptId) {
        const des = { id: 'des-' + Date.now(), name, deptId };
        this.store.designations.push(des);
        this.persist();
        return des;
    }
    getLeaveBalance(employeeId) {
        return this.clone(this.store.leaveBalances[employeeId] || { CL: 0, SL: 0, PL: 0 });
    }
    updateLeaveBalance(employeeId, type, delta) {
        if (!this.store.leaveBalances[employeeId]) {
            this.store.leaveBalances[employeeId] = { CL: 0, SL: 0, PL: 0 };
        }
        const current = this.store.leaveBalances[employeeId][type] || 0;
        this.store.leaveBalances[employeeId][type] = Math.max(0, current + delta);
        this.persist();
    }
    setLeaveBalance(employeeId, balances) {
        this.store.leaveBalances[employeeId] = { ...balances };
        this.persist();
    }
    getLeaveApplications(filters = {}) {
        let apps = this.store.leaveApplications.map((a) => this.clone(a));
        if (filters.employeeId) {
            apps = apps.filter((a) => a.employeeId === filters.employeeId);
        }
        if (filters.status) {
            apps = apps.filter((a) => a.status === filters.status);
        }
        if (filters.teamIds) {
            apps = apps.filter((a) => filters.teamIds.includes(a.employeeId));
        }
        return apps.sort((a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime());
    }
    applyLeave(data) {
        const app = {
            ...data,
            id: 'LEAVE' + String(Date.now()).slice(-6),
            status: 'pending',
            managerComment: '',
            appliedOn: new Date().toISOString().split('T')[0],
        };
        this.store.leaveApplications.push(app);
        const emp = this.getEmployee(data.employeeId);
        if (emp && emp.managerId) {
            this.addNotification(emp.managerId, 'leave_applied', `${emp.name} has applied for ${data.type} leave (${data.fromDate} to ${data.toDate}). Action required.`);
        }
        this.persist();
        return this.clone(app);
    }
    cancelLeave(leaveId, employeeId) {
        const idx = this.store.leaveApplications.findIndex((a) => a.id === leaveId &&
            a.employeeId === employeeId &&
            a.status === 'pending');
        if (idx === -1)
            return false;
        this.store.leaveApplications.splice(idx, 1);
        this.persist();
        return true;
    }
    reviewLeave(leaveId, status, comment) {
        const idx = this.store.leaveApplications.findIndex((a) => a.id === leaveId);
        if (idx === -1)
            return null;
        const app = this.store.leaveApplications[idx];
        app.status = status;
        app.managerComment = comment;
        const action = status === 'approved' ? 'approved' : 'rejected';
        this.addNotification(app.employeeId, `leave_${action}`, `Your ${app.type} leave application (${app.fromDate} to ${app.toDate}) has been ${action}. ${comment ? 'Comment: ' + comment : ''}`);
        this.persist();
        return this.clone(app);
    }
    revokeLeave(leaveId, reason) {
        const idx = this.store.leaveApplications.findIndex((a) => a.id === leaveId && a.status === 'approved');
        if (idx === -1)
            return null;
        const app = this.store.leaveApplications[idx];
        app.status = 'revoked';
        app.managerComment = reason || 'Leave revoked by administrator.';
        this.addNotification(app.employeeId, 'leave_revoked', `Your ${app.type} leave application (${app.fromDate} to ${app.toDate}) has been revoked by HR/Admin. ${reason ? 'Reason: ' + reason : ''}`);
        this.persist();
        return this.clone(app);
    }
    getHolidays() {
        return [...this.store.holidays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    addHoliday(data) {
        const hol = { ...data, id: 'HOL' + Date.now() };
        this.store.holidays.push(hol);
        this.persist();
        return this.clone(hol);
    }
    removeHoliday(id) {
        this.store.holidays = this.store.holidays.filter((h) => h.id !== id);
        this.persist();
    }
    getPerformanceReviews(filters = {}) {
        let reviews = this.store.performanceReviews.map((r) => this.clone(r));
        if (filters.employeeId) {
            reviews = reviews.filter((r) => r.employeeId === filters.employeeId);
        }
        if (filters.year) {
            reviews = reviews.filter((r) => r.year === filters.year);
        }
        if (filters.teamIds) {
            reviews = reviews.filter((r) => filters.teamIds.includes(r.employeeId));
        }
        return reviews;
    }
    submitPerformanceReview(data) {
        const existing = this.store.performanceReviews.find((r) => r.employeeId === data.employeeId && r.year === data.year);
        if (existing) {
            Object.assign(existing, data, {
                status: 'submitted',
                submittedOn: new Date().toISOString().split('T')[0],
            });
            const emp = this.getEmployee(data.employeeId);
            if (emp && emp.managerId) {
                this.addNotification(emp.managerId, 'review_submitted', `${emp.name} has submitted their ${data.year} Performance Review.`);
            }
            this.persist();
            return this.clone(existing);
        }
        const review = {
            ...data,
            id: 'PR' + Date.now(),
            status: 'submitted',
            managerFeedback: '',
            managerRating: null,
            submittedOn: new Date().toISOString().split('T')[0],
            reviewedOn: null,
        };
        this.store.performanceReviews.push(review);
        const emp = this.getEmployee(data.employeeId);
        if (emp && emp.managerId) {
            this.addNotification(emp.managerId, 'review_submitted', `${emp.name} has submitted their ${data.year} Performance Review.`);
        }
        this.persist();
        return this.clone(review);
    }
    submitManagerReview(reviewId, feedback, rating) {
        const idx = this.store.performanceReviews.findIndex((r) => r.id === reviewId);
        if (idx === -1)
            return null;
        const review = this.store.performanceReviews[idx];
        review.managerFeedback = feedback;
        review.managerRating = rating;
        review.status = 'reviewed';
        review.reviewedOn = new Date().toISOString().split('T')[0];
        this.addNotification(review.employeeId, 'review_feedback', `Your manager has provided feedback on your ${review.year} Performance Review.`);
        this.persist();
        return this.clone(review);
    }
    getGoals(filters = {}) {
        let goals = this.store.goals.map((g) => this.clone(g));
        if (filters.employeeId) {
            goals = goals.filter((g) => g.employeeId === filters.employeeId);
        }
        if (filters.year) {
            goals = goals.filter((g) => g.year === filters.year);
        }
        if (filters.teamIds) {
            goals = goals.filter((g) => filters.teamIds.includes(g.employeeId));
        }
        return goals;
    }
    addGoal(data) {
        const goal = {
            ...data,
            id: 'GOAL' + Date.now(),
            status: 'in_progress',
            progress: 0,
        };
        this.store.goals.push(goal);
        this.persist();
        return this.clone(goal);
    }
    updateGoal(id, updates) {
        const idx = this.store.goals.findIndex((g) => g.id === id);
        if (idx === -1)
            return null;
        this.store.goals[idx] = { ...this.store.goals[idx], ...updates };
        if (this.store.goals[idx].progress >= 100) {
            this.store.goals[idx].status = 'completed';
        }
        this.persist();
        return this.clone(this.store.goals[idx]);
    }
    deleteGoal(id) {
        this.store.goals = this.store.goals.filter((g) => g.id !== id);
        this.persist();
    }
    getNotifications(userId) {
        return this.store.notifications
            .filter((n) => n.userId === userId)
            .sort((a, b) => new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime())
            .map((n) => this.clone(n));
    }
    addNotification(userId, type, message) {
        const notif = {
            id: 'NOTIF' + Date.now() + Math.random(),
            userId,
            type,
            message,
            read: false,
            createdAt: new Date().toISOString(),
        };
        this.store.notifications.push(notif);
        this.persist();
    }
    ensurePersonalCelebrationNotifications(employeeId) {
        const emp = this.store.employees.find((e) => e.id === employeeId);
        if (!emp)
            return;
        const today = new Date();
        const todayMd = `${today.getMonth() + 1}-${today.getDate()}`;
        const makeKey = (prefix) => `${prefix}-${today.getFullYear()}-${todayMd}`;
        if (emp.dob) {
            const dob = new Date(emp.dob);
            const dobMd = `${dob.getMonth() + 1}-${dob.getDate()}`;
            if (dobMd === todayMd) {
                const key = makeKey('birthday');
                const already = this.store.notifications.some((n) => n.userId === employeeId &&
                    n.type === 'birthday_reminder' &&
                    n.message.includes(String(today.getFullYear())));
                if (!already) {
                    this.addNotification(employeeId, 'birthday_reminder', `Happy Birthday, ${emp.name}! (${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()})`);
                }
            }
        }
        if (emp.joiningDate) {
            const jd = new Date(emp.joiningDate);
            const jdMd = `${jd.getMonth() + 1}-${jd.getDate()}`;
            if (jdMd === todayMd) {
                const years = today.getFullYear() - jd.getFullYear();
                const already = this.store.notifications.some((n) => n.userId === employeeId &&
                    n.type === 'anniversary_reminder' &&
                    n.message.includes(String(today.getFullYear())));
                if (!already) {
                    this.addNotification(employeeId, 'anniversary_reminder', `Happy ${years} year work anniversary at Rev Workforce, ${emp.name}!`);
                }
            }
        }
    }
    markNotificationRead(id) {
        const notif = this.store.notifications.find((n) => n.id === id);
        if (notif) {
            notif.read = true;
            this.persist();
        }
    }
    markAllNotificationsRead(userId) {
        this.store.notifications
            .filter((n) => n.userId === userId)
            .forEach((n) => (n.read = true));
        this.persist();
    }
    getAnnouncements() {
        return [...this.store.announcements]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((a) => this.clone(a));
    }
    addAnnouncement(data) {
        const ann = { ...data, id: 'ANN' + Date.now() };
        this.store.announcements.push(ann);
        this.persist();
        return this.clone(ann);
    }
    removeAnnouncement(id) {
        this.store.announcements = this.store.announcements.filter((a) => a.id !== id);
        this.persist();
    }
    getReviewConfig() {
        return this.clone(this.store.reviewConfig);
    }
    setActiveReviewYear(year) {
        if (!this.store.reviewConfig) {
            this.store.reviewConfig = { activeYear: year, years: [year] };
        }
        else {
            this.store.reviewConfig.activeYear = year;
            if (!this.store.reviewConfig.years.includes(year)) {
                this.store.reviewConfig.years.push(year);
            }
        }
        this.persist();
        return this.clone(this.store.reviewConfig);
    }
    resetData() {
        this.store = this.clone(initial_data_1.initialData);
        this.persist();
    }
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)()
], HrService);
//# sourceMappingURL=hr.service.js.map