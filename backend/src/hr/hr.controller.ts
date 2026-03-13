import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HrService } from './hr.service';

@Controller('api')
export class HrController {
  constructor(private readonly hr: HrService) {}

  // ---- Auth ----
  @Post('auth/login')
  login(
    @Body()
    body: { employeeIdOrEmail: string; password: string },
  ) {
    return this.hr.login(body.employeeIdOrEmail, body.password);
  }

  @Post('auth/change-password')
  changePassword(
    @Body()
    body: { employeeId: string; currentPassword: string; newPassword: string },
  ) {
    return this.hr.changePassword(
      body.employeeId,
      body.currentPassword,
      body.newPassword,
    );
  }

  // ---- Employees ----
  @Get('employees')
  getEmployees() {
    return this.hr.getEmployees();
  }

  @Get('employees/:id')
  getEmployee(@Param('id') id: string) {
    return this.hr.getEmployee(id);
  }

  @Post('employees')
  addEmployee(@Body() body: any) {
    return this.hr.addEmployee(body);
  }

  @Put('employees/:id')
  updateEmployee(@Param('id') id: string, @Body() updates: any) {
    return this.hr.updateEmployee(id, updates);
  }

  @Post('employees/:id/deactivate')
  deactivateEmployee(@Param('id') id: string) {
    return this.hr.deactivateEmployee(id);
  }

  @Post('employees/:id/reactivate')
  reactivateEmployee(@Param('id') id: string) {
    return this.hr.reactivateEmployee(id);
  }

  @Get('managers/:id/team')
  getTeamMembers(@Param('id') id: string) {
    return this.hr.getTeamMembers(id);
  }

  // ---- Departments & Designations ----
  @Get('departments')
  getDepartments() {
    return this.hr.getDepartments();
  }

  @Get('designations')
  getDesignations() {
    return this.hr.getDesignations();
  }

  @Post('departments')
  addDepartment(@Body() body: { name: string }) {
    return this.hr.addDepartment(body.name);
  }

  @Post('designations')
  addDesignation(@Body() body: { name: string; deptId: string }) {
    return this.hr.addDesignation(body.name, body.deptId);
  }

  // ---- Leave Balances ----
  @Get('leave/balances/:employeeId')
  getLeaveBalance(@Param('employeeId') employeeId: string) {
    return this.hr.getLeaveBalance(employeeId);
  }

  @Post('leave/balances/:employeeId/update')
  updateLeaveBalance(
    @Param('employeeId') employeeId: string,
    @Body() body: { type: 'CL' | 'SL' | 'PL'; delta: number },
  ) {
    this.hr.updateLeaveBalance(employeeId, body.type, body.delta);
    return { success: true };
  }

  @Post('leave/balances/:employeeId/set')
  setLeaveBalance(
    @Param('employeeId') employeeId: string,
    @Body() body: { CL: number; SL: number; PL: number },
  ) {
    this.hr.setLeaveBalance(employeeId, body);
    return { success: true };
  }

  // ---- Leave Applications ----
  @Get('leave/applications')
  getLeaveApplications(
    @Query('employeeId') employeeId?: string,
    @Query('status') status?: string,
    @Query('teamIds') teamIdsCsv?: string,
  ) {
    const teamIds =
      teamIdsCsv && teamIdsCsv.length > 0
        ? teamIdsCsv.split(',').map((s) => s.trim())
        : undefined;
    return this.hr.getLeaveApplications({ employeeId, status, teamIds });
  }

  @Post('leave/applications')
  applyLeave(@Body() body: any) {
    return this.hr.applyLeave(body);
  }

  @Post('leave/applications/:id/cancel')
  cancelLeave(
    @Param('id') id: string,
    @Body() body: { employeeId: string },
  ) {
    return { success: this.hr.cancelLeave(id, body.employeeId) };
  }

  @Post('leave/applications/:id/review')
  reviewLeave(
    @Param('id') id: string,
    @Body() body: { status: 'approved' | 'rejected'; comment: string },
  ) {
    return this.hr.reviewLeave(id, body.status, body.comment);
  }

  @Post('leave/applications/:id/revoke')
  revokeLeave(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.hr.revokeLeave(id, body.reason);
  }

  // ---- Holidays ----
  @Get('holidays')
  getHolidays() {
    return this.hr.getHolidays();
  }

  @Post('holidays')
  addHoliday(@Body() body: any) {
    return this.hr.addHoliday(body);
  }

  @Delete('holidays/:id')
  removeHoliday(@Param('id') id: string) {
    this.hr.removeHoliday(id);
    return { success: true };
  }

  // ---- Performance Reviews ----
  @Get('reviews')
  getPerformanceReviews(
    @Query('employeeId') employeeId?: string,
    @Query('year') yearStr?: string,
    @Query('teamIds') teamIdsCsv?: string,
  ) {
    const year = yearStr ? parseInt(yearStr, 10) : undefined;
    const teamIds =
      teamIdsCsv && teamIdsCsv.length > 0
        ? teamIdsCsv.split(',').map((s) => s.trim())
        : undefined;
    return this.hr.getPerformanceReviews({ employeeId, year, teamIds });
  }

  @Post('reviews/submit')
  submitPerformanceReview(@Body() body: any) {
    return this.hr.submitPerformanceReview(body);
  }

  @Post('reviews/:id/manager')
  submitManagerReview(
    @Param('id') id: string,
    @Body() body: { feedback: string; rating: number },
  ) {
    return this.hr.submitManagerReview(id, body.feedback, body.rating);
  }

  // ---- Goals ----
  @Get('goals')
  getGoals(
    @Query('employeeId') employeeId?: string,
    @Query('year') yearStr?: string,
    @Query('teamIds') teamIdsCsv?: string,
  ) {
    const year = yearStr ? parseInt(yearStr, 10) : undefined;
    const teamIds =
      teamIdsCsv && teamIdsCsv.length > 0
        ? teamIdsCsv.split(',').map((s) => s.trim())
        : undefined;
    return this.hr.getGoals({ employeeId, year, teamIds });
  }

  @Post('goals')
  addGoal(@Body() body: any) {
    return this.hr.addGoal(body);
  }

  @Put('goals/:id')
  updateGoal(@Param('id') id: string, @Body() body: any) {
    return this.hr.updateGoal(id, body);
  }

  @Delete('goals/:id')
  deleteGoal(@Param('id') id: string) {
    this.hr.deleteGoal(id);
    return { success: true };
  }

  // ---- Notifications ----
  @Get('notifications/:userId')
  getNotifications(@Param('userId') userId: string) {
    return this.hr.getNotifications(userId);
  }

  @Post('notifications/:userId/ensure-celebrations')
  ensurePersonalCelebrationNotifications(@Param('userId') userId: string) {
    this.hr.ensurePersonalCelebrationNotifications(userId);
    return { success: true };
  }

  @Post('notifications/:id/read')
  markNotificationRead(@Param('id') id: string) {
    this.hr.markNotificationRead(id);
    return { success: true };
  }

  @Post('notifications/:userId/read-all')
  markAllNotificationsRead(@Param('userId') userId: string) {
    this.hr.markAllNotificationsRead(userId);
    return { success: true };
  }

  // ---- Announcements ----
  @Get('announcements')
  getAnnouncements() {
    return this.hr.getAnnouncements();
  }

  @Post('announcements')
  addAnnouncement(@Body() body: any) {
    return this.hr.addAnnouncement(body);
  }

  @Delete('announcements/:id')
  removeAnnouncement(@Param('id') id: string) {
    this.hr.removeAnnouncement(id);
    return { success: true };
  }

  // ---- Review Config ----
  @Get('review-config')
  getReviewConfig() {
    return this.hr.getReviewConfig();
  }

  @Post('review-config/active-year')
  setActiveReviewYear(@Body() body: { year: number }) {
    return this.hr.setActiveReviewYear(body.year);
  }

  // ---- Utility ----
  @Post('admin/reset-data')
  resetData() {
    this.hr.resetData();
    return { success: true };
  }
}

