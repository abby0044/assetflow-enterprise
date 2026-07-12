# assetflow-enterprise
Enterprise Asset &amp; Resource Management System built with Odoo.
# AssetFlow

**Enterprise Asset & Resource Management System**

AssetFlow is an Odoo-based Enterprise Asset & Resource Management System designed to help organizations efficiently manage physical assets and shared resources through a centralized ERP platform.

The system enables organizations to register, allocate, transfer, maintain, audit, and monitor assets while providing role-based workflows, automated notifications, and real-time operational dashboards.

---

## Problem Statement

Organizations often rely on spreadsheets or manual records to track assets, resulting in misplaced equipment, duplicate allocations, missed maintenance schedules, and inefficient resource utilization.

AssetFlow addresses these challenges by providing a centralized platform that streamlines asset lifecycle management, resource booking, maintenance workflows, and audit processes.

---

## Features

* Secure Login & Authentication
* Role-Based Access Control
* Department & Employee Management
* Asset Category Management
* Asset Registration with Auto-generated Asset Tags
* QR Code Asset Tracking
* Asset Allocation & Transfer Workflow
* Shared Resource Booking with Conflict Detection
* Maintenance Request & Approval Workflow
* Scheduled Asset Audits
* Dashboard & KPI Analytics
* Notifications & Activity Logs
* Exportable Reports

---

## User Roles

### Admin

* Manage departments
* Manage asset categories
* Manage employee roles
* View organization-wide analytics

### Asset Manager

* Register assets
* Allocate and transfer assets
* Approve maintenance requests
* Manage audits

### Department Head

* Manage departmental assets
* Approve transfers
* Book shared resources

### Employee

* View assigned assets
* Book shared resources
* Raise maintenance requests
* Initiate return and transfer requests

---

## Asset Lifecycle

Available

↓

Allocated

↓

Reserved

↓

Under Maintenance

↓

Available

↓

Retired / Lost / Disposed

---

## Technology Stack

* **Framework:** Odoo
* **Backend:** Python
* **Database:** PostgreSQL
* **Frontend:** XML, JavaScript
* **Version Control:** Git & GitHub

---

## Project Structure

```
assetflow/

├── assetflow_base/
├── assetflow_assets/
├── assetflow_allocation/
├── assetflow_booking/
├── assetflow_maintenance/
├── assetflow_audit/
├── assetflow_dashboard/
├── assetflow_reports/
└── assetflow_notifications/
```

---

## Core Modules

* Organization Setup
* Asset Management
* Allocation & Transfers
* Resource Booking
* Maintenance Management
* Audit Management
* Reports & Analytics
* Notifications

---

## Future Enhancements

* AI-powered maintenance prediction
* Mobile application
* RFID & IoT integration
* Advanced analytics dashboards
* Email and SMS notifications
* Predictive asset utilization insights

---

## Team

* Aaditya Paul

---

## License

This project is developed for the Odoo Hackathon and is intended for educational and demonstration purposes.
