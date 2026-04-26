export const VISA_APPLICATION_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "document_pending", label: "Document Pending" },
  { value: "processing", label: "Processing" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export const VISA_DOCUMENT_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export const VISA_APPLICATIONS_TEXT = {
  listTitle: "Visa Applications",
  tableHeaders: {
    serial: "SL",
    applicationNo: "Application No",
    applicant: "Applicant",
    packageTitle: "Package",
    country: "Country",
    status: "Status",
    paymentStatus: "Payment",
    assignedOfficer: "Assigned Officer",
    createdAt: "Submitted",
    action: "Action",
  },
  buttons: {
    view: "View",
    back: "Back",
    print: "Print PDF",
    assign: "Assign Officer",
    adminUpdate: "Save Admin Update",
    updateStatus: "Update Status",
    verifyDocument: "Verify",
    viewFile: "View File",
  },
  sections: {
    workflow: "Workflow Actions",
    documents: "Documents",
    statusLogs: "Status Timeline",
    payments: "Payments",
  },
  labels: {
    applicantInfo: "Applicant Info",
    packageInfo: "Package Info",
    assignmentInfo: "Assignment Info",
    officer: "Officer",
    remarks: "Remarks",
    adminNote: "Admin Note",
    status: "Status",
    requiredDocuments: "Required Documents",
  },
  placeholders: {
    officer: "Select officer",
    remarks: "Enter remarks",
  },
  empty: {
    assignedOfficer: "Not assigned",
    adminNote: "No admin note",
    travelDate: "Not set",
    noApplications: "No visa applications found",
    noDocuments: "No documents uploaded yet",
    noLogs: "No status logs found",
    noPayments: "No payments found",
    noRequirements: "No required documents listed",
  },
  success: {
    assign: "Visa application assigned successfully",
    adminUpdate: "Visa application updated successfully",
    status: "Visa application status updated successfully",
    document: "Visa document reviewed successfully",
  },
};

export const getVisaStatusBadgeClass = (status) => {
  switch (status) {
    case "approved":
      return "bg-success";
    case "submitted":
      return "bg-primary";
    case "under_review":
      return "bg-azure";
    case "document_pending":
      return "bg-warning text-dark";
    case "processing":
      return "bg-info";
    case "rejected":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

export const getPaymentStatusBadgeClass = (status) => {
  switch (status) {
    case "paid":
      return "bg-success";
    case "unpaid":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

export const formatVisaStatusLabel = (value) =>
  value
    ? value
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "-";
